import { useEffect } from "react"
import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity } from "react-native"
import { CustomTextInput } from "../../components/CustomTextInput"
import { RoundedButton } from "../../components/RoundedButton"
import useViewModel from "./ViewModel"
import styles from "./Styles"

export const RegisterScreen = () => {

    const { name, lastname, email, phone, image, password, confirmPassword, onChange, register, errorMessage, pickImage } = useViewModel()

    useEffect(() => {
        if (errorMessage !== "") {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage])

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../../assets/chef.jpg')} 
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={pickImage}>
                    {
                        image == ''
                        ? 
                            <Image
                                source={require("../../../../assets/user_image.png")}
                                style={styles.logoImage}
                            />
                        :
                            <Image
                                source={{uri: image}}
                                style={styles.logoImage}
                            />
                    }
                </TouchableOpacity>
                <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>
            <View style={styles.form}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                </ScrollView>
            </View>
        </View>
    )
}