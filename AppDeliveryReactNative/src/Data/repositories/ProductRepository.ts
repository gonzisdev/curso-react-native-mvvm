import { Product } from "../../Domain/entities/Product"
import { ProductRepository } from "../../Domain/repositories/ProductRepository"
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery"
import { AxiosError } from "axios"
import { ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery"
import * as ImagePicker from "expo-image-picker"
import mime from "mime"

export class ProductRepositoryImpl implements ProductRepository{

    async create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData()
            files.forEach(file => {
                data.append('image', {
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                } as any)
            })
            data.append('product', JSON.stringify(product))
            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/products/create', data)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }
}