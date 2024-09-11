import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { User } from "../entities/User"

export type AuthRepository = {
    register(user: User): Promise<ResponseApiDelivery>
}