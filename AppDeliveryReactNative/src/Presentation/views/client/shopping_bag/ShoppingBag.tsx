import { View, Text, FlatList } from "react-native"
import useViewModel from "./ViewModel"
import { ShoppingBagItem } from "./Item"
import { RoundedButton } from "../../../components/RoundedButton"
import styles from "./Styles"

export const ClientShoppingBagScreen = () => {

    const { shoppingBag, total, addItem, substractItem, deleteItem } = useViewModel()

  return (
    <View style={styles.container}>
        <FlatList 
            data={shoppingBag}
            keyExtractor={(item) => item.id!}
            renderItem={({item}) => <ShoppingBagItem product={item} addItem={addItem} substractItem={substractItem} deleteItem={deleteItem} />}
        />
        <View style={styles.totalToPay}>
            <View style={styles.totalInfo}>
                <Text style={styles.totalText}>Total</Text>
                <Text>{total}€</Text>
            </View>
            <View style={styles.buttonAdd}>
                <RoundedButton text="CONFIRMAR ORDEN" onPress={() => {}} />
            </View>
        </View>
    </View>
  )
}
