import { View, StyleSheet, Text } from "react-native"
import { Order } from "../../../../../Domain/entities/Order"
import { DateFormatter } from "../../../../utils/DateFormatter"

type OrderListItemProps = {
    order: Order
}

export const OrderListItem = ({order}: OrderListItemProps) => {
    
  return (
    <View style={styles.container}>
        <Text style={styles.order}>Order #{order.id}</Text>
        <Text style={{...styles.info, marginTop: 10}}>Fecha del pedido: {DateFormatter(order.timestamp)}</Text>
        <Text style={styles.info}>Cliente: {order.client?.name} {order.client?.lastname}</Text>
        <Text style={styles.info}>Dirección: {order.address?.address}</Text>
        <Text style={styles.info}>Barrio: {order.address?.neighborhood}</Text>
        <View style={styles.divider}></View>
    </View>
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