import { useState } from "react"
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth"
import * as ImagePicker from "expo-image-picker"

const RegisterViewModel = () => {

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
        pickImage,
        takePhoto,
        errorMessage
    }
}

export default RegisterViewModel