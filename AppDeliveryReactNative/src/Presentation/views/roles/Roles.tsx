import { useState } from "react"
import { View, Dimensions } from "react-native"
import { RolesItem } from "./Item"
import Carousel from "react-native-reanimated-carousel"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import useViewModel from "./ViewModel"
import { RootStackParamList } from "../../navigator/MainStackNavigator"

type RolesScreenProps = NativeStackScreenProps<RootStackParamList, 'RolesScreen'>

export const RolesScreen = ({navigation, route}: RolesScreenProps) => {

    const { user } = useViewModel()

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    const [mode, setMode] = useState<any>('horizontal-stack')
    const [snapDirection, setSnapDirection] = useState<'left' | 'right'>('left')

  return (
    <GestureHandlerRootView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View>
            {/* <FlatList
                data={user?.roles}
                renderItem={({item}) => <RolesItem rol={item} height={420} width={width - 100} />}
                keyExtractor={(item) => item.id} 
            /> */}
            <Carousel
                loop={false}
                width={width}
                height={height / 2}
                autoPlay={false}
                data={user?.roles!}
                scrollAnimationDuration={5000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => <RolesItem rol={item} height={420} width={width - 100} navigation={navigation} />}
                modeConfig={{
                    snapDirection,
                    stackInterval: 30
                }}
                mode={mode}
            />
        </View>
    </GestureHandlerRootView>
  )
}
