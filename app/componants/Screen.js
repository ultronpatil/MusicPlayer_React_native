import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import Color from '../misc/Color'

const Screen = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_BG,
        paddingTop: StatusBar.currentHeight
    }
})

export default Screen