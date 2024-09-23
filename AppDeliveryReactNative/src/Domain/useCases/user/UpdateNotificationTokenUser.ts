import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository"
import { User } from "../../entities/User"

const { updateNotificationToken } = new UserRepositoryImpl()

export const UpdateNotificationTokenUserUseCase = async (id: User["id"], token: User["notification_token"]) => {
    return await updateNotificationToken(id, token)
}