import { useContext, useEffect, useState } from "react"
import { Order } from "../../../../../Domain/entities/Order"
import { User } from "../../../../../Domain/entities/User"
import { GetDeliveryMenUserUseCase } from "../../../../../Domain/useCases/user/GetDeliveryMenUser"
import { OrderContext } from "../../../../context/OrderContext"

type DropDownProps = {
    label: string
    value: string
}

const AdminOrderDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0.0)
    const [deliveryMen, setDeliveryMen] = useState<User[]>([])
    const [responseMessage, setResponseMessage] = useState('')

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState<DropDownProps[]>([])

    const { updateToDispatched } = useContext(OrderContext)

    useEffect(() => {
        setDropDownItems()
    }, [deliveryMen])

    const dispatchOrder = async () => {
        if (value !== null) {
            order.id_delivery = value!
            const result = await updateToDispatched(order)
            setResponseMessage(result.message)
        } else {
            setResponseMessage('Selecciona el repartidor')
        }
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
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    dispatchOrder,
    responseMessage
  }
}

export default AdminOrderDetailViewModel
