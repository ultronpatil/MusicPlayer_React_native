import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Color from '../misc/Color';

const PlayList = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.playlistBanner}>
                <Text>My Favourite</Text>
                <Text style={styles.audioCount}>0 songs</Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => console.log('new playlist added')}
                style={{ marginTop: 15 }}>
                <Text style={styles.playlistButton}>+ Add New Playlist</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    audioCount: {
        marginTop: 3,
        opacity: 0.5,
        fontSize: 14,
    },
    playlistBanner: {
        padding: 5,
        backgroundColor: 'rgba(204,204,204,0.3)',
        borderRadius: 5
    },
    playlistButton: {
        color: Color.ACTIVE_BG,
        letterSpacing: 1,
        fontWeight: 'bold',
        fontSize: 14,
        padding: 5,
    }
})

export default PlayList;