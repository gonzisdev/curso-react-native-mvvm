import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { Category } from "../entities/Category"
import { Product } from "../entities/Product"
import * as ImagePicker from "expo-image-picker"

export type ProductRepository = {
    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> 
    getProductsByCategory(id_category: Category['id']): Promise<Product[]>
}