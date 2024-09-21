import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository"
import { Order } from "../../entities/Order"

const { getByDeliveryAndStatus } = new OrderRepositoryImpl()

export const GetByDeliveryAndStatusOrderUseCase = async (id_delivery: Order['id_delivery'] ,status: Order['status']) => {
  return await getByDeliveryAndStatus(id_delivery, status)
}
