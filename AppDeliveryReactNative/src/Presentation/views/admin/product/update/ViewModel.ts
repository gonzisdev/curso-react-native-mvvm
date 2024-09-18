import { useContext, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { Category } from "../../../../../Domain/entities/Category"
import { ProductContext } from "../../../../context/ProductContext"
import { Product } from "../../../../../Domain/entities/Product"
import { ResponseApiDelivery } from "../../../../../Data/sources/remote/models/ResponseApiDelivery"

const AdminProductUpdateViewModel = (product: Product, category: Category) => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState(product)
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>()
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>()
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>()
    const [loading, setLoading] = useState(false)
    const { update, updateWithImage } = useContext(ProductContext)
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
        
    }

    const updateProduct = async () => {
        let files = []
        files.push(file1!)
        files.push(file2!)
        files.push(file3!)
        setLoading(true)
        let response = {} as ResponseApiDelivery
        if (values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')) {
            response = await update(values)
        } else {
            response = await updateWithImage(values, files)
        }
        setLoading(false)
        if (response.success) {
            setResponseMessage(response.message)
        }
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
                onChange("image1", selectedImage.uri)
                setFile1(selectedImage)
            }
            else if(numberImage == 2){
                const selectedImage = result.assets[0]
                onChange("image2", selectedImage.uri)
                setFile2(selectedImage)
            } 
            else if(numberImage == 3){
                const selectedImage = result.assets[0]
                onChange("image3", selectedImage.uri)
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
                onChange("image1", selectedImage.uri)
                setFile1(selectedImage)
            }
            else if(numberImage == 2){
                const selectedImage = result.assets[0]
                onChange("image2", selectedImage.uri)
                setFile2(selectedImage)
            } 
            else if(numberImage == 3){
                const selectedImage = result.assets[0]
                onChange("image3", selectedImage.uri)
                setFile3(selectedImage)
            }
          }
    }

    return {
        ...values,
        onChange,
        takePhoto,
        pickImage,
        loading,
        responseMessage,
        updateProduct
    }
}

export default AdminProductUpdateViewModel
