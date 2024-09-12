import { User } from "../entities/User"

export type UserLocalRepository = {
    save(user: User): Promise<void>
    getUser(): Promise<User>
    remove(): Promise<void>
}