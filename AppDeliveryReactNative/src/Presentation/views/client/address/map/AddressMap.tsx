import { useEffect } from "react"
import { Image, ToastAndroid, View, Text } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { RoundedButton } from "../../../../components/RoundedButton"
import useViewModel from "./ViewModel"
import stylesMap from "./StylesMap"
import styles from "./Styles"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"

type ClientAddressCreateScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientAddressMapScreen'>

export const ClientAddressMapScreen = ({navigation, route}: ClientAddressCreateScreenProps) => {

    const { messagePermissions, postition, mapRef, onRegionChangeComplete, name, latitude, longitude } = useViewModel()

    useEffect(() => {
        if (messagePermissions != '') {
            ToastAndroid.show(messagePermissions, ToastAndroid.LONG)
        }
    }, [messagePermissions])

  return (
    <View style={styles.container}>
        <MapView 
            ref={mapRef}
            customMapStyle={stylesMap}
            style={{height: "100%", width: "100%"}}
            provider={PROVIDER_GOOGLE}
            onRegionChangeComplete={(region) => onRegionChangeComplete(region.latitude, region.longitude)}
        />
        <Image 
            style={styles.imageLocation}
            source={require('../../../../../../assets/location_home.png')}
        />
        <View style={styles.refPoint}>
            <Text style={styles.refPointText}>{name}</Text>
        </View>
        <View style={styles.buttonRefPoint}> 
            <RoundedButton text="SELECCIONAR PUNTO" onPress={() => {
                navigation.navigate({
                    name: "ClientAddressCreateScreen",
                    merge: true,
                    params: {refPoint: name, latitude: latitude, longitude: longitude}
                })
            }} />
        </View>
    </View>
  )
}
