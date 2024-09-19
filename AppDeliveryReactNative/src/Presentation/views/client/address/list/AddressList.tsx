import { useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import useViewModel from "./ViewModel"
import { AddressListItem } from "./Item"

export const ClientAddressListScreen = () => {

  const { address, getAddress, checked, changeRadioValue } = useViewModel()

  useEffect(() => {
    getAddress()
  }, [])

  console.log(address);
  

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
        <FlatList 
          data={address}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <AddressListItem address={item} checked={checked} changeRadioValue={changeRadioValue} />}
        />
    </View>
  )
}
