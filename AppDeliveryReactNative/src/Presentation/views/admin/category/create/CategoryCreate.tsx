import { useEffect, useState } from "react"
import { View, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from "react-native"
import { CustomTextInput } from "../../../../components/CustomTextInput"
import { RoundedButton } from "../../../../components/RoundedButton"
import { ModalPickImage } from "../../../../components/ModalPickImage"
import { MyColors, MyStyles } from "../../../../theme/AppTheme"
import useViewModel from "./ViewModel"
import styles from "./Styles"

export const AdminCategoryCreateScreen = () => {

    const { name, description, onChange, takePhoto, pickImage, loading, responseMessage, image, CreateCategory } = useViewModel()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (responseMessage !== "") {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.imageContainer}
            onPress={() => setModalVisible(true)}
        >
             {
                image == ''
                ? 
                    <Image
                        source={require('../../../../../../assets/image_new.png')}
                        style={styles.image}
                    />
                :
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
            }
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
                onPress={CreateCategory}
            />
        </View>
        <ModalPickImage 
                openGallery={pickImage}
                openCamera={takePhoto}
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
            />
        {loading && <ActivityIndicator size="large" color={MyColors.primary} style={MyStyles.loading} /> }
    </View>
  )
}
