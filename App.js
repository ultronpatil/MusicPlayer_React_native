import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app/navigation/AppNavigator"
import AudioProvider from "./app/context/AudioProvider"
import { View } from "react-native"
import AudioListItem from "./app/componants/AudioListItem"

export default function App() {
  // return (
  //   <AudioProvider>
  //     <NavigationContainer>
  //       <AppNavigator />
  //     </NavigationContainer>
  //   </AudioProvider>

  // )
  return <View style={{ marginTop: 50 }}>
    <AudioListItem></AudioListItem>
  </View>
}