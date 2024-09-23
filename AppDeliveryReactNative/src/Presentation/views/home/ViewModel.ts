import { useContext, useState } from "react"
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth"
import { UpdateNotificationTokenUserUseCase } from "../../../Domain/useCases/user/UpdateNotificationTokenUser"
import { UserContext } from "../../context/UserContext"
import { User } from "../../../Domain/entities/User"

const HomeViewModel = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    //const { user, getUserSession } = useUserLocal()
    const { user, saveUserSession } = useContext(UserContext)
    console.log('USUARIO DE SESION: ' + JSON.stringify(user));
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password)
            console.log("Result: " + JSON.stringify(response))      
            if (!response.success) {
                setErrorMessage(response.message)
            } else {
                saveUserSession(response.data)
            }
        }
    }

    const updateNotificationToken = async (id: User['id'], token: User['notification_token']) => {
        const result = await UpdateNotificationTokenUserUseCase(id, token)
    }

    const isValidForm = (): boolean => {
        if (values.email === '') {
            setErrorMessage("Introduce tu email")
            return false
        }
        if (values.password === '') {
            setErrorMessage("Introduce tu contraseña")
            return false
        }
        return true
    }

    return {
        ...values,
        onChange,
        login,
        errorMessage,
        user,
        updateNotificationToken
    }
}

export default HomeViewModel
