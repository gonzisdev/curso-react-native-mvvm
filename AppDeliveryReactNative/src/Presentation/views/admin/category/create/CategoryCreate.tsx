import { View, TouchableOpacity, Image } from "react-native"
import styles from "./Styles"
import { CustomTextInput } from "../../../../components/CustomTextInput"
import useViewModel from "./ViewModel"
import { RoundedButton } from "../../../../components/RoundedButton"

export const AdminCategoryCreateScreen = () => {

    const { name, description, onChange } = useViewModel()

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
            <Image 
                source={require('../../../../../../assets/image_new.png')}
                style={styles.image}
            />
        </TouchableOpacity>
        <View style={styles.form}>
            <CustomTextInput 
                placeholder="Nombre de la categoría"
                image={require('../../../../../../assets/categories.png')}
                keyboardType="default"
                value={name}
                onChangeText={onChange}
                property="name"
            />
            <CustomTextInput 
                placeholder="Descripción"
                image={require('../../../../../../assets/description.png')}
                keyboardType="default"
                value={description}
                onChangeText={onChange}
                property="description"
            />
        </View>
        <View style={styles.buttonContainer}>
            <RoundedButton 
                text="CREAR CATEGORÍA"
                onPress={() => {}}
            />
        </View>
    </View>
  )
}
