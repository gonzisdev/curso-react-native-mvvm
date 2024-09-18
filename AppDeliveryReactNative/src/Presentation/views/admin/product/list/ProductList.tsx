import { useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, FlatList, Text } from "react-native"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"
import useViewModel from "./ViewModel"

type AdminProductListScreenProps = NativeStackScreenProps<ProductStackParamList, 'AdminProductListScreen'>

export const AdminProductListScreen = ({navigation, route}: AdminProductListScreenProps) => {

    const { category } = route.params
    const { products, getProducts } = useViewModel()

    useEffect(()=> {
      getProducts(category.id)
    }, [])

  return (
    <View style={{marginTop: 50}}>
        <FlatList 
          data={products}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
    </View>
  )
}
