import { useEffect } from "react"
import { View, Image, Text, TouchableOpacity, ToastAndroid } from "react-native"
import { CustomTextInput } from "../../components/CustomTextInput"
import { RoundedButton } from "../../components/RoundedButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigator/MainStackNavigator"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import * as Notifications from 'expo-notifications'
import { NotificationPush } from "../../utils/NotificationPush"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

export const HomeScreen = ({navigation, route}: HomeScreenProps) => {

    const { email, password, onChange, login, errorMessage, user, updateNotificationToken } = useViewModel()
    const { notification, notificationListener, responseListener, registerForPushNotificationsAsync, setNotification } = NotificationPush()

    useEffect(() => {
        if (errorMessage !== "") {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage])

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined && user?.id !== '') {
            registerForPushNotificationsAsync().then(token => {
                console.log('TOKEN:' + token);
                updateNotificationToken(user?.id!, token!)
                if (user.roles?.length! > 1) {
                    navigation.replace('RolesScreen')
                } else {
                    navigation.replace('ClientTabsNavigator')
                }
              })
              notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification)
              })
              responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
              })
              return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current)
              }
        }
    }, [user])

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../../assets/chef.jpg')} 
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image 
                    source={require("../../../../assets/logo.png")} 
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>FOOD APP</Text>
            </View> 
            <View style={styles.form}> 
                <Text style={styles.formText}>INGRESAR</Text>
                <CustomTextInput 
                    image={require("../../../../assets/email.png")}
                    placeholder="Correo electrónico"
                    value={email}
                    keyboardType="email-address"
                    property="email"
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
                <View style={{marginTop: 30}}>
                    <RoundedButton text='ENTRAR' onPress={login} />
                </View>
                <View style={styles.formRegister}>
                    <Text>¿No tienes cuenta?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RegisterScreen")}
                    >
                        <Text style={styles.formRegisterText}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}