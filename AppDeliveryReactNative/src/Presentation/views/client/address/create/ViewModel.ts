import { useContext, useEffect, useState } from "react"
import { CreateAddressUseCase } from "../../../../../Domain/useCases/address/CreateAddress"
import { UserContext } from "../../../../context/UserContext"

const ClientAddressCreateViewModel = () => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState({
        address: "",
        neighborhood: "",
        refPoint: "",
        lat: 0.0,
        lng: 0.0,
        id_user: ""
    })
    const [loading, setLoading] = useState(false)
    const { user, saveUserSession } = useContext(UserContext)

    useEffect(() => {
        if (user.id != '' || user.id != null) {
            onChange('id_user', user.id)
        }
    }, [user])
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const onChangeRefPoint = (refPoint: string, lat :number, lng :number) => {
        setValues({...values, refPoint, lat, lng})
    }

    const createAddress = async () => {
        setLoading(true)
        const response = await CreateAddressUseCase(values)
        setLoading(false)
        if (response.success) {
            setResponseMessage(response.message)
            resetForm()
            user.address = values
            user.address.id = response.data
            saveUserSession(user)
        }
    }

    const resetForm = () => {
        setValues({
            address: "",
            neighborhood: "",
            refPoint: "",
            lat: 0.0,
            lng: 0.0,
            id_user: user.id!
        })
    }

    return {
        ...values,
        onChange,
        onChangeRefPoint,
        loading,
        responseMessage,
        createAddress
    }
}

export default ClientAddressCreateViewModel
