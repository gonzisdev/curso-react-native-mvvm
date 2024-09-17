import * as ImagePicker from "expo-image-picker"
import { Product } from "../../Domain/entities/Product"
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct"
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { createContext } from "react"

export type ProductContextProps = {
    create(product: Product,  files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>
}

export type ProductProviderProps = {
    children: React.ReactNode
}

export const ProductContext = createContext<ProductContextProps>(null!)

export const ProductProvider = ({children}: ProductProviderProps) => {


    const create = async (product: Product,  files: ImagePicker.ImagePickerAsset[]) => {
        const response = await CreateProductUseCase(product, files)
        return response
    }


    return (
        <ProductContext.Provider
            value={{
                create
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}