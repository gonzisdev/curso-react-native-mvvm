import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text } from "react-native"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"

type AdminProductListScreenProps = NativeStackScreenProps<ProductStackParamList, 'AdminProductListScreen'>

export const AdminProductListScreen = ({navigation, route}: AdminProductListScreenProps) => {

    const { category } = route.params

  return (
    <View style={{marginTop: 50}}>
        <Text>AdminProductListScreen</Text>
    </View>
  )
}
