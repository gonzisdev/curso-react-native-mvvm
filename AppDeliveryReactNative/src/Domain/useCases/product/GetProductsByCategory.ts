import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository"
import { Category } from "../../entities/Category"

const { getProductsByCategory } = new ProductRepositoryImpl()

export const GetProductsByCategoryUseCase = async (id_category: Category['id']) => {
  return await getProductsByCategory(id_category)
}
