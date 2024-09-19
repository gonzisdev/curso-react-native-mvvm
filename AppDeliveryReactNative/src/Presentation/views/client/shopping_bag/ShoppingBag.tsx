import { View, Text, FlatList } from "react-native"
import useViewModel from "./ViewModel"
import { ShoppingBagItem } from "./Item"
import { RoundedButton } from "../../../components/RoundedButton"
import styles from "./Styles"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ClientStackParamList } from "../../../navigator/ClientStackNavigator"

type ClientShoppingBagScreenProps = NativeStackScreenProps<ClientStackParamList, "ClientShoppingBagScreen">

export const ClientShoppingBagScreen = ({navigation, route}: ClientShoppingBagScreenProps) => {

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
                <RoundedButton text="CONFIRMAR ORDEN" onPress={() => navigation.navigate("ClientAddressListScreen")} />
            </View>
        </View>
    </View>
  )
}
