import * as ImagePicker from "expo-image-picker"
import { Product } from "../../Domain/entities/Product"
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct"
import { GetProductsByCategoryUseCase } from "../../Domain/useCases/product/GetProductsByCategory"
import { DeleteProductUseCase } from "../../Domain/useCases/product/DeleteProduct"
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { createContext, useState } from "react"
import { Category } from "../../Domain/entities/Category"

export type ProductContextProps = {
    products: Product[]
    getProducts(id_category: Category['id']): Promise<void>
    create(product: Product,  files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>
    remove(product: Product): Promise<ResponseApiDelivery>
}

export type ProductProviderProps = {
    children: React.ReactNode
}

export const ProductContext = createContext<ProductContextProps>(null!)

export const ProductProvider = ({children}: ProductProviderProps) => {


    const [products, setProducts] = useState<Product[]>([])

    const getProducts = async (id_category: Category['id']) => {
        const result = await GetProductsByCategoryUseCase(id_category)
        setProducts(result)
    }

    const create = async (product: Product,  files: ImagePicker.ImagePickerAsset[]) => {
        const response = await CreateProductUseCase(product, files)
        getProducts(product.id_category!)
        return response
    }

    const remove = async (product: Product) => {
        const response = await DeleteProductUseCase(product)
        getProducts(product.id_category!)
        return response
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                getProducts,
                create,
                remove
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}