import { useEffect } from "react"
import { ToastAndroid, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import useViewModel from "./ViewModel"
import styles from "./Styles"

export const ClientAddressMapScreen = () => {

    const { messagePermissions, postition, mapRef } = useViewModel()

    useEffect(() => {
        if (messagePermissions != '') {
            ToastAndroid.show(messagePermissions, ToastAndroid.LONG)
        }
    }, [messagePermissions])

  return (
    <View style={styles.container}>
        <MapView 
            ref={mapRef}
            style={{height: "100%", width: "100%"}}
            provider={PROVIDER_GOOGLE}
        />
    </View>
  )
}
