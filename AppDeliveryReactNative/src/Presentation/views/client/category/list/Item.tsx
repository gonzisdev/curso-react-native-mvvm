import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Category } from "../../../../../Domain/entities/Category"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"

type ClientCategoryItemProps = {
    category: Category
    height: number
    width: number
    navigation: NativeStackNavigationProp<ClientStackParamList, "ClientCategoryListScreen", undefined>
}

export const ClientCategoryItem = ({category, height, width, navigation}: ClientCategoryItemProps) => {
  return (
    <TouchableOpacity 
        style={{...styles.container, height: height, width: width}}
        onPress={() => {
            navigation.navigate('ClientProductListScreen', {id_category: category.id})
        }}
    >
        <View style={styles.imageContainer}>
            <Image 
                style={styles.image}
                source={{uri: category.image}} 
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{category.name}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        paddingBottom: 20,
        paddingHorizontal:7
    },
    imageContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 18
    },
    image: {
        flex: 1,
        //resizeMode: "contain",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    titleContainer: {
        height: 70,
        backgroundColor: "white",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        elevation: 20
    },
    title: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold"
    }
})