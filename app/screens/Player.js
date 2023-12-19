import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Screen from '../componants/Screen';
import Color from '../misc/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../componants/PlayerButton';

const { width } = Dimensions.get("window")

const Player = () => {
    return (
        <Screen>
            <View style={styles.container}>

                <Text style={styles.audioCount}>
                    1 / 99
                </Text>

                <View style={styles.midBannerContainer}>
                    <MaterialCommunityIcons name="music-circle" size={300} color={Color.ACTIVE_BG} />
                </View>

                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>song name</Text>
                    <Slider
                        style={{ width: width, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={Color.FONT_MEDIUM}
                        maximumTrackTintColor={Color.ACTIVE_BG}
                    />
                    <View style={styles.audioControllers}>
                        <PlayerButton iconType="PREV" />
                        <PlayerButton onPress={() => console.log("audio playing")} style={{ marginHorizontal: 15 }} iconType="PAUSE" />
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