import { useEffect, useState } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { GetDeliveryMenUserUseCase } from "../../../../../Domain/useCases/user/GetDeliveryMenUser"
import { User } from "../../../../../Domain/entities/User"

type DropDownProps = {
    label: string
    value: string
}

const AdminOrderDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0.0)
    const [deliveryMen, setDeliveryMen] = useState<User[]>([])

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState<DropDownProps[]>([])

    useEffect(() => {
        setDropDownItems()
    }, [deliveryMen])

    const dispatchOrder = () => {
        console.log(value)
        
    }

    const setDropDownItems = () => {
        let itemsDeliveryMen: DropDownProps[] = []
        deliveryMen.forEach(delivery => {
            itemsDeliveryMen.push({
                label: delivery.name + ' ' + delivery.lastname,
                value: delivery.id!
            })
        })
        setItems(itemsDeliveryMen)
    }

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
    deliveryMen,
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    dispatchOrder
  }
}

export default AdminOrderDetailViewModel
