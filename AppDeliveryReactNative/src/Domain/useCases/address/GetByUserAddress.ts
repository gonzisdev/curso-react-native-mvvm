import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository"
import { User } from "../../entities/User"

const { getByUser } = new AddressRepositoryImpl()

export const GetByUserAddressUseCase = async (id_user: User['id']) => {
  return await getByUser(id_user)
}
