import { View, Button} from "react-native"
import useViewModel from "./ViewModel"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../../../App"

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
