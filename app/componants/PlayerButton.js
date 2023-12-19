import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Color from '../misc/Color'


const PlayerButton = (props) => {

    const { iconType, size = 40, iconColor = Color.FONT, onPress, } = props
    const getIconName = (type) => {
        switch (type) {
            case "PLAY":
                return 'playcircleo'

            case "PAUSE":
                return 'pausecircle'

            case "PREV":
                return 'banckward'

            case "NEXT":
                return 'forward'
        }
    }

    return (
        <AntDesign {...props} onPress={onPress} name={getIconName(iconType)} size={size} color={iconColor} />
    )
}


export default PlayerButton