import * as Location from "expo-location"
import { useEffect, useRef, useState } from "react"
import MapView, { Camera } from "react-native-maps"
import { Order } from "../../../../../Domain/entities/Order"
import socket from "../../../../utils/SocketIO"

const ClientOrderMapViewModel = (order: Order) => {

    const [messagePermissions, setMessagePermissions] = useState('')
    const [refPoint, setRefPoint] = useState({
        name: '',
        latitude: 0.0,
        longitude: 0.0
    })
    const [postition, setPosition] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    const [origin, setOrigin] = useState({
        latitude: order.address?.lat!,
        longitude: order.address?.lng!
    })
    const [postitionOnce, setPositionOnce] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    const mapRef = useRef<MapView | null>(null)

    useEffect(() => {
        if (postition.latitude !== 0.0 && postition.longitude !== 0.0) {
            if (postitionOnce.latitude === 0.0 && postitionOnce.longitude === 0.0) {
                setPositionOnce(postition)
            }
        }
    }, [postition])

    useEffect(() => {
        socket.connect()
        socket.on('connect', () => {
            console.log('------ SOCKET IO CONNECTION ------')
        })
        socket.on(`position/${order.id!}`, (data) => {
            setPosition({latitude: data.lat, longitude: data.lng})
        })
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) {
                startForegroundUpdate()
            }
        }
        requestPermissions()
    }, [])

    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync()
        if (!granted) {
            setMessagePermissions('Permiso de ubicación denegado')
            return
        }
        const location = await Location.getLastKnownPositionAsync()
        setOrigin({
            latitude: location?.coords.latitude!,
            longitude: location?.coords.longitude!
        })
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
    }

  return {
    messagePermissions,
    postition,
    mapRef,
    ...refPoint,
    origin,
    socket,
    postitionOnce
  }
}

export default ClientOrderMapViewModel