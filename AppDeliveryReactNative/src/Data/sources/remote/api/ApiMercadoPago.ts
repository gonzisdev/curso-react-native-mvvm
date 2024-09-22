import axios from "axios"

export const ApiMercadoPago = axios.create({
    baseURL: "https://api.mercadopago.com/v1",
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer TEST-4332423066954571-102200-779dd861dfaa9f6acb7609a1887ee3f3-191014229'
    }
})