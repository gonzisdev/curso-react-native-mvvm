import { Category } from "./Category"

export type Product = {
    id?: string
    name: string
    description: string
    image1: string
    image2: string
    image3: string
    price: number
    id_category: Category['id']
}