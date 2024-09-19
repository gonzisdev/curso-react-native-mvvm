import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { Address } from "../entities/Address"
import { User } from "../entities/User"

export type AddressRepository = {
    create(address: Address): Promise<ResponseApiDelivery>
    getByUser(id_user: User['id']): Promise<Address[]>
}