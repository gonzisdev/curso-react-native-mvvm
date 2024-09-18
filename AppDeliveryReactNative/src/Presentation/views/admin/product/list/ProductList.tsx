import { useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, FlatList, ToastAndroid } from "react-native"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"
import { AdminProductListItem } from "./Item"
import useViewModel from "./ViewModel"

type AdminProductListScreenProps = NativeStackScreenProps<ProductStackParamList, 'AdminProductListScreen'>

export const AdminProductListScreen = ({navigation, route}: AdminProductListScreenProps) => {

    const { category } = route.params
    const { products, getProducts, deleteProduct, responseMessage } = useViewModel()

    useEffect(()=> {
      if (category.id !== undefined && category.id !== null) {
        getProducts(category.id)
      }
    }, [])

    useEffect(()=> {
      if (responseMessage !== '') {
        ToastAndroid.show(responseMessage, ToastAndroid.LONG)
      }
    }, [responseMessage])

  return (
    <View style={{backgroundColor: "white"}}>
        <FlatList 
          data={products}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <AdminProductListItem product={item} remove={deleteProduct} category={category} />}
        />
    </View>
  )
}
