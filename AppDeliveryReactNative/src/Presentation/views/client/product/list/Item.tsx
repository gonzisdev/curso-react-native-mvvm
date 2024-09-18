import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Product } from "../../../../../Domain/entities/Product"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"

type ClientProductListItemProps = {
    product: Product
    navigation: NativeStackNavigationProp<ClientStackParamList, "ClientProductListScreen", undefined>
}

export const ClientProductListItem = ({product, navigation}: ClientProductListItemProps) => {

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('ClientProductDetailScreen', {product: product})}
    >
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>{product.price}€</Text>
            </View>
            <Image 
                source={{uri: product.image1}}
                style={styles.image}
            />
        </View>
        <View style={styles.divider}></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 90,
        paddingHorizontal: 20,
        marginTop: 10,
        paddingTop: 10,
        justifyContent: "space-between"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    info: {
        marginLeft: 15,
        flex: 1
    },
    title: {
        color: "black",
        fontSize: 15
    },
    description: {
        color: "gray",
        fontSize: 12,
        marginTop: 3
    },
    price: {
        color: "black",
        fontSize: 12,
        fontWeight: "bold"
    },
    actionContainer: {
        marginRight: 40
    },
    actionImage: {
        width: 25,
        height: 25,
        marginVertical: 2
    },
    divider: {
        height: 1,
        backgroundColor: "#f2f2f2",
        marginHorizontal: 30,
        flex: 1
    }
})