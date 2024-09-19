import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { Address } from "../entities/Address"

export type AddressRepository = {
    create(address: Address): Promise<ResponseApiDelivery>
}