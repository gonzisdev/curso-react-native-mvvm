import { RemoveUserUseCase } from "../../../../Domain/useCases/userLocal/DeleteUser"

const ProfileInfoViewModel = () => {

  const removeSession = async () => {
    await RemoveUserUseCase()
  }

  return {
    removeSession
  }
}

export default ProfileInfoViewModel