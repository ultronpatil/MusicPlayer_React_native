import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Screen from '../componants/Screen';
import Color from '../misc/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../componants/PlayerButton';
import { AudioContext } from '../context/AudioProvider'
import { next, pause, play, resume } from '../misc/AudioController';
import { storeAudioForNextOpening } from '../misc/Helper';


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

    const handlePlayPause = async () => {
        //play
        if (context.soundObj === null) {
            const audio = context.currentAudio;
            const status = await play(context.playbackObj, audio.uri)
            return context.updateState(context, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: context.currentAudioIndex
            })
        }

        //pause
        if (context.soundObj && context.soundObj.isPlaying) {
            const status = await pause(context.playbackObj)
            return context.updateState(context, {
                soundObj: status,
                isPlaying: false,
            })
        }
        //resume  
        if (context.soundObj && !context.soundObj.isPlaying) {
            const status = await resume(context.playbackObj)
            return context.updateState(context, {
                soundObj: status,
                isPlaying: true,
            })
        }
    }

    const handleNext = async () => {
        const { isLoaded } = await context.playbackObj.getStatusAsync()
        const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
        let audio = context.AudioFiles[context.currentAudioIndex + 1];
        let index;
        let status;

        if (!isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1;
            status = await play(context.playbackObj, audio.uri)
        }

        if (isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1;
            if (isLoaded) {
                status = await next(context.playbackObj, audio.uri)
            } else {
                status = await play(context.playbackObj, audio.uri)
            }

        }
        if (isLastAudio) {
            index = 0;
            audio = context.AudioFiles[index];
            status = await next(context.playbackObj, audio.uri)
        }
        context.updateState(context, {
            currentAudio: audio,
            playbackObj: context.playbackObj,
            soundObj: status,
            isPlaying: true,
            currentAudioIndex: index
        });
        storeAudioForNextOpening(audio, index)
    }

    const handlePrevious = async () => {
        const { isLoaded } = await context.playbackObj.getStatusAsync()
        const isFirstAudio = context.currentAudioIndex <= 0;
        let audio = context.AudioFiles[context.currentAudioIndex - 1];
        let index;
        let status;

        if (!isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1;
            status = await play(context.playbackObj, audio.uri)
        }

        if (isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1;
            if (isLoaded) {
                status = await next(context.playbackObj, audio.uri)
            } else {
                status = await play(context.playbackObj, audio.uri)
            }

        }
        if (isFirstAudio) {
            index = context.totalAudioCount - 1;
            audio = context.AudioFiles[index];
            status = await next(context.playbackObj, audio.uri)
        }
        context.updateState(context, {
            currentAudio: audio,
            playbackObj: context.playbackObj,
            soundObj: status,
            isPlaying: true,
            currentAudioIndex: index
        });
        storeAudioForNextOpening(audio, index)
    }



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
                        <PlayerButton iconType="PREV"
                            onPress={handlePrevious} />
                        <PlayerButton onPress={handlePlayPause} style={{ marginHorizontal: 15 }} iconType={context.isPlaying ? "PAUSE" : "PLAY"} />
                        <PlayerButton iconType="NEXT"
                            onPress={handleNext} />
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