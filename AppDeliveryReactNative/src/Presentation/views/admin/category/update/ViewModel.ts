import { useContext, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { ResponseApiDelivery } from "../../../../../Data/sources/remote/models/ResponseApiDelivery"
import { Category } from "../../../../../Domain/entities/Category"
import { CategoryContext } from "../../../../context/CategoryContext"

const AdminCategoryUpdateViewModel = (category: Category) => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState(category)
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)
    const { update, updateWithImage } = useContext(CategoryContext)
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const updateCategory = async () => {
        setLoading(true)
        let response = {} as ResponseApiDelivery
        if (values.image?.includes('https://')) {
            response = await update(values)
        } else {
            response = await updateWithImage(values, file!)
        }
        setLoading(false)
        if (response.success) {
            setResponseMessage(response.message)
        }
        resetForm()
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

    const resetForm = () => {
        setValues({
            name: "",
            description: "",
            image: ""
        })
    }

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        loading,
        responseMessage,
        updateCategory
    }
}

export default AdminCategoryUpdateViewModel
