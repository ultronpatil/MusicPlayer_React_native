//play
export const play = async (playbackObj, uri) => {
    try {
        return await playbackObj.loadAsync({ uri }, { shouldPlay: true })
    }
    catch (error) {
        console.log('error while plying', error.message);
    }
}

//pause
export const pause = async (playbackObj) => {
    try {
        return await playbackObj.setStatusAsync({ shouldPlay: false })
    }
    catch (error) {
        console.log('error while pausing');
    }
}

//resume
export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync()
    }
    catch (error) {
        console.log('error while pausing');
    }

}

// nextplay
export const next = async (playbackObj, uri) => {
    try {
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri)
    }
    catch (error) {
        console.log('error while plying');
    }
}