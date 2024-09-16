import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native"
import { Rol } from "../../../Domain/entities/Rol"
import { MyColors } from "../../theme/AppTheme"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigator/MainStackNavigator"


type RolesItemProps = {
    rol: Rol
    height: number
    width: number
    navigation: NativeStackNavigationProp<RootStackParamList, "RolesScreen", undefined>
}

export const RolesItem = ({rol, height, width, navigation}: RolesItemProps) => {
  return (
    <TouchableOpacity 
        style={{...styles.container, height: height, width: width}}
        onPress={() => {
            if (rol.name === "ADMIN") {
                navigation.replace("AdminTabsNavigator")
            } else if (rol.name === "CLIENTE") {
                navigation.replace("ClientTabsNavigator")
            }
        }}
    >
        <View style={styles.imageContainer}>
            <Image 
                style={styles.image}
                source={{uri: rol.image}} 
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{rol.name}</Text>
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
        resizeMode: "contain"
    },
    titleContainer: {
        height: 50,
        backgroundColor: MyColors.primary,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: "white",
        fontWeight: "bold"
    }
})