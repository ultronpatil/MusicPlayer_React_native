import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext()
export class AudioProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            AudioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
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
        console.log(media);
        this.setState({ ...this.state, dataProvider: dataProvider.cloneWithRows([...AudioFiles, ...media.assets]), AudioFiles: [...AudioFiles, ...media.assets] })
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


    componentDidMount() {
        this.getPermission()
    }
    render() {
        const { AudioFiles, dataProvider, permissionError } = this.state
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



        return <AudioContext.Provider value={{ AudioFiles, dataProvider }}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider
