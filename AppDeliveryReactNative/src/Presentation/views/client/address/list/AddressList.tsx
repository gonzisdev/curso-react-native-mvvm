import { useEffect } from "react"
import { View, FlatList, ToastAndroid } from "react-native"
import { AddressListItem } from "./Item"
import useViewModel from "./ViewModel"
import { RoundedButton } from "../../../../components/RoundedButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"

type ClientAddressListScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientAddressListScreen'>

export const ClientAddressListScreen = ({navigation, route}: ClientAddressListScreenProps) => {

  const { address, checked, changeRadioValue, createOrder, responseMessage } = useViewModel()  

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
  }, [responseMessage])

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
        <FlatList 
          data={address}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <AddressListItem address={item} checked={checked} changeRadioValue={changeRadioValue} />}
        />
        <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20}}>
          {/* <RoundedButton text="CONTINUAR" onPress={() => createOrder()} /> */}
          <RoundedButton text="CONTINUAR" onPress={() => navigation.navigate('ClientPaymentFormScreen')} /> 
        </View>
    </View>
  )
}
