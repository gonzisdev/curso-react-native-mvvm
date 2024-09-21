import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Order } from "../../../../../Domain/entities/Order"
import { DateFormatter } from "../../../../utils/DateFormatter"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator"

type OrderListItemProps = {
    order: Order
    navigation: NativeStackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen', undefined>
}

export const OrderListItem = ({order, navigation}: OrderListItemProps) => {
    
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DeliveryOrderDetailScreen', {order: order})}>
        <View style={styles.container}>
            <Text style={styles.order}>Orden #{order.id}</Text>
            <Text style={{...styles.info, marginTop: 10}}>Fecha del pedido: {DateFormatter(order.timestamp)}</Text>
            <Text style={styles.info}>Cliente: {order.client?.name} {order.client?.lastname}</Text>
            <Text style={styles.info}>Dirección: {order.address?.address}</Text>
            <Text style={styles.info}>Barrio: {order.address?.neighborhood}</Text>
            <View style={styles.divider}></View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    order: {
        fontWeight: "bold",
        color: "black",
        fontSize: 18,
        marginTop: 10
    },
    info: {
        fontSize: 13
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#e2e2e2",
        marginTop: 10
    }
})