import { createContext, useEffect, useState } from 'react'
import { Order } from '../../Domain/entities/Order'
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery'
import { GetByStatusOrderUseCase } from '../../Domain/useCases/order/GetByStatusOrder'
import { GetByDeliveryAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByDelivertAndStatusOrder'
import { GetByClientAndStatusOrderUseCase } from '../../Domain/useCases/order/GetByClientAndStatusOrder'
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCases/order/UpdateToDispatchedOrder'
import { UpdateToOnTheWayOrderUseCase } from '../../Domain/useCases/order/UpdateToOnTheWayOrder'
import { UpdateToDeliveredOrderUseCase } from '../../Domain/useCases/order/UpdateToDeliveredOrder'

export type OrderContextProps = {
    ordersPaid: Order[]
    ordersDispatched: Order[]
    ordersOnTheWay: Order[]
    ordersDelivery: Order[]
    getOrderByStatus(status: Order['status']): Promise<void>
    getOrderByDeliveryAndStatus(id_delivery: Order['id_delivery'], status: Order['status']): Promise<void>
    getOrderByClientAndStatus(id_client: Order['id_client'], status: Order['status']): Promise<void>
    updateToDispatched(order: Order): Promise<ResponseApiDelivery>
    updateToOnTheWay(order: Order): Promise<ResponseApiDelivery>
    updateToDelivered(order: Order): Promise<ResponseApiDelivery>
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

    useEffect(() => {
        setOrdersPaid([])
        setOrdersDispatched([])
        setOrdersOnTheWay([])
        setOrdersDelivery([])
    }, [])

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

    const getOrderByDeliveryAndStatus = async (id_delivery: Order['id_delivery'], status: Order['status']) => {
        const result = await GetByDeliveryAndStatusOrderUseCase(id_delivery, status)
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

    const getOrderByClientAndStatus = async (id_client: Order['id_client'], status: Order['status']) => {
        const result = await GetByClientAndStatusOrderUseCase(id_client, status)
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

    const updateToOnTheWay = async (order: Order) => {
        const result = await UpdateToOnTheWayOrderUseCase(order)
        getOrderByDeliveryAndStatus(order.id_delivery, 'DESPACHADO')
        getOrderByDeliveryAndStatus(order.id_delivery, 'EN CAMINO')
        return result
    }

    const updateToDelivered = async (order: Order) => {
        const result = await UpdateToDeliveredOrderUseCase(order)
        getOrderByDeliveryAndStatus(order.id_delivery, 'EN CAMINO')
        getOrderByDeliveryAndStatus(order.id_delivery, 'ENTREGADO')
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
            getOrderByDeliveryAndStatus,
            getOrderByClientAndStatus,
            updateToDispatched,
            updateToOnTheWay,
            updateToDelivered
        }}
    >
        {children}
    </OrderContext.Provider>
  )
}
