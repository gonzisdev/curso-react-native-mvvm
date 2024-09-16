import { useContext, useState } from "react"
import { Category } from "../../../../../Domain/entities/Category"
import { CategoryContext } from "../../../../context/CategoryContext"

const AdminCategoryListViewModel = () => {

    const [responseMessage, setResponseMessage] = useState('')
    const { categories, remove } = useContext(CategoryContext)

    const deleteCategory = async (idCategory: Category['id']) => {
      const result = await remove(idCategory)
      setResponseMessage(result.message)
    }

  return {
    categories,
    responseMessage,
    deleteCategory
  }
}

export default AdminCategoryListViewModel
