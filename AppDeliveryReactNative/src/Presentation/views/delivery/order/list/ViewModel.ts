import { useContext, useEffect } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { OrderContext } from "../../../../context/OrderContext"
import { UserContext } from "../../../../context/UserContext"

const DeliveryOrderListViewModel = () => {

    const { ordersPaid, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrderByDeliveryAndStatus } = useContext(OrderContext)
    const { user } = useContext(UserContext)

    const getOrders = async (id_delivery: Order['id_delivery'], status: Order['status']) => {
        const result = await getOrderByDeliveryAndStatus(id_delivery, status)
    }

  return  {
    ordersPaid, 
    ordersDispatched, 
    ordersOnTheWay, 
    ordersDelivery,
    getOrders,
    user
  }
}

export default DeliveryOrderListViewModel
