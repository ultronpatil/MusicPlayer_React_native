import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../componants/AudioListItem'
import Screen from '../componants/Screen'


export class AudioList extends Component {
    static contextType = AudioContext

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
    rowRenderer = (type, item) => {
        return (<AudioListItem title={item.filename} duration={item.duration} openOptions={() => {
            console.log("oprning ooptions");
        }} />)
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
                    </Screen>
                )}
            </AudioContext.Consumer>
        );
    }
}


export default AudioList

