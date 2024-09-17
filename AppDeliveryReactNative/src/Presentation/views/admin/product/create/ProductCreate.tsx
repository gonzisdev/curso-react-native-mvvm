import { useEffect, useState } from "react"
import { View, TouchableOpacity, Image, ActivityIndicator, ToastAndroid, Text } from "react-native"
import { CustomTextInput } from "../../../../components/CustomTextInput"
import { RoundedButton } from "../../../../components/RoundedButton"
import { ModalPickImage } from "../../../../components/ModalPickImage"
import { MyColors, MyStyles } from "../../../../theme/AppTheme"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"

type AdminProductCreateScreenProps = NativeStackScreenProps<ProductStackParamList, 'AdminProductCreateScreen'>

export const AdminProductCreateScreen = ({navigation, route}: AdminProductCreateScreenProps) => {

    const { name, description, onChange, takePhoto, pickImage, loading, responseMessage, image1, image2, image3, price, CreateCategory } = useViewModel()
    const [modalVisible, setModalVisible] = useState(false)
    const { category } = route.params

    useEffect(() => {
        if (responseMessage !== "") {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)}
            >
                {
                    image1 == ''
                    ? 
                        <Image
                            source={require('../../../../../../assets/image_new.png')}
                            style={styles.image}
                        />
                    :
                        <Image
                            source={{uri: image1}}
                            style={styles.image}
                        />
                }
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)}
            >
                {
                    image2 == ''
                    ? 
                        <Image
                            source={require('../../../../../../assets/image_new.png')}
                            style={styles.image}
                        />
                    :
                        <Image
                            source={{uri: image2}}
                            style={styles.image}
                        />
                }
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)}
            >
                {
                    image3 == ''
                    ? 
                        <Image
                            source={require('../../../../../../assets/image_new.png')}
                            style={styles.image}
                        />
                    :
                        <Image
                            source={{uri: image3}}
                            style={styles.image}
                        />
                }
            </TouchableOpacity>
        </View>
        <View style={styles.form}>
            <CustomTextInput 
                placeholder="Nombre del producto"
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
            <CustomTextInput 
                placeholder="Precio"
                image={require('../../../../../../assets/price.png')}
                keyboardType="default"
                value={price}
                onChangeText={onChange}
                property="price"
            />
            <View style={styles.categoryInfo}>
                <Image 
                    style={styles.imageCategory}
                    source={require('../../../../../../assets/categories.png')}
                />
                <Text style={styles.textCategory}>Categoría: </Text>
                <Text>{category.name}</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <RoundedButton 
                text="CREAR PRODUCTO"
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
