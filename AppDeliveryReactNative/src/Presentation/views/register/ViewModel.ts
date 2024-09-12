import { useState } from "react"
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth"

const RegisterViewModel = () => {

    const [errorMessage, setErrorMessage] = useState("")
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
        if (isValidForm()) {
            const response = await RegisterAuthUseCase(values)
            console.log("Result: " + JSON.stringify(response))
        }
    }

    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage("Introduce tu nombre")
            return false
        }
        if (values.lastname === '') {
            setErrorMessage("Introduce tus apellidos")
            return false
        }
        if (values.email === '') {
            setErrorMessage("Introduce tu email")
            return false
        }
        if (values.phone === '') {
            setErrorMessage("Introduce tu teléfono")
            return false
        }
        if (values.password === '') {
            setErrorMessage("Introduce tu contraseña")
            return false
        }
        if (values.confirmPassword === '') {
            setErrorMessage("Confirma tu contraseña")
            return false
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden")
            return false
        }
        return true
    }

    return {
        ...values,
        onChange,
        register,
        errorMessage
    }
}

export default RegisterViewModel