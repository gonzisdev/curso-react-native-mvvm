import { useState } from "react"
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery"

const RegisterViewModel = () => {

    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const register = async () => {
        try {
            const response = await ApiDelivery.post('/users/create', values)
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    return {
        ...values,
        onChange,
        register
    }
}

export default RegisterViewModel