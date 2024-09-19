import { useEffect, useState } from "react"
import { View, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from "react-native"
import { CustomTextInput } from "../../../../components/CustomTextInput"
import { RoundedButton } from "../../../../components/RoundedButton"
import { MyColors, MyStyles } from "../../../../theme/AppTheme"
import useViewModel from "./ViewModel"
import styles from "./Styles"

export const ClientAddressCreateScreen = () => {

    const { address, neighborhood, refPoint, onChange, loading, responseMessage } = useViewModel()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (responseMessage !== "") {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.imageContainer}
            onPress={() => setModalVisible(true)}
        >
            <Image
                source={require('../../../../../../assets/map.png')}
                style={styles.image}
            />

        </TouchableOpacity>
        <View style={styles.form}>
            <CustomTextInput 
                placeholder="Nombre de la dirección"
                image={require('../../../../../../assets/categories.png')}
                keyboardType="default"
                value={address}
                onChangeText={onChange}
                property="address"
            />
            <CustomTextInput 
                placeholder="Barrio"
                image={require('../../../../../../assets/description.png')}
                keyboardType="default"
                value={neighborhood}
                onChangeText={onChange}
                property="neighborhood"
            />
            <CustomTextInput 
                placeholder="Punto de referencia"
                image={require('../../../../../../assets/description.png')}
                keyboardType="default"
                value={refPoint}
                onChangeText={onChange}
                property="refPoint"
            />
        </View>
        <View style={styles.buttonContainer}>
            <RoundedButton 
                text="CREAR DIRECCIÓN"
                onPress={() => {}}
            />
        </View>
        {loading && <ActivityIndicator size="large" color={MyColors.primary} style={MyStyles.loading} /> }
    </View>
  )
}
