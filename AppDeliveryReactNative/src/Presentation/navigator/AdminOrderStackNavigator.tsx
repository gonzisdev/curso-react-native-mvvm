import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AdminOrderListScreen } from "../views/admin/order/list/OrderList"
import { AdminOrderDetailScreen } from "../views/admin/order/detail/OrderDetail"
import { Order } from "../../Domain/entities/Order"
import { OrderProvider } from "../context/OrderContext"

export type AdminOrderStackParamList = {
    AdminOrderListScreen: undefined
    AdminOrderDetailScreen: {order: Order}
}

export const AdminOrderStackNavigator = () => {

    const Stack = createNativeStackNavigator<AdminOrderStackParamList>()

  return (
    <OrderState>
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
    </OrderState>
  )
}

const OrderState = ({children}: any) => {
    return (
        <OrderProvider>
            {children}
        </OrderProvider>
    )
}