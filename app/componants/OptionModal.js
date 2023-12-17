import { Modal, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Color from '../misc/Color'
import { Touchable } from 'react-native'

const OptionModal = ({ visible, onClose, currentSong, onPlayPress, onPlaylistPress }) => {
    const { filename } = currentSong;
    return (
        <>
            <StatusBar hidden />
            <Modal animationType='slide' transparent visible={visible} >
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>{filename}</Text>
                    <View style={styles.optionContainer}>
                        <TouchableWithoutFeedback onPress={onPlayPress}>
                            <Text style={styles.options}>Play</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onPlaylistPress}>
                            <Text style={styles.options}>add to PlayList</Text>
                        </TouchableWithoutFeedback>

                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBG}></View>
                </TouchableWithoutFeedback>


            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },
    optionContainer: {
        padding: 20,

    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 20,
        paddingBottom: 0,
        color: Color.FONT_MEDIUM,
    },
    options: {
        fontSize: 16,
        fontWeight: "bold",
        color: Color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
    },
    modalBG: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: Color.MODAL_BG
    }
})

export default OptionModal

