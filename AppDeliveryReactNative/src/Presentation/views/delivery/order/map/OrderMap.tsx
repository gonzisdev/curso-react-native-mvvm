import { useEffect } from "react"
import { Image, ToastAndroid, View, Text, TouchableOpacity } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { RoundedButton } from "../../../../components/RoundedButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator"
import MapViewDirections from "react-native-maps-directions"
import useViewModel from "./ViewModel"
import stylesMap from "./StylesMap"
import styles from "./Styles"
import * as dotenv from 'dotenv'

dotenv.config();

type DeliveryOrderMapScreenProps = NativeStackScreenProps<DeliveryOrderStackParamList, 'DeliveryOrderMapScreen'>

export const DeliveryOrderMapScreen = ({navigation, route}: DeliveryOrderMapScreenProps) => {

    const { order } = route.params
    const { messagePermissions, postition, mapRef, stopForegroundUpdate, origin, destination, updateToDeliveredOrder, responseMessage } = useViewModel(order)

    useEffect(() => {
        if (messagePermissions != '') {
            ToastAndroid.show(messagePermissions, ToastAndroid.LONG)
        }
    }, [messagePermissions])

    useEffect(() => {
        if (responseMessage != '') {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            stopForegroundUpdate()
        })
        unsubscribe()
    }, [navigation])

  return (
    <View style={styles.container}>
        <MapView 
            ref={mapRef}
            customMapStyle={stylesMap}
            zoomControlEnabled={true}
            style={{height: "67%", width: "100%", position: "absolute", top: 0}}
            provider={PROVIDER_GOOGLE}
        >
            {postition !== undefined && 
                <Marker 
                    coordinate={postition}
                >
                    <Image 
                        style={styles.markerImage}
                        source={require('../../../../../../assets/delivery.png')}
                    />
                </Marker>
            }
            {order.address !== undefined && 
                <Marker 
                    coordinate={{latitude: order.address.lat, longitude: order.address.lng}}
                >
                    <Image 
                        style={styles.markerImage}
                        source={require('../../../../../../assets/home.png')}
                    />
                </Marker>
            }
            {origin.latitude !== 0.0 &&
                <MapViewDirections 
                    origin={origin}
                    destination={destination}
                    apikey={process.env.GOOGLE_MAPS_API_KEY!}
                    strokeWidth={3}
                    strokeColor="orange"
                />
            }
        </MapView>
        <View style={styles.info}>
            <View style={styles.infoRow}>
                <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Barrio</Text>
                <Text style={styles.infoDescription}>{order.address?.neighborhood}</Text>
                </View>
                <Image 
                    style={styles.infoImage}
                    source={require('../../../../../../assets/location.png')}
                />
            </View>
            <View style={styles.infoRow}>
                <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Dirección</Text>
                <Text style={styles.infoDescription}>{order.address?.address}</Text>
                </View>
                <Image 
                style={styles.infoImage}
                source={require('../../../../../../assets/location_home.png')}
                />
            </View>
            <View style={styles.divider}></View>
            <View style={styles.infoClient}>
                <Image 
                    style={styles.imageClient}
                    source={{uri: order.client?.image}}
                />
                <Text style={styles.nameClient}>{order.client?.name} {order.client?.lastname}</Text>
                <Image 
                    style={styles.imagePhone}
                    source={require('../../../../../../assets/phone.png')}
                />
            </View>
            <View style={styles.buttonRefPoint}> 
                <RoundedButton text="ENTREGAR PEDIDO" onPress={() => updateToDeliveredOrder()} />
            </View>
        </View>
        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
            <Image 
                style={styles.back}
                source={require('../../../../../../assets/back.png')}
            />
        </TouchableOpacity>
    </View>
  )
}
