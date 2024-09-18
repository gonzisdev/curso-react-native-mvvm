import { useContext } from "react"
import { ShoppingBagContext } from "../../../context/ShoppingBagContext"
import { Product } from "../../../../Domain/entities/Product"

const ClientShoppingBagViewModel = () => {

    const { shoppingBag, saveItem, deleteItem, total } = useContext(ShoppingBagContext)

    const addItem = async (product: Product) => {
        product.quantity = product.quantity! + 1
        await saveItem(product)
    }

    const substractItem = async (product: Product) => {
        if (product.quantity! > 1) {
            product.quantity = product.quantity! - 1
            await saveItem(product) 
        }
    }

  return {
    shoppingBag,
    total,
    addItem,
    substractItem,
    deleteItem
  }
}

export default ClientShoppingBagViewModel