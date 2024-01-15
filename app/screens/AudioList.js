import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../componants/AudioListItem'
import Screen from '../componants/Screen'
import OptionModal from '../componants/OptionModal'
import { Audio } from 'expo-av'
import { play, pause, resume, next } from '../misc/AudioController'
import { storeAudioForNextOpening } from '../misc/Helper'

export class AudioList extends Component {
    static contextType = AudioContext

    constructor(props) {
        super(props);
        this.state = {
            OptionModalVisible: false,
        };
        this.currentSong = {}
    }

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case 'audio':
                dim.width = Dimensions.get('window').width;
                dim.height = 70;
                break;
            default:
                dim.width = 0;
                dim.height = 0;
        }

    })

    // onPlaybackStatusUpdate = async (playbackStatus) => {
    //     if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
    //         this.context.updateState(this.context, {
    //             playbackPosition: playbackStatus.positionMillis,
    //             playbackDuration: playbackStatus.durationMillis
    //         })
    //     }
    //     if (playbackStatus.didJustFinish) {
    //         const nextAudioIndex = this.context.currentAudioIndex + 1;

    //         //no next audio to play 
    //         if (nextAudioIndex >= this.context.totalAudioCount) {
    //             this.context.playbackObj.unloadAsync();
    //             this.context.updateState(this.context, {
    //                 soundObj: null,
    //                 currentAudio: this.context.AudioFiles[0],
    //                 isPlaying: false,
    //                 currentAudioIndex: 0,
    //                 playbackPosition: null,
    //                 playbackDuration: null
    //             })
    //             await storeAudioForNextOpening(this.context.AudioFiles[0], 0);
    //         }

    //         //otherwise there is audio is to play
    //         const audio = this.context.AudioFiles[nextAudioIndex];
    //         const status = await next(this.context.playbackObj, audio.uri)
    //         this.context.updateState(this.context, {
    //             soundObj: status,
    //             currentAudio: audio,
    //             isPlaying: true,
    //             currentAudioIndex: nextAudioIndex,
    //         })
    //         await storeAudioForNextOpening(audio, nextAudioIndex);
    //     }

    // }
    handleAudioPress = async (audio) => {

        const { soundObj, playbackObj, currentAudio, updateState, AudioFiles } = this.context;
        //play
        if (soundObj === null) {
            const playbackObj = new Audio.Sound()
            const status = await play(playbackObj, audio.uri)
            const index = AudioFiles.indexOf(audio)
            updateState(this.context, {
                currentAudio: audio,
                playbackObj: playbackObj,
                soundObj: status,
                isPlaying: true,
                currentAudioIndex: index
            });
            playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate)
            return storeAudioForNextOpening(audio, index)


        }
        //pause
        if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
            const status = await pause(playbackObj)
            return updateState(this.context, { soundObj: status, isPlaying: false })
        }
        //resume
        if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
            const status = await resume(playbackObj)
            return updateState(this.context, { soundObj: status, isPlaying: true })
        }

        //next play
        if (soundObj.isLoaded && currentAudio.id !== audio.id) {
            const status = await next(playbackObj, audio.uri);
            const index = AudioFiles.indexOf(audio)
            updateState(this.context, { currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: index });
            return storeAudioForNextOpening(audio, index)

        }

    }

    componentDidMount() {
        this.context.loadPreviousSong()
    }



    rowRenderer = (type, item, index, extendedState) => {
        return (
            <AudioListItem
                title={item.filename}
                duration={item.duration}
                onAudioPress={() => this.handleAudioPress(item)}
                openOptions={() => {
                    this.currentSong = item;
                    this.setState({ ...this.state, OptionModalVisible: true })
                }}
                isPlaying={extendedState.isPlaying}
                activeThumbnail={this.context.currentAudioIndex === index}
            />)
    }

    render() {
        return (
            <AudioContext.Consumer>
                {({ dataProvider, isPlaying }) => {
                    if (!dataProvider._data.length) return null;
                    return (
                        <Screen style={{ flex: 1 }}>
                            <RecyclerListView
                                dataProvider={dataProvider}
                                layoutProvider={this.layoutProvider}
                                rowRenderer={this.rowRenderer}
                                extendedState={{ isPlaying }}
                            />
                            <OptionModal
                                onPlayPress={() => console.log("plaing song")}
                                onPlaylistPress={() => {
                                    this.context.updateState(this.context, { addToPlaylist: this.currentItem, })
                                    this.props.navigation.navigate('PlayList')
                                }
                                }
                                currentSong={this.currentSong}
                                onClose={() => this.setState({ ...this.state, OptionModalVisible: false })} visible={this.state.OptionModalVisible}></OptionModal>
                        </Screen>
                    )
                }
                }
            </AudioContext.Consumer>
        );
    }
}


export default AudioList

