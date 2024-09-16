import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Category } from "../../../../../Domain/entities/Category"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CategoryStackParamList } from "../../../../navigator/AdminCategoryNavigator"


type AdminCategoryListItemProps = {
    category: Category
    remove: (id: Category['id']) => void
}

export const AdminCategoryListItem = ({category, remove}: AdminCategoryListItemProps) => {

    const navigation = useNavigation<NativeStackNavigationProp<CategoryStackParamList>>()

  return (
    <TouchableOpacity>
        <View style={styles.container}>
            <Image 
                source={{uri: category.image}}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{category.name}</Text>
                <Text style={styles.description}>{category.description}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AdminCategoryUpdateScreen', {category: category})}
                >
                    <Image 
                        style={styles.actionImage}
                        source={require('../../../../../../assets/edit.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => remove(category.id!)}
                >
                    <Image 
                        style={styles.actionImage}
                        source={require('../../../../../../assets/trash.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.divider}></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 70,
        marginHorizontal: 20,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    info: {
        marginLeft: 15,
        flex: 1
    },
    title: {
        color: "black",
        fontSize: 15
    },
    description: {
        color: "gray",
        fontSize: 12,
        marginTop: 3
    },
    actionContainer: {
        marginRight: 40
    },
    actionImage: {
        width: 25,
        height: 25,
        marginVertical: 2
    },
    divider: {
        height: 1,
        backgroundColor: "#f2f2f2",
        marginHorizontal: 30,
        flex: 1
    }
})