import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { Order } from "../entities/Order"

export type OrderRepository = {
    create(order: Order): Promise<ResponseApiDelivery>
    getByStatus(status: Order['status']): Promise<Order[]>
    getByDeliveryAndStatus(id_delivery: Order['id_delivery'], status: Order['status']): Promise<Order[]>
    getByClientAndStatus(id_client: Order['id_client'], status: Order['status']): Promise<Order[]>
    updateToDispatched(order: Order): Promise<ResponseApiDelivery>
    updateToOnTheWay(order: Order): Promise<ResponseApiDelivery>
    updateToDelivered(order: Order): Promise<ResponseApiDelivery>
}