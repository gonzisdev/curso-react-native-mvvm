import { useState } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { GetDeliveryMenUserUseCase } from "../../../../../Domain/useCases/user/GetDeliveryMenUser"
import { User } from "../../../../../Domain/entities/User"

const AdminOrderDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0.0)
    const [deliveryMen, setDeliveryMen] = useState<User[]>([])

    const getDeliveryMen = async () => {
        const result = await GetDeliveryMenUserUseCase()
        setDeliveryMen(result)        
    }

    const getTotal = () => {
        order.products.forEach(p => {
            setTotal(total + (p.price * p.quantity!))
        })
    }

  return {
    total,
    getTotal,
    getDeliveryMen,
    deliveryMen
  }
}

export default AdminOrderDetailViewModel
