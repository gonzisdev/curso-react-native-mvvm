import { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { CreateCategoryUseCase } from "../../../../../Domain/useCases/category/CreateCategory"

const AdminCategoryCreateViewModel = () => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState({
        name: "",
        description: "",
        image: ""
    })
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const CreateCategory = async () => {
        const response = await CreateCategoryUseCase(values, file!)
        if (response.success) {
            setResponseMessage(response.message)
        }
    }

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

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        loading,
        responseMessage,
        CreateCategory
    }
}

export default AdminCategoryCreateViewModel
