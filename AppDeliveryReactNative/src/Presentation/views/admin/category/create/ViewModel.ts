import { useContext, useState } from "react"

const AdminCategoryCreateViewModel = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const [values, setValues] = useState({
        name: "",
        description: "",
        image: ""
    })
    
    const onChange = (property: string, value: any) => {
        setValues({
            ...values,
            [property]: value
        })
    }


    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage("Introduce el nombre de la categoría")
            return false
        }
        if (values.description === '') {
            setErrorMessage("Introduce la descripción")
            return false
        }
        return true
    }

    return {
        ...values,
        onChange
    }
}

export default AdminCategoryCreateViewModel
