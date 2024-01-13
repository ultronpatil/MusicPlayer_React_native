import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Screen from '../componants/Screen';
import Color from '../misc/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../componants/PlayerButton';
import { AudioContext } from '../context/AudioProvider'

const { width } = Dimensions.get("window")

const Player = () => {
    const context = useContext(AudioContext)
    const { playbackPosition, playbackDuration } = context;
    const calculateSeekBar = () => {
        if (playbackPosition !== null && playbackDuration !== null) {
            return playbackPosition / playbackDuration;
        }
        return 0;
    };


    useEffect(() => {
        context.loadPreviousSong();
    }, [])
    if (!context.currentAudio) return null;
    return (
        <Screen>
            <View style={styles.container}>

                <Text style={styles.audioCount}>
                    {`${context.currentAudioIndex + 1}/${context.totalAudioCount}`}
                </Text>

                <View style={styles.midBannerContainer}>
                    <MaterialCommunityIcons name="music-circle" size={300} color={context.isPlaying ? Color.ACTIVE_BG : Color.FONT_MEDIUM} />
                </View>

                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.filename}</Text>
                    <Slider
                        style={{ width: width, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        value={calculateSeekBar()}
                        minimumTrackTintColor={Color.FONT_MEDIUM}
                        maximumTrackTintColor={Color.ACTIVE_BG}
                    />
                    <View style={styles.audioControllers}>
                        <PlayerButton iconType="PREV" />
                        <PlayerButton onPress={() => console.log("audio playing")} style={{ marginHorizontal: 15 }} iconType={context.isPlaying ? "PAUSE" : "PLAY"} />
                        <PlayerButton iconType="NEXT" />
                    </View>
                </View>

            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    audioCount: {
        textAlign: 'right',
        padding: 15,
        color: Color.FONT_LIGHT,
        fontSize: 14,

    },
    midBannerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    audioTitle: {
        color: Color.FONT_MEDIUM,
        fontSize: 16,
        padding: 15
    },
    audioControllers: {
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})

export default Player;