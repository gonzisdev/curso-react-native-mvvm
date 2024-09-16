import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import * as ImagePicker from "expo-image-picker"
import { Category } from "../entities/Category"

export type CategoryRepository = {
    getAll(): Promise<Category[]>
    create(category: Category,  file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>
}