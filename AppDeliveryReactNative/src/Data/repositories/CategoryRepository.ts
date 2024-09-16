import { AxiosError } from "axios"
import { Category } from "../../Domain/entities/Category"
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository"
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery"
import * as ImagePicker from "expo-image-picker"
import mime from "mime"
import {  ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery"

export class CategoryRepositoryImpl implements CategoryRepository {
    
    async create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData()
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            } as any)
            data.append('category', JSON.stringify(category))
            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/categories/create', data)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }
}