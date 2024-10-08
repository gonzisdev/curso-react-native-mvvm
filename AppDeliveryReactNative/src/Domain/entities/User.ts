import { Address } from "./Address"
import { Rol } from "./Rol"

export type User = {
    id?: string
    name: string
    lastname: string
    email: string
    phone: string
    image?: string
    password: string
    confirmPassword: string
    session_token?: string
    notification_token?: string
    roles?: Rol[]
    address?: Address
}