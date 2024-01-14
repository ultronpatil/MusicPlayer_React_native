import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import AppNavigator from "./app/navigation/AppNavigator"
import AudioProvider from "./app/context/AudioProvider"
import { View } from "react-native"
import AudioListItem from "./app/componants/AudioListItem"
import Color from "./app/misc/Color"
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.APP_BG,
  }
}


export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer theme={MyTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>

  )

}