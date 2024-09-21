import { Address } from "./Address"
import { Product } from "./Product"
import { User } from "./User"

export type Order = {
    id?: string
    id_client: User['id']
    id_delivery?: User['id']
    id_address: Address['id']
    status?: string
    lat?: number
    lng?: number
    timestamp?: number
    client?: User
    delivery?: User
    address?: Address
    products: Product[]
}