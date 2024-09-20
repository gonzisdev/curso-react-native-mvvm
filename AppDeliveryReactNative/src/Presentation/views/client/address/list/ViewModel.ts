import { useContext, useEffect, useState } from "react"
import { GetByUserAddressUseCase } from "../../../../../Domain/useCases/address/GetByUserAddress"
import { CreateOrderUseCase } from "../../../../../Domain/useCases/order/CreateOrder"
import { Address } from "../../../../../Domain/entities/Address"
import { Order } from "../../../../../Domain/entities/Order"
import { UserContext } from "../../../../context/UserContext"
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext"

const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>()
    const { user, saveUserSession } = useContext(UserContext)
    const { shoppingBag } = useContext(ShoppingBagContext)
    const [checked, setChecked] = useState('')
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {
        getAddress()
        if (user.address !== null && user.address!== undefined) {
            changeRadioValue(user.address)
        }
    }, [user])

    const createOrder = async () => {
        const order: Order = {
            id_client: user.id!,
            id_address: user.address?.id!,
            products: shoppingBag
        }
        const result = await CreateOrderUseCase(order)
        setResponseMessage(result.message)
    }

    const changeRadioValue = (address: Address) => {
        setChecked(address.id!)
        user.address = address
        saveUserSession(user)
    }

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!)
        setAddress(result)
    }

    return {
        address,
        checked,
        changeRadioValue,
        createOrder,
        responseMessage
    }
}

export default ClientAddressListViewModel