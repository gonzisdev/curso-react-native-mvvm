import { RemoveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/RemoveUserLocal"
import { useUserLocal } from "../../../hooks/useUserLocal"

const ProfileInfoViewModel = () => {

  const { user } = useUserLocal()

  const removeSession = async () => {
    await RemoveUserLocalUseCase()
  }

  return {
    removeSession,
    user
  }
}

export default ProfileInfoViewModel