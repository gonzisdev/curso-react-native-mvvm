import { User } from "../entities/User"

export type AuthRepository = {
    register(user: User): Promise<any>
}