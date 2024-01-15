import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Color from '../misc/Color';
import PlayListInputModal from '../componants/PlayListInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioContext } from '../context/AudioProvider';

const PlayList = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const context = useContext(AudioContext)
    const { playlist, addToPlaylist, updateState } = context

    const createPlaylist = async (playlistName) => {
        const result = await AsyncStorage.getItem('playlist')
        if (result !== null) {

            const audios = [];
            if (addToPlaylist) {
                audios.push(addToPlaylist);
            }

            const newList = {
                id: Date.now(),
                title: playlistName,
                audios: audios
            }
            const updatedList = [...playlist, newList];
            updateState(context, { addToPlaylist: null, playlist: updatedList })
            await AsyncStorage.setItem('playlist', JSON.stringify(updatedList))
        }
        setModalVisible(false)
    }


    const renderPlaylist = async () => {
        const result = await AsyncStorage.getItem('playlist');
        if (result === null) {
            const defaultPlaylist = {
                id: Date.now(),
                title: 'My Favorite',
                audios: []
            }
            const newPlaylist = [...playlist, defaultPlaylist];
            updateState(context, { playlist: [...newPlaylist] })
            return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlaylist]))

        }
        updateState(context, { playlist: JSON.parse(result) })

    }

    useEffect(() => {
        if (!playlist || !playlist.length) {
            renderPlaylist();
        }
    }, []);


    return (
        <ScrollView contentContainerStyle={styles.container}>

            {playlist.length ? playlist.map(item => <TouchableOpacity
                key={item.id.toString()}
                style={styles.playlistBanner}>
                <Text>{item.title}</Text>
                <Text style={styles.audioCount}>{item.audios.length > 1 ? `${item.audios.length} songs` : `${item.audios.length} song`}</Text>
            </TouchableOpacity>
            ) : null}

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ marginTop: 15 }}>
                <Text style={styles.playlistButton}>+ Add New Playlist</Text>
            </TouchableOpacity>
            <PlayListInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={createPlaylist}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    audioCount: {
        marginTop: 3,
        opacity: 0.5,
        fontSize: 14,
    },
    playlistBanner: {
        padding: 5,
        backgroundColor: 'rgba(204,204,204,0.3)',
        borderRadius: 5,
        marginBottom: 5
    },
    playlistButton: {
        color: Color.ACTIVE_BG,
        letterSpacing: 1,
        fontWeight: 'bold',
        fontSize: 14,
        padding: 5,
    }
})

export default PlayList;



// import React, { useContext, useEffect, useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
// import Color from '../misc/Color';
// import PlayListInputModal from '../componants/PlayListInputModal';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AudioContext } from '../context/AudioProvider';

// const PlayList = () => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const { PlayList, addToPlaylist, updateState } = useContext(AudioContext);

//     const createPlaylist = async (playlistName) => {
//         const result = await AsyncStorage.getItem('playlist');
//         if (result !== null) {
//             const audios = [];
//             if (addToPlaylist) {
//                 audios.push(addToPlaylist);
//             }

//             const newList = {
//                 id: Date.now(),
//                 title: playlistName,
//                 audios: audios
//             };
//             const updatedList = [...PlayList, newList];
//             updateState(context, { addToPlaylist: null, PlayList: updatedList });
//             await AsyncStorage.setItem('playlist', JSON.stringify(updatedList));
//         }
//         setModalVisible(false);
//     };

//     const renderPlaylist = async () => {
//         const result = await AsyncStorage.getItem('playlist');
//         if (result === null) {
//             const defaultPlaylist = {
//                 id: Date.now(),
//                 title: 'My Favorite',
//                 audios: []
//             };
//             const newPlaylist = [defaultPlaylist];
//             updateState(context, { PlayList: newPlaylist });
//             await AsyncStorage.setItem('playlist', JSON.stringify(newPlaylist));
//         } else {
//             updateState(context, { PlayList: JSON.parse(result) });
//         }
//     };

//     useEffect(() => {
//         if (!PlayList || !PlayList.length) {
//             renderPlaylist();
//         }
//     }, []);

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.playlistBanner}>
//                 <Text>My Favourite</Text>
//                 <Text style={styles.audioCount}>0 songs</Text>
//             </TouchableOpacity>

//             <FlatList data={PlayList} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Text>{item.title}</Text>} />

//             <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 15 }}>
//                 <Text style={styles.playlistButton}>+ Add New Playlist</Text>
//             </TouchableOpacity>
//             <PlayListInputModal
//                 visible={modalVisible}
//                 onClose={() => setModalVisible(false)}
//                 onSubmit={createPlaylist}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20
//     },
//     audioCount: {
//         marginTop: 3,
//         opacity: 0.5,
//         fontSize: 14,
//     },
//     playlistBanner: {
//         padding: 5,
//         backgroundColor: 'rgba(204,204,204,0.3)',
//         borderRadius: 5
//     },
//     playlistButton: {
//         color: Color.ACTIVE_BG,
//         letterSpacing: 1,
//         fontWeight: 'bold',
//         fontSize: 14,
//         padding: 5,
//     }
// });

// export default PlayList;
