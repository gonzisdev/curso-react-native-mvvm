import { useContext } from "react"
import { ShoppingBagContext } from "../../../context/ShoppingBagContext"

const ClientShoppingBagViewModel = () => {

    const { shoppingBag, saveItem, deleteItem } = useContext(ShoppingBagContext)

  return {
    shoppingBag
  }
}

export default ClientShoppingBagViewModel