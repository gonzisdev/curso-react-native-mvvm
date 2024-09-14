import { View, Text, FlatList } from "react-native"
import useViewModel from "./ViewModel"
import styles from "./Styles"

export const RolesScreen = () => {

    const { user } = useViewModel()

  return (
    <View>
        <FlatList
            data={user?.roles}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={(item) => item.id} 
        />
    </View>
  )
}
