import { View, Text, StyleSheet, Dimensions, Touchable, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import Color from '../misc/Color';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const getThumbnailText = (filename) => {
    if (filename && filename.length > 0) {
        return filename[0];
    }
    return ''; // Default value in case of empty filename
};

const convertTime = (duration) => {
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor((duration / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${displayMinutes}:${displaySeconds}`;
};

renderPlayPauseIcon = (isPlaying) => {
    if (isPlaying) return <Entypo name="controller-paus" size={24} color="white" />
    return <Ionicons name="play" size={24} color="white" />
}

const AudioListItem = ({ title, duration, openOptions, onAudioPress, isPlaying, activeThumbnail }) => {
    return (
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onAudioPress}>
                    <View style={styles.leftContainer}>
                        <View style={[styles.thumbnail, { backgroundColor: activeThumbnail ? Color.ACTIVE_BG : Color.FONT_LIGHT }]}>
                            <Text style={styles.thumbnailText}>
                                {activeThumbnail ? renderPlayPauseIcon(isPlaying) : getThumbnailText(title)}
                            </Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>{title}</Text>
                            <Text numberOfLines={1} style={styles.time}>{convertTime(duration)}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.rightContainer}>
                    <SimpleLineIcons style={{ padding: 8 }} onPress={openOptions} name="options-vertical" size={24} color={Color.FONT_MEDIUM} />
                </View>

            </View>
            <View style={styles.separator} />

        </>
    )
}

const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
        // backgroundColor: "gray",
    },
    leftContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: "center",
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        backgroundColor: Color.FONT_LIGHT,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    thumbnailText: {
        fontSize: 20,
        fontWeight: "bold",
        color: Color.FONT
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10
    },
    title: {
        fontSize: 16,
        color: Color.FONT
    },
    separator: {
        width: width - 80,
        borderBottomColor: "#333",
        borderBottomWidth: 0.5,
        opacity: 0.3,
        height: 0.5,
        alignSelf: "center",
        marginTop: 10,
    },
    time: {
        fontSize: 14,
        color: Color.FONT_LIGHT

    }
})


export default AudioListItem