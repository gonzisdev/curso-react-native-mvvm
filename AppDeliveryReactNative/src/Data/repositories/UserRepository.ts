import { AxiosError } from "axios"
import { User } from "../../Domain/entities/User"
import { UserRepository } from "../../Domain/repositories/UserRepository"
import * as ImagePicker from "expo-image-picker"
import mime from "mime"
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery"
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery"

export class UserRepositoryImpl implements UserRepository{

    async getDeliveryMen(): Promise<User[]> {
        try {
            const response = await ApiDelivery.get<{data: User[]}>('/users/findDeliveryMen')
            return Promise.resolve(response.data.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }

    async update(user: User): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateWithoutImage', user)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }

    async updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData()
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            } as any)
            data.append('user', JSON.stringify(user))
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/users/update', data)
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }

    async updateNotificationToken(id: User["id"], token: User["notification_token"]): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateNotifcationToken', {
                id: id,
                token: token
            })
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError)
            console.log(JSON.stringify(e.response?.data))
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }
}