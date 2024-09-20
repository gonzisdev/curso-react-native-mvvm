import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AdminOrderListScreen } from "../views/admin/order/list/OrderList"
import { AdminOrderDetailScreen } from "../views/admin/order/detail/OrderDetail"
import { Order } from "../../Domain/entities/Order"

export type AdminOrderStackParamList = {
    AdminOrderListScreen: undefined
    AdminOrderDetailScreen: {order: Order}
}

export const AdminOrderStackNavigator = () => {

    const Stack = createNativeStackNavigator<AdminOrderStackParamList>()

  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="AdminOrderListScreen"
            component={AdminOrderListScreen}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name="AdminOrderDetailScreen"
            component={AdminOrderDetailScreen}
            options={{
                headerShown: true,
                title: "Detalle de la orden"
            }}
        />
    </Stack.Navigator>
  )
}
