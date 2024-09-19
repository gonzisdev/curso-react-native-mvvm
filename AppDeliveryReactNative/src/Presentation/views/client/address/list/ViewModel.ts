import { useContext, useState } from "react"
import { GetByUserAddressUseCase } from "../../../../../Domain/useCases/address/GetByUserAddress"
import { Address } from "../../../../../Domain/entities/Address"
import { UserContext } from "../../../../context/UserContext"

const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>()
    const { user } = useContext(UserContext)
    const [checked, setChecked] = useState('')

    const changeRadioValue = (idAddress: string) => {
        setChecked(idAddress)
    }

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!)
        setAddress(result)
    }

    return {
        address,
        getAddress,
        checked,
        changeRadioValue
    }
}

export default ClientAddressListViewModel