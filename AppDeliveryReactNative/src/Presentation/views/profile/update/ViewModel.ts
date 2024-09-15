import { useState } from "react"
import { RegisterWithImageAuthUseCase } from "../../../../Domain/useCases/auth/RegisterWithImageAuth"
import { SaveUserLocalUseCase } from "../../../../Domain/useCases/userLocal/SaveUserLocal"
import { useUserLocal } from "../../../hooks/useUserLocal"
import * as ImagePicker from "expo-image-picker"

const ProfileUpdateViewModel = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        image: "",
        password: "",
        confirmPassword: ""
    })
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)

    const { user, getUserSession } = useUserLocal()
    console.log('USUARIO DE SESION: ' + JSON.stringify(user));

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0]
            onChange("image", selectedImage.uri)
            setFile(selectedImage)
          }
    }

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0]
            onChange("image", selectedImage.uri)
            setFile(selectedImage)
          }
    }

    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const onChangeInfoUpdate = (name: string, lastname: string, phone: string) => {
        setValues({
            ...values,
            name,
            lastname,
            phone
        })
    }


    const register = async () => {
        if (isValidForm()) {
            setLoading(true)
            //const response = await RegisterAuthUseCase(values)
            const response = await RegisterWithImageAuthUseCase(values, file!)
            setLoading(false)
            console.log("Result: " + JSON.stringify(response))
            if (!response.success) {
                setErrorMessage(response.message)
            } else {
                await SaveUserLocalUseCase(response.data)
                getUserSession()
            }
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
        if (values.image === '') {
            setErrorMessage("Selecciona una imagen")
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
        pickImage,
        takePhoto,
        errorMessage,
        user,
        loading,
        onChangeInfoUpdate
    }
}

export default ProfileUpdateViewModel