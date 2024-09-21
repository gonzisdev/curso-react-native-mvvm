import { AxiosError } from "axios";
import { Order } from "../../Domain/entities/Order";
import { OrderRepository } from "../../Domain/repositories/OrderRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";

export class OrderRepositoryImpl implements OrderRepository {
    
    async create(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/orders/create', order)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }

    async getByStatus(status: Order["status"]): Promise<Order[]> {
        try {
            const response = await ApiDelivery.get<{data: Order[]}>(`/orders/findByStatus/${status}`)
            return Promise.resolve(response.data.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }

    async getByDeliveryAndStatus(id_delivery: Order["id_delivery"], status: Order["status"]): Promise<Order[]> {
        try {
            const response = await ApiDelivery.get<{data: Order[]}>(`/orders/findByDeliveryAndStatus/${id_delivery}/${status}`)
            return Promise.resolve(response.data.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }

    async updateToDispatched(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToDispatched', order)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }
}