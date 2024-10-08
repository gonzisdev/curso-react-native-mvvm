import { createContext, useEffect, useState } from "react"
import { Category } from "../../Domain/entities/Category"
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import * as ImagePicker from "expo-image-picker"
import { GetAllCategoryUseCase } from "../../Domain/useCases/category/GetAllCategory"
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory"
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategory"
import { UpdateWithImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWithImageCategory"
import { DeleteCategoryUseCase } from "../../Domain/useCases/category/DeleteCategory"

export type CategoryContextProps = {
    categories: Category[]
    getCategories(): Promise<void>
    create(category: Category,  file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>
    update(category: Category): Promise<ResponseApiDelivery>
    updateWithImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>
    remove(id: Category['id']): Promise<ResponseApiDelivery>
}

export type CategoryProviderProps = {
    children: React.ReactNode
}

export const CategoryContext = createContext<CategoryContextProps>(null!)

export const CategoryProvider = ({children}: CategoryProviderProps) => {

    const [categories, setCategories] = useState<Category[]>([])

    
    useEffect(() => {
        if (categories.length === 0) {
            getCategories()
        }
    }, [])


    const getCategories = async () => {
        const result = await GetAllCategoryUseCase()
        setCategories(result)
    }

    const create = async (category: Category,  file: ImagePicker.ImagePickerAsset) => {
        const response = await CreateCategoryUseCase(category, file!)
        getCategories()
        return response
    }

    const update = async (category: Category) => {
        const response = await UpdateCategoryUseCase(category)
        getCategories()
        return response
    }

    const updateWithImage = async (category: Category, file: ImagePicker.ImagePickerAsset) => {
        const response = await UpdateWithImageCategoryUseCase(category, file)
        getCategories()
        return response
    }

    const remove = async (id: Category['id']) => {
        const response = await DeleteCategoryUseCase(id)
        getCategories()
        return response
    }

    return (
        <CategoryContext.Provider
            value={{
                categories,
                getCategories,
                create,
                update,
                updateWithImage,
                remove
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}