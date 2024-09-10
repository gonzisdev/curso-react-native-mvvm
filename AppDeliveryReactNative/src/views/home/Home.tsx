import { View, TextInput, ToastAndroid, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { RoundedButton } from "../../components/RoundedButton"
import { MyColors } from "../../theme/AppTheme"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../App"
import { useState } from "react"

export const HomeScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/chef.jpg')} 
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../assets/logo.png")}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>FOOD APP</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>INGRESAR</Text>
                <View style={styles.formInput}>
                    <Image
                        source={require("../../../assets/email.png")}
                        style={styles.formIcon}
                    />
                    <TextInput 
                        style={styles.formTextInput}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.formInput}>
                    <Image
                        source={require("../../../assets/password.png")}
                        style={styles.formIcon}
                    />
                    <TextInput 
                        style={styles.formTextInput}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={{marginTop: 30}}>
                    <RoundedButton text='ENTRAR' onPress={() => {}} />
                </View>
                <View style={styles.formRegister}>
                    <Text>¿No tienes cuenta?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RegisterScreen")}
                    >
                        <Text style={styles.formRegisterText}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'black',
    },
    imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%"
    },
    form: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30
    }, 
    formText: {
    fontWeight: "bold",
    fontSize: 16
    },
    formIcon: {
    width: 25,
    height: 25,
    marginTop: 5
    },
    formInput: {
    flexDirection: "row",
    marginTop: 30
    },
    formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#aaaaaa",
    marginLeft: 15
    },
    formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30
    },
    formRegisterText: {
    fontStyle: "italic",
    color: MyColors.primary,
    borderBottomWidth: 1,
    borderBottomColor: MyColors.primary,
    fontWeight: "bold",
    marginLeft: 10
    },
    logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%"
    },
    logoImage: {
    width: 100,
    height: 100
    },
    logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
    }
})

