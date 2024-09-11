import axios from "axios"

export const ApiDelivery = axios.create({
    baseURL: 'http://10.0.2.2:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})