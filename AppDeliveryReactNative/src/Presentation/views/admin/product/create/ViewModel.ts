import { useContext, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { CategoryContext } from "../../../../context/CategoryContext"
import { Category } from "../../../../../Domain/entities/Category"

const AdminProductCreateViewModel = (category: Category) => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState({
        name: "",
        description: "",
        image1: "",
        image2: "",
        image3: "",
        idCategory: category.id,
        price: ""
    })
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>()
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>()
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)
    const { create } = useContext(CategoryContext)
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }

    const createProduct = async () => {
        // setLoading(true)
        // const response = await create(values, file!)
        // setLoading(false)
        // if (response.success) {
        //     setResponseMessage(response.message)
        // }
        // resetForm()
    }

    const pickImage = async (numberImage: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })
        if (!result.canceled && result.assets && result.assets.length > 0) {
            if(numberImage == 1){
                const selectedImage = result.assets[0]
                onChange("image", selectedImage.uri)
                setFile1(selectedImage)
            }
            else if(numberImage == 2){
                const selectedImage = result.assets[0]
                onChange("image", selectedImage.uri)
                setFile2(selectedImage)
            } 
            else if(numberImage == 3){
                const selectedImage = result.assets[0]
                onChange("image", selectedImage.uri)
                setFile3(selectedImage)
            }
          }
    }

    const takePhoto = async (numberImage: number) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })
        if (!result.canceled && result.assets && result.assets.length > 0) {
            if(numberImage == 1){
                const selectedImage = result.assets[0]
                onChange("image", selectedImage.uri)
                setFile1(selectedImage)
            }
            else if(numberImage == 2){
                const selectedImage = result.assets[0]
                onChange("image", selectedImage.uri)
                setFile2(selectedImage)
            } 
            else if(numberImage == 3){
                const selectedImage = result.assets[0]
                onChange("image", selectedImage.uri)
                setFile3(selectedImage)
            }
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
        createProduct
    }
}

export default AdminProductCreateViewModel
