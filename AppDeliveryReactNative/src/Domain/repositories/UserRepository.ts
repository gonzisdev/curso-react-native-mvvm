import * as ImagePicker from "expo-image-picker"
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { User } from "../entities/User"

export type UserRepository = {
    getDeliveryMen(): Promise<User[]>
    update(user: User): Promise<ResponseApiDelivery>
    updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>
}