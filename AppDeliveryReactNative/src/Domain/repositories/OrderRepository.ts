import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { Order } from "../entities/Order"

export type OrderRepository = {
    create(order: Order): Promise<ResponseApiDelivery>
}