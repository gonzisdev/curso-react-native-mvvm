import { useState } from "react"
import { Category } from "../../../../../Domain/entities/Category"
import { GetAllCategoryUseCase } from "../../../../../Domain/useCases/category/GetAllCategory"

const AdminCategoryListViewModel = () => {

    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = async () => {
        const result = await GetAllCategoryUseCase()
        setCategories(result)
    }

  return {
    categories,
    getCategories
  }
}

export default AdminCategoryListViewModel
