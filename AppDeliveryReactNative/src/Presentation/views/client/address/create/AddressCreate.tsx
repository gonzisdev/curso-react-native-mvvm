import { useEffect, useState } from "react"
import { View, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from "react-native"
import { CustomTextInput } from "../../../../components/CustomTextInput"
import { RoundedButton } from "../../../../components/RoundedButton"
import { MyColors, MyStyles } from "../../../../theme/AppTheme"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"

type ClientAddressCreateScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'>

export const ClientAddressCreateScreen = ({navigation, route}: ClientAddressCreateScreenProps) => {

    const { address, neighborhood, refPoint, onChange, loading, responseMessage } = useViewModel()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (route.params?.refPoint ) {
            onChange('refPoint', route.params?.refPoint)
        }
    }, [route.params?.refPoint])

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
                image={require('../../../../../../assets/location.png')}
                keyboardType="default"
                value={address}
                onChangeText={onChange}
                property="address"
            />
            <CustomTextInput 
                placeholder="Barrio"
                image={require('../../../../../../assets/neighborhood.png')}
                keyboardType="default"
                value={neighborhood}
                onChangeText={onChange}
                property="neighborhood"
            />
            <TouchableOpacity onPress={() => navigation.navigate('ClientAddressMapScreen')}>
                <CustomTextInput 
                    placeholder="Punto de referencia"
                    image={require('../../../../../../assets/ref_point.png')}
                    keyboardType="default"
                    value={refPoint}
                    editable={false}
                    onChangeText={onChange}
                    property="refPoint"
                />
            </TouchableOpacity>
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
