//play
export const play = async (playbackObj, uri) => {
    try {
        return await playbackObj.loadAsync({ uri }, { shouldPlay: true })
    }
    catch (error) {
        console.log('error while plying');
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

export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync()
    }
    catch (error) {
        console.log('error while pausing');
    }
}