import { useEffect, useState } from "react"
import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from "react-native"
import { CustomTextInput } from "../../components/CustomTextInput"
import { RoundedButton } from "../../components/RoundedButton"
import { ModalPickImage } from "../../components/ModalPickImage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigator/MainStackNavigator"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { MyColors } from "../../theme/AppTheme"

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

export const RegisterScreen = ({navigation, route}: RegisterScreenProps) => {

    const { name, lastname, email, phone, image, password, confirmPassword, onChange, register, errorMessage, pickImage, takePhoto, user, loading } = useViewModel()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (errorMessage !== "") {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage])

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined) {
            navigation.replace('ClientTabsNavigator')
        }
    }, [user])

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../../assets/chef.jpg')} 
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
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
            <ModalPickImage 
                openGallery={pickImage}
                openCamera={takePhoto}
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
            />
            {loading && <ActivityIndicator size="large" color={MyColors.primary} style={styles.loading} /> }
        </View>
    )
}