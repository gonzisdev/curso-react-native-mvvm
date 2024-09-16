import { View, Text, FlatList } from "react-native"
import useViewModel from "./ViewModel"
import { useEffect } from "react"

export const AdminCategoryListScreen = () => {

  const { categories, getCategories } = useViewModel()

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
    </View>
  )
}
