import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList"
import { ClientProductListScreen } from "../views/client/product/list/ProductList"
import { Category } from "../../Domain/entities/Category"

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined
    ClientProductListScreen: {id_category: Category['id']}
}

export const ClientStackNavigator = () => {

    const Stack = createNativeStackNavigator<ClientStackParamList>()
    
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackVisible: true
        }}>
            <Stack.Screen 
                name="ClientCategoryListScreen"
                component={ClientCategoryListScreen}
                options={{
                    title: "Categorías",
                    headerShown: true
                }}
            />
            <Stack.Screen 
                name="ClientProductListScreen"
                component={ClientProductListScreen}
                options={{
                    title: "Productos",
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    )
}
