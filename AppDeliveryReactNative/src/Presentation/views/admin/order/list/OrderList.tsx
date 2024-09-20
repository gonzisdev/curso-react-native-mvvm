import { useEffect } from "react"
import { View, Text } from "react-native"
import useViewModel from "./ViewModel"

export const AdminOrderListScreen = () => {

  const { orders, getOrders } = useViewModel()

  useEffect(() => {
    getOrders('PAGADO')
  }, [])

  return (
    <View>
        <Text>
            Orderlist
        </Text>
    </View>
  )
}
