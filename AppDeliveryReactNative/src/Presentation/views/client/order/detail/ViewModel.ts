import { useState } from "react"
import { Order } from "../../../../../Domain/entities/Order"

const ClientOrderDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0.0)

    const getTotal = () => {
        order.products.forEach(p => {
            setTotal(total + (p.price * p.quantity!))
        })
    }

  return {
    total,
    getTotal,
  }
}

export default ClientOrderDetailViewModel
