import * as Location from "expo-location"
import { useEffect, useRef, useState } from "react"
import MapView, { Camera } from "react-native-maps"

const DeliveryOrderMapViewModel = () => {

    const [messagePermissions, setMessagePermissions] = useState('')
    const [refPoint, setRefPoint] = useState({
        name: '',
        latitude: 0.0,
        longitude: 0.0
    })
    const [postition, setPosition] = useState<Location.LocationObjectCoords>()
    const mapRef = useRef<MapView | null>(null)
    let positionSubscription: Location.LocationSubscription

    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) {
                startForegroundUpdate()
            }
        }
        requestPermissions()
    }, [])

    const onRegionChangeComplete = async (latitude: number, longitude: number) => {
        try {
            const place = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude
            })
            let city
            let street
            let streetNumber
            place.find(p => {
                city = p.city
                street= p.street
                streetNumber= p.streetNumber
                setRefPoint({
                    name: `${street}, ${streetNumber}, ${city}`,
                    latitude: latitude,
                    longitude: longitude
                })
            })
        } catch (error) {
            console.log('ERROR: '+ error)
        }
    }

    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync()
        if (!granted) {
            setMessagePermissions('Permiso de ubicación denegado')
            return
        }
        const location = await Location.getLastKnownPositionAsync()
        setPosition(location?.coords)
        const newCamera: Camera = {
            center: {
                latitude: location?.coords.latitude!,
                longitude: location?.coords.longitude!
            },
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 0
        }
        mapRef.current?.animateCamera(newCamera, {duration: 2000})
        positionSubscription.remove()
        positionSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation
            },
            location => {
                setPosition(location?.coords)
            }
        )
    }

    const stopForegroundUpdate = () => {
        positionSubscription.remove()
        setPosition(undefined)
    }

  return {
    messagePermissions,
    postition,
    mapRef,
    onRegionChangeComplete,
    ...refPoint,
    stopForegroundUpdate
  }
}

export default DeliveryOrderMapViewModel