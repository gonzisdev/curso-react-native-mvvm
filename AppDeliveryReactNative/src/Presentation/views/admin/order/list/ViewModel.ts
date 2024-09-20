import { useState } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { GetByStatusOrderUseCase } from "../../../../../Domain/useCases/order/GetByStatusOrder"

const AdminOrderListViewModel = () => {

    const [orders, setOrders] = useState<Order[]>([])

    const getOrders = async (status: Order['status']) => {
        const result = await GetByStatusOrderUseCase(status)
        setOrders(result)
    }

  return  {
    orders,
    getOrders
  }
}

export default AdminOrderListViewModel
