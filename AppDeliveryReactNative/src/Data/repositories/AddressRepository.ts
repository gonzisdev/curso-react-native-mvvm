import { AxiosError } from "axios";
import { Address } from "../../Domain/entities/Address";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { User } from "../../Domain/entities/User";

export class AddressRepositoryImpl implements AddressRepository {

    async create(address: Address): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/address/create', address)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }

    async getByUser(id_user: User["id"]): Promise<Address[]> {
        try {
            const response = await ApiDelivery.get<{data: Address[]}>(`/address/findByUser/${id_user}`)
            return Promise.resolve(response.data.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }
}