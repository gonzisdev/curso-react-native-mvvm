import { createContext, useState } from 'react'
import { Order } from '../../Domain/entities/Order'
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery'
import { GetByStatusOrderUseCase } from '../../Domain/useCases/order/GetByStatusOrder'
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCases/order/UpdateToDispatchedOrder'

export type OrderContextProps = {
    ordersPaid: Order[]
    ordersDispatched: Order[]
    ordersOnTheWay: Order[]
    ordersDelivery: Order[]
    getOrderByStatus(status: Order['status']): Promise<void>
    updateToDispatched(order: Order): Promise<ResponseApiDelivery>
}

export type OrderProviderProps = {
    children: React.ReactNode
}

export const OrderContext = createContext<OrderContextProps>(null!)

export const OrderProvider= ({children}: OrderProviderProps) => {

    const [ordersPaid, setOrdersPaid] = useState<Order[]>([])
    const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([])
    const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([])
    const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([])

    const getOrderByStatus = async (status: Order['status']) => {
        const result = await GetByStatusOrderUseCase(status)
        if (status === 'PAGADO') {
            setOrdersPaid(result)
        } else if (status === 'DESPACHADO') {
            setOrdersDispatched(result)
        } else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result)
        } else if (status === 'ENTREGADO') {
            setOrdersDelivery(result)
        } 
    }

    const updateToDispatched = async (order: Order) => {
        const result = await UpdateToDispatchedOrderUseCase(order)
        getOrderByStatus('PAGADO')
        getOrderByStatus('DESPACHADO')
        return result
    }

  return (
    <OrderContext.Provider
        value={{
            ordersPaid,
            ordersDispatched,
            ordersOnTheWay,
            ordersDelivery,
            getOrderByStatus,
            updateToDispatched
        }}
    >
        {children}
    </OrderContext.Provider>
  )
}
