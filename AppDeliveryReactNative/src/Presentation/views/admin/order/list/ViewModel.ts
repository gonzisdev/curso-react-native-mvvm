import { useContext, useState } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { GetByStatusOrderUseCase } from "../../../../../Domain/useCases/order/GetByStatusOrder"
import { OrderContext } from "../../../../context/OrderContext"

const AdminOrderListViewModel = () => {

    //const [orders, setOrders] = useState<Order[]>([])
    const { ordersPaid, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrderByStatus } = useContext(OrderContext)

    const getOrders = async (status: Order['status']) => {
        const result = await getOrderByStatus(status)
        //setOrders(result)
    }

  return  {
    ordersPaid, 
    ordersDispatched, 
    ordersOnTheWay, 
    ordersDelivery,
    getOrders
  }
}

export default AdminOrderListViewModel
