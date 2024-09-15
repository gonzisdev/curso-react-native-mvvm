import { useEffect, useState } from "react"
import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from "react-native"
import { CustomTextInput } from "../../../components/CustomTextInput"
import { RoundedButton } from "../../../components/RoundedButton"
import { ModalPickImage } from "../../../components/ModalPickImage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../../../App"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { MyColors } from "../../../theme/AppTheme"

type ProfileUpdateScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileUpdateScreen'>

export const ProfileUpdateScreen = ({navigation, route}: ProfileUpdateScreenProps) => {

    const { user } = route.params

    const { name, lastname, phone, image, onChange, update, errorMessage, pickImage, takePhoto, loading } = useViewModel(user)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (errorMessage !== "") {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage])

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../../../assets/city.jpg')} 
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        image == ''
                        ? 
                            <Image
                                source={{uri: user?.image}}
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
                    <Text style={styles.formText}>ACTUALIZAR</Text>    
                    <CustomTextInput 
                        image={require("../../../../../assets/user.png")}
                        placeholder="Nombre"
                        value={name}
                        keyboardType="default"
                        property="name"
                        onChangeText={onChange}
                    />
                    <CustomTextInput 
                        image={require("../../../../../assets/my_user.png")}
                        placeholder="Apellidos"
                        value={lastname}
                        keyboardType="default"
                        property="lastname"
                        onChangeText={onChange}
                    />
                    <CustomTextInput 
                        image={require("../../../../../assets/phone.png")}
                        placeholder="Teléfono"
                        value={phone}
                        keyboardType="numeric"
                        property="phone"
                        onChangeText={onChange}
                    />
                    <View style={{marginTop: 30}}>
                        <RoundedButton text='CONFIRMAR' onPress={update} />
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