import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Order } from "../../Domain/entities/Order"
import { OrderProvider } from "../context/OrderContext"
import { ClientOrderListScreen } from "../views/client/order/list/OrderList"
import { ClientOrderDetailScreen } from "../views/client/order/detail/OrderDetail"
import { ClientOrderMapScreen } from "../views/client/order/map/OrderMap"

export type ClientOrderStackParamList = {
    ClientOrderListScreen: undefined
    ClientOrderDetailScreen: {order: Order}
    ClientOrderMapScreen: {order: Order}
}

export const ClientOrderStackNavigator = () => {

    const Stack = createNativeStackNavigator<ClientOrderStackParamList>()

  return (
    <OrderState>
        <Stack.Navigator>
            <Stack.Screen 
                name="ClientOrderListScreen"
                component={ClientOrderListScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="ClientOrderDetailScreen"
                component={ClientOrderDetailScreen}
                options={{
                    headerShown: true,
                    title: "Detalle de la orden"
                }}
            />
            <Stack.Screen 
                name="ClientOrderMapScreen"
                component={ClientOrderMapScreen}
                options={{
                    headerShown: false
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