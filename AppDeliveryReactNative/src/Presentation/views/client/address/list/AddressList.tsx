import { useEffect } from "react"
import { View, FlatList, ToastAndroid } from "react-native"
import { AddressListItem } from "./Item"
import useViewModel from "./ViewModel"
import { RoundedButton } from "../../../../components/RoundedButton"

export const ClientAddressListScreen = () => {

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
          <RoundedButton text="CONTINUAR" onPress={() => createOrder()} />
        </View>
    </View>
  )
}
