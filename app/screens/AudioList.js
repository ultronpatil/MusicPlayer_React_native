import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../componants/AudioListItem'
import Screen from '../componants/Screen'
import OptionModal from '../componants/OptionModal'
import { Audio } from 'expo-av'
export class AudioList extends Component {
    static contextType = AudioContext

    constructor(props) {
        super(props);
        this.state = {
            OptionModalVisible: false,
            playbackObj: null,
            soundObj: null,
            currentAudio: {}
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

    handleAudioPress = async (audio) => {
        //play
        if (this.state.soundObj === null) {
            const playbackObj = new Audio.Sound()
            const status = await playbackObj.loadAsync({ uri: audio.uri }, { shouldPlay: true })
            return this.setState({ ...this.state, currentAudio: audio, playbackObj: playbackObj, soundObj: status })
        }
        //pause
        if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
            const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })
            return this.setState({ ...this.state, soundObj: status })
        }
        //resume
        if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio.id === audio.id) {
            const status = await this.state.playbackObj.playAsync()
            return this.setState({ ...this.state, soundObj: status })
        }

    }



    rowRenderer = (type, item) => {
        return (
            <AudioListItem
                title={item.filename}
                duration={item.duration}
                onAudioPress={() => this.handleAudioPress(item)}
                openOptions={() => {
                    this.currentSong = item;
                    this.setState({ ...this.state, OptionModalVisible: true })
                }}
            />)
    }

    render() {
        return (
            <AudioContext.Consumer>
                {({ dataProvider }) => (
                    <Screen style={{ flex: 1 }}>
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                        />
                        <OptionModal
                            onPlayPress={() => console.log("plaing song")}
                            onPlaylistPress={() => console.log("added to playlist")}
                            currentSong={this.currentSong}
                            onClose={() => this.setState({ ...this.state, OptionModalVisible: false })} visible={this.state.OptionModalVisible}></OptionModal>
                    </Screen>
                )
                }
            </AudioContext.Consumer>
        );
    }
}


export default AudioList

