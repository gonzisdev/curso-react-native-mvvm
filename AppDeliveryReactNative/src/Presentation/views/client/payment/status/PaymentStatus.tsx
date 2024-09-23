import { View, Text, Image } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { RoundedButton } from '../../../../components/RoundedButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import styles from './Styles'

type ClientPaymentStatusScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientPaymentStatusScreen'>

export const ClientPaymentStatusScreen = ({ navigation, route }: ClientPaymentStatusScreenProps) => {

    const { paymentData } = route.params;
    console.log('Payment data: ' + JSON.stringify(paymentData, null, 3));
    
    return (
        <View style={styles.container}>
            {
                paymentData.status === 'approved' 
                ? <Image
                    style={styles.image}
                    source={require('../../../../../../assets/checked.png')}
                />
                : 
                <Image
                    style={styles.image}
                    source={require('../../../../../../assets/cancelar.png')}
                />
            }
            {
                paymentData.status === 'approved' 
                ? <Text style={ styles.description }>Tu orden fue procesada exitosamente usando {paymentData.payment_method_id} ****{paymentData.card.last_four_digits}</Text>
                : <Text style={ styles.description }>La transaccion fallo</Text>
            }
            {
                paymentData.status === 'approved' &&
                <Text style={ styles.info }>Mira el estado de tu compra la seccion de MIS PEDIDOS</Text>
            }
            
            <View style={styles.button}>
                <RoundedButton text='FINALIZAR COMPRA' onPress={() => navigation.replace('ClientCategoryListScreen')}/>
            </View>
        </View>
    )
}
