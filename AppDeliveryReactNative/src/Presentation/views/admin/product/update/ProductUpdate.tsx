import { useEffect, useState } from "react"
import { View, TouchableOpacity, Image, ActivityIndicator, ToastAndroid, Text, ScrollView } from "react-native"
import { CustomTextInput } from "../../../../components/CustomTextInput"
import { RoundedButton } from "../../../../components/RoundedButton"
import { MyColors, MyStyles } from "../../../../theme/AppTheme"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"
import { ModalPickMultipleImage } from "../../../../components/ModalPickMultipleImage"

type AdminProductUpdateScreenProps = NativeStackScreenProps<ProductStackParamList, 'AdminProductUpdateScreen'>

export const AdminProductUpdateScreen = ({navigation, route}: AdminProductUpdateScreenProps) => {

    const { category, product } = route.params
    const { name, description, onChange, takePhoto, pickImage, loading, responseMessage, image1, image2, image3, price, createProduct } = useViewModel(product, category)
    const [modalVisible, setModalVisible] = useState(false)
    const [numberImage, setNumberImage] = useState(1)

    useEffect(() => {
        if (responseMessage !== "") {
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <TouchableOpacity 
                onPress={() => {
                    setNumberImage(1)
                    setModalVisible(true)
                }}
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
                onPress={() => {
                    setNumberImage(2)
                    setModalVisible(true)
                }}
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
                onPress={() => {
                    setNumberImage(3)
                    setModalVisible(true)
                }}
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
            <ScrollView>
                <View style={styles.categoryInfo}>
                    <Image 
                        style={styles.imageCategory}
                        source={require('../../../../../../assets/menu.png')}
                    />
                    <Text style={styles.textCategory}>Categoría seleccionada</Text>
                    <Text>{category.name}</Text>
                </View>
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
                    keyboardType="numeric"
                    value={price}
                    onChangeText={onChange}
                    property="price"
                />
                <View style={styles.buttonContainer}>
                    <RoundedButton 
                        text="CREAR PRODUCTO"
                        onPress={createProduct}
                    />
                </View>
            </ScrollView>
        </View>
        <ModalPickMultipleImage
                openGallery={pickImage}
                openCamera={takePhoto}
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
                numberImage={numberImage}
            />
        {loading && <ActivityIndicator size="large" color={MyColors.primary} style={MyStyles.loading} /> }
    </View>
  )
}
