import { User } from "./User"

export type Address = {
    id?: string
    address: string
    neighborhood: string
    lat: number
    lng: number
    id_user: User['id']
}