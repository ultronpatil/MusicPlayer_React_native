import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av'
import { next } from '../misc/AudioController';

export const AudioContext = createContext()
export class AudioProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            AudioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,

        };
        this.totalAudioCount = 0
    }

    permissionAlert = () => {
        Alert.alert("Permission required", "This app needs to access data", [{
            text: "ok", onPress: () => this.getPermission()
        }, {
            text: "deny", onPress: () => this.permissionAlert()
        }])
    }

    getAudioFiles = async () => {
        const { dataProvider, AudioFiles } = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        })
        this.totalAudioCount = media.totalCount
        this.setState({ ...this.state, dataProvider: dataProvider.cloneWithRows([...AudioFiles, ...media.assets]), AudioFiles: [...AudioFiles, ...media.assets] })
    }

    loadPreviousSong = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio')
        let currentAudio;
        let currentAudioIndex;

        if (previousAudio === null) {
            currentAudio = this.state.AudioFiles[0];
            currentAudioIndex = 0
        } else {
            previousAudio = JSON.parse(previousAudio);
            currentAudio = previousAudio.audio
            currentAudioIndex = previousAudio.index
        }
        this.setState({ ...this.state, currentAudio, currentAudioIndex })
    }



    // Inside getPermission method:
    getPermission = async () => {
        try {
            const permission = await MediaLibrary.getPermissionsAsync();
            if (permission.granted) {
                this.getAudioFiles();
            }
            if (!permission.canAskAgain && !permission.granted) {
                this.setState({ ...this.state, permissionError: true })
            }
            if (!permission.granted && permission.canAskAgain) {
                const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

                if (status === 'denied' && canAskAgain) {
                    this.permissionAlert();
                } else if (status === 'granted') {
                    this.getAudioFiles();
                } else if (status === 'denied' && !canAskAgain) {
                    this.setState({ ...this.state, permissionError: true })
                }
            } else if (permission.granted) {
                this.getAudioFiles();
            }
        } catch (error) {
            console.error("Permission error:", error);
        }
    }


    onPlaybackStatusUpdate = async (playbackStatus) => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
            this.updateState(this, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis
            })
        }
        if (playbackStatus.didJustFinish) {
            const nextAudioIndex = this.state.currentAudioIndex + 1;

            //no next audio to play 
            if (nextAudioIndex >= this.totalAudioCount) {
                this.state.playbackObj.unloadAsync();
                this.updateState(this, {
                    soundObj: null,
                    currentAudio: this.state.AudioFiles[0],
                    isPlaying: false,
                    currentAudioIndex: 0,
                    playbackPosition: null,
                    playbackDuration: null
                })
                await storeAudioForNextOpening(this.state.AudioFiles[0], 0);
            }

            //otherwise there is audio is to play
            const audio = this.state.AudioFiles[nextAudioIndex];
            const status = await next(this.state.playbackObj, audio.uri)
            this.updateState(this, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex,
            })
            await storeAudioForNextOpening(audio, nextAudioIndex);
        }

    }




    componentDidMount() {
        this.getPermission();
        if (this.state.playbackObj === null) {
            this.setState({ ...this.state, playbackObj: new Audio.Sound() })
        }
    }

    updateState = (prevState, newState = {}) => {
        this.setState({ ...prevState, ...newState })
    }

    render() {
        const { AudioFiles, dataProvider, permissionError, playbackObj, soundObj, currentAudio, isPlaying, currentAudioIndex, playbackPosition, playbackDuration } = this.state
        if (permissionError) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                        Give permission to access
                    </Text>
                </View>
            );
        }



        return <AudioContext.Provider value={{
            AudioFiles,
            dataProvider,
            playbackObj,
            soundObj,
            currentAudio,
            isPlaying,
            currentAudioIndex,
            totalAudioCount: this.totalAudioCount,
            playbackPosition,
            playbackDuration,
            updateState: this.updateState,
            loadPreviousSong: this.loadPreviousSong,
            onPlaybackStatusUpdate: this.onPlaybackStatusUpdate
        }}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider
