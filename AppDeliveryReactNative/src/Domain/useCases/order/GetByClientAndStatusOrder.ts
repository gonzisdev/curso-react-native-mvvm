import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository"
import { Order } from "../../entities/Order"

const { getByClientAndStatus } = new OrderRepositoryImpl()

export const GetByClientAndStatusOrderUseCase = async (id_client: Order['id_client'] ,status: Order['status']) => {
  return await getByClientAndStatus(id_client, status)
}
