import { useContext, useState } from "react"
import * as ImagePicker from "expo-image-picker"

const ClientAddressCreateViewModel = () => {

    const [responseMessage, setResponseMessage] = useState("")
    const [values, setValues] = useState({
        address: "",
        neighborhood: "",
        refPoint: ""
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
        // setLoading(true)
        // const response = await create(values, file!)
        // setLoading(false)
        // if (response.success) {
        //     setResponseMessage(response.message)
        // }
        // resetForm()
    }

    const resetForm = () => {
        // setValues({
        //     name: "",
        //     description: "",
        //     image: ""
        // })
    }

    return {
        ...values,
        onChange,
        loading,
        responseMessage,
    }
}

export default ClientAddressCreateViewModel
