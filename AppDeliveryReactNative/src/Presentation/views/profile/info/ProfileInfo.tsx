import { View, Button} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../../../App"
import useViewModel from "./ViewModel"

type ProfileInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileInfoScreen'>

export const ProfileInfoScreen = ({navigation, route}: ProfileInfoScreenProps) => {

    const { removeSession } = useViewModel()

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Button 
            title="Cerrar sesión"
            onPress={() => {removeSession(), navigation.navigate('HomeScreen')}}
        />
    </View>
  )
}
