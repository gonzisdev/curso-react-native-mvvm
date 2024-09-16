import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import * as ImagePicker from "expo-image-picker"
import { Category } from "../entities/Category"

export type CategoryRepository = {
    getAll(): Promise<Category[]>
    create(category: Category,  file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>
    update(category: Category): Promise<ResponseApiDelivery>
    updateWithImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>
    remove(id: Category['id']): Promise<ResponseApiDelivery>
}