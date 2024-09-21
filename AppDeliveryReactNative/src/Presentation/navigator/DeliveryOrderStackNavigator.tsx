import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Order } from "../../Domain/entities/Order"
import { OrderProvider } from "../context/OrderContext"
import { DeliveryOrderListScreen } from "../views/delivery/order/list/OrderList"
import { DeliveryOrderDetailScreen } from "../views/delivery/order/detail/OrderDetail"

export type DeliveryOrderStackParamList = {
    DeliveryOrderListScreen: undefined
    DeliveryOrderDetailScreen: {order: Order}
}

export const DeliveryOrderStackNavigator = () => {

    const Stack = createNativeStackNavigator<DeliveryOrderStackParamList>()

  return (
    <OrderState>
        <Stack.Navigator>
            <Stack.Screen 
                name="DeliveryOrderListScreen"
                component={DeliveryOrderListScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="DeliveryOrderDetailScreen"
                component={DeliveryOrderDetailScreen}
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