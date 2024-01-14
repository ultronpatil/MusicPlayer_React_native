import { View, Text, Modal, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

const PlayListInputModal = ({ visible, onClose, onSubmit }) => {
    return (
        <Modal visible={visible} animationType='fade' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.inputContainer}>
                    <Text style={{ color: '#365486' }}>Create New Playlist</Text>
                    <TextInput style={styles.input} />
                    <AntDesign
                        name="check"
                        size={24}
                        color='#fff'
                        style={styles.submitIcon}
                        onPress={onSubmit}
                    />
                </View>
            </View>


            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: width - 20,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: width - 40,
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        fontSize: 18,
        paddingVertical: 5

    },
    submitIcon: {
        padding: 10,
        backgroundColor: '#7FC7D9',
        borderRadius: 50,
        marginTop: 15
    },
    modalBG: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1
    }
})

export default PlayListInputModal