import { NativeStackScreenProps} from "@react-navigation/native-stack"
import { Dimensions, View, Image, Text, TouchableOpacity } from "react-native"
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator"
import Carousel from "react-native-reanimated-carousel"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { RoundedButton } from "../../../../components/RoundedButton"

type ClientProductDetailScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientProductDetailScreen'>

export const ClientProductDetailScreen = ({navigation, route}: ClientProductDetailScreenProps) => {

    const { product } = route.params

    const { productImageList, addItem, removeItem, quantity, price } = useViewModel(product)

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

  return (
    <View style={styles.container}>
        <GestureHandlerRootView>
            <Carousel
                loop={false}
                width={width}
                height={height}
                autoPlay={true}
                data={productImageList}
                autoPlayInterval={10000}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => <Image source={{uri: item}} style={styles.productImage} />}
            />
      </GestureHandlerRootView>
      <View style={styles.productDetail}>
        <View style={styles.productInfo}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.divider}></View>

            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.descriptionContent}>{product.description}</Text>
            <View style={styles.divider}></View>

            <Text style={styles.descriptionTitle}>Precio</Text>
            <Text style={styles.descriptionContent}>{product.price}€</Text>
            <View style={styles.divider}></View>

            <Text style={styles.descriptionTitle}>Tu orden</Text>
            <Text style={styles.descriptionContent}>Cantidad: {quantity}</Text>
            <Text style={styles.descriptionContent}>Precio total: {price}€</Text>
            <View style={styles.divider}></View>
        </View>
        <View style={styles.productActions}>
            <TouchableOpacity style={styles.actionLess} onPress={removeItem}>
                <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantity}>
                <Text style={styles.actionText}>{quantity}</Text>
            </View>
            <TouchableOpacity style={styles.actionAdd} onPress={addItem}>
                <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>
            <View style={styles.buttonAdd}>
                <RoundedButton text="AÑADIR" onPress={() => {}} />
            </View>
        </View>
      </View>
      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
            <Image 
                source={require('../../../../../../assets/back.png')}
                style={styles.backImage}
            />
        </TouchableOpacity>
    </View>
  )
}
