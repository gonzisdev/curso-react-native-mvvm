import { View, FlatList, ToastAndroid } from "react-native"
import useViewModel from "./ViewModel"
import { useEffect } from "react"
import { AdminCategoryListItem } from "./Item"

export const AdminCategoryListScreen = () => {

  const { categories, deleteCategory, responseMessage } = useViewModel()

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
  }, [responseMessage])
  

  return (
    <View style={{backgroundColor: "white"}}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <AdminCategoryListItem category={item} remove={deleteCategory} />}
        />
    </View>
  )
}
