import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
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
        return (<Text>{item.filename}</Text>)
    }

    render() {
        return (
            <AudioContext.Consumer>
                {({ dataProvider }) => (
                    <View style={{ flex: 1 }}>
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                        />
                    </View>
                )}
            </AudioContext.Consumer>
        );
    }
}


export default AudioList

