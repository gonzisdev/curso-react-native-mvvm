import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native"
import { RoundedButton } from "../../components/RoundedButton"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../../App"
import { MyColors } from "../../theme/AppTheme"
import useViewModel from "./ViewModel"
import { CustomTextInput } from "../../components/CustomTextInput"

export const RegisterScreen = () => {

    const { name, lastname, email, phone, password, confirmPassword, onChange, register } = useViewModel()

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../../assets/chef.jpg')} 
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../../assets/user_image.png")}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>REGISTRARSE</Text>
                <CustomTextInput 
                    image={require("../../../../assets/user.png")}
                    placeholder="Nombre"
                    value={name}
                    keyboardType="default"
                    property="name"
                    onChangeText={onChange}
                />
                <CustomTextInput 
                    image={require("../../../../assets/my_user.png")}
                    placeholder="Apellidos"
                    value={lastname}
                    keyboardType="default"
                    property="lastname"
                    onChangeText={onChange}
                />
                <CustomTextInput 
                    image={require("../../../../assets/email.png")}
                    placeholder="Email"
                    value={email}
                    keyboardType="email-address"
                    property="email"
                    onChangeText={onChange}
                />
                <CustomTextInput 
                    image={require("../../../../assets/phone.png")}
                    placeholder="Teléfono"
                    value={phone}
                    keyboardType="numeric"
                    property="phone"
                    onChangeText={onChange}
                />
                <CustomTextInput 
                    image={require("../../../../assets/password.png")}
                    placeholder="Contraseña"
                    value={password}
                    keyboardType="default"
                    secureTextEntry={true}
                    property="password"
                    onChangeText={onChange}
                />
                <CustomTextInput 
                    image={require("../../../../assets/confirm_password.png")}
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    keyboardType="default"
                    secureTextEntry={true}
                    property="confirmPassword"
                    onChangeText={onChange}
                />
                <View style={{marginTop: 30}}>
                    <RoundedButton text='CONFIRMAR' onPress={register} />
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
        height: "70%",
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
        alignItems: "center",
        top: "5%"
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

