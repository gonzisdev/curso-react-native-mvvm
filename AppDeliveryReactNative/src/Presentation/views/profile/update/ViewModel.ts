import { useContext, useState } from "react"
import { UpdateUserUseCase } from "../../../../Domain/useCases/user/UpdateUser"
import { UpdateWithImageUserUseCase } from "../../../../Domain/useCases/user/UpdateWithImageUser"
import * as ImagePicker from "expo-image-picker"
import { User } from "../../../../Domain/entities/User"
import { ResponseApiDelivery } from "../../../../Data/sources/remote/models/ResponseApiDelivery"
import { UserContext } from "../../../context/UserContext"

const ProfileUpdateViewModel = (user: User) => {

    const [errorMessage, setErrorMessage] = useState("")
    const [values, setValues] = useState(user)
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)

    const { saveUserSession } = useContext(UserContext)

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

    const update = async () => {
        if (isValidForm()) {
            setLoading(true)
            let response = {} as ResponseApiDelivery
            if (values.image?.includes('https://')) {
                response = await UpdateUserUseCase(values)
            } else {
                response = await UpdateWithImageUserUseCase(values, file!)
            }
            setLoading(false)
            console.log("Result: " + JSON.stringify(response))
            if (!response.success) {
                setErrorMessage(response.message)
            } else {
                saveUserSession(response.data)
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
        if (values.phone === '') {
            setErrorMessage("Introduce tu teléfono")
            return false
        }
        return true
    }

    return {
        ...values,
        onChange,
        update,
        pickImage,
        takePhoto,
        errorMessage,
        loading
    }
}

export default ProfileUpdateViewModel