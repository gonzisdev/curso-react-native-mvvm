import { View, Text, KeyboardAvoidingView, Platform } from "react-native"
import CreditCard from "react-native-credit-card-form-ui"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { RoundedButton } from "../../../../components/RoundedButton"

export const ClientPaymentFormScreen = () => {

    const { creditCardRef, handleSubmit } = useViewModel()

  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <CreditCard 
                ref={creditCardRef} 
                background={'#e2e2e2'} 
                textColor={'black'} 
                labels={{
                    holder: "Titular",
                    cvv: "Código de seguridad",
                    expiration: "Fecha de vencimiento"

                }}
                placeholders={{
                    number: "0000 0000 0000 0000",
                    cvv: "XXX",
                    expiration: "MM/YYYY",
                    holder: "NOMBRE DEL TITULAR"
                }}
                placeholderTextColor={"gray"}
            />
        </View>
        <View style={styles.buttonContainer}> 
            <RoundedButton text="CONTINUAR" onPress={() => handleSubmit()} />
        </View>
    </View>
  )
}
