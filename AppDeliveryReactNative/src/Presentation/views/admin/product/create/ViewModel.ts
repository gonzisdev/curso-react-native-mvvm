import { useContext, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { CategoryContext } from "../../../../context/CategoryContext"

const AdminProductCreateViewModel = () => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState({
        name: "",
        description: "",
        image1: "",
        image2: "",
        image3: "",
        idCategory: "",
        price: ""
    })
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)
    const { create } = useContext(CategoryContext)
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const CreateCategory = async () => {
        // setLoading(true)
        // const response = await create(values, file!)
        // setLoading(false)
        // if (response.success) {
        //     setResponseMessage(response.message)
        // }
        // resetForm()
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
            image1: "",
            image2: "",
            image3: "",
            idCategory: "",
            price: ""
        })
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

export default AdminProductCreateViewModel
