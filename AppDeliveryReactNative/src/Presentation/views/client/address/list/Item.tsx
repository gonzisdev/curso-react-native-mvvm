import { StyleSheet, View, Text } from "react-native"
import { Address } from "../../../../../Domain/entities/Address"
import { RadioButton } from "react-native-paper"

type AddressListItemProps = {
    address: Address
    checked: string
    changeRadioValue: (address: Address) => void
}

export const AddressListItem = ({address, checked, changeRadioValue}: AddressListItemProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.info}>
            <RadioButton 
                value={address.id!}
                status={checked == address.id ? 'checked' : 'unchecked'}
                onPress={() => changeRadioValue(address)}
            />

            <View style={styles.infoAddress}>
                <Text style={styles.address}>{address.address}</Text>
                <Text style={styles.neighborhood}>{address.neighborhood}</Text>
            </View>

            <View style={styles.divider}></View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10
    },
    info: {
        flexDirection: "row"
    },
    divider: {
        width: "80%",
        height: 1,
        backgroundColor: "#e8e8e8",
        marginTop: 10
    },
    infoAddress: {
        marginLeft: 5
    },
    address: {
        fontWeight: "bold",
        fontSize: 13
    },
    neighborhood: {
        fontSize: 12
    }
})