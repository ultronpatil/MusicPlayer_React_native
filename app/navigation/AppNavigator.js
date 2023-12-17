import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return <Tab.Navigator>
        <Tab.Screen name='AudioList' component={AudioList} options={{
            headerShown: false, tabBarIcon: ({ color, size }) => {
                return <Feather name="headphones" size={size} color={color} />
            }
        }} />
        <Tab.Screen name='Player' component={Player} options={{
            headerShown: false, tabBarIcon: ({ color, size }) => {
                return <SimpleLineIcons name="music-tone-alt" size={size} color={color} />
            }
        }} />
        <Tab.Screen name='PlayList' component={PlayList} options={{
            headerShown: false, tabBarIcon: ({ color, size }) => {
                return <Fontisto name="play-list" size={size} color={color} />
            }
        }} />
    </Tab.Navigator>
}

export default AppNavigator;