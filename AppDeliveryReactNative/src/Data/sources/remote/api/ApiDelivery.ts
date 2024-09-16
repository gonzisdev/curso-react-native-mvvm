import axios, { AxiosHeaders } from "axios"
import { LocalStorage } from "../../local/LocalStorage"
import { User } from "../../../../Domain/entities/User"

export const ApiDelivery = axios.create({
    baseURL: 'http://10.0.2.2:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const ApiDeliveryForImage = axios.create({
    baseURL: 'http://10.0.2.2:4000/api',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    }
})

ApiDelivery.interceptors.request.use(
    async (config) => {
        const data = await LocalStorage().getItem('user')
        if (data) {
            const user: User = JSON.parse(data as any)
            //config.headers!['Authorization'] = user?.session_token!
            //(config.headers as AxiosHeaders).set('Authorization', `${user?.session_token!}`)
            config.headers.set('Authorization', `${user?.session_token!}`)
        }
        return config
    }
)

ApiDeliveryForImage.interceptors.request.use(
    async (config) => {
        const data = await LocalStorage().getItem('user')
        if (data) {
            const user: User = JSON.parse(data as any)
            //config.headers!['Authorization'] = user?.session_token!
            //(config.headers as AxiosHeaders).set('Authorization', `${user?.session_token!}`)
            config.headers.set('Authorization', `${user?.session_token!}`)
        }
        return config
    }
)