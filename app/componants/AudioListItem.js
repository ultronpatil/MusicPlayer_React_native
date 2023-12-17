import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import Color from '../misc/Color';
const AudioListItem = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.thumbnailText}>a</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>Tighsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddtle</Text>
                        <Text numberOfLines={1} style={styles.time}>3.33</Text>
                    </View>
                </View>

                <View style={styles.rightContainer}>
                    <SimpleLineIcons name="options-vertical" size={24} color={Color.FONT_MEDIUM} />
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
        // backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        backgroundColor: Color.FONT_LIGHT,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25
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