import { View, Text, FlatList } from "react-native"
import useViewModel from "./ViewModel"
import { useEffect } from "react"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ClientProductListItem } from "./Item"

type ClientProductListScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientProductListScreen'>

export const ClientProductListScreen = ({navigation, route}: ClientProductListScreenProps) => {

    const { id_category } = route.params

    const { products, getProducts } = useViewModel()

    useEffect(() => {
        getProducts(id_category)
    }, [])

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
        <FlatList 
            data={products}
            keyExtractor={(item) => item.id!}
            renderItem={({item}) => <ClientProductListItem product={item} navigation={navigation} />}
        />
    </View>
  )
}
