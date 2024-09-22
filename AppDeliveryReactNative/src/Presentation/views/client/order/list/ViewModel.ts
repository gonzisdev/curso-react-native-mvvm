import { useContext } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { OrderContext } from "../../../../context/OrderContext"
import { UserContext } from "../../../../context/UserContext"

const ClientOrderListViewModel = () => {

    const { ordersPaid, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrderByClientAndStatus } = useContext(OrderContext)
    const { user } = useContext(UserContext)

    const getOrders = async (id_client: Order['id_client'], status: Order['status']) => {
        const result = await getOrderByClientAndStatus(id_client, status)
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

export default ClientOrderListViewModel
