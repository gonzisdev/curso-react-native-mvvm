import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList"
import { ClientProductListScreen } from "../views/client/product/list/ProductList"
import { Category } from "../../Domain/entities/Category"
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail"
import { Product } from "../../Domain/entities/Product"
import { ShoppingBagProvider } from "../context/ShoppingBagContext"

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined
    ClientProductListScreen: {id_category: Category['id']}
    ClientProductDetailScreen: {product: Product}
}

export const ClientStackNavigator = () => {

    const Stack = createNativeStackNavigator<ClientStackParamList>()
    
    return (
        <ShoppingBagState>
            <Stack.Navigator>
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
                <Stack.Screen 
                    name="ClientProductDetailScreen"
                    component={ClientProductDetailScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </ShoppingBagState>
    )
}

const ShoppingBagState = ({children}: any) => {
    return (
        <ShoppingBagProvider>
            {children}
        </ShoppingBagProvider>
    )
}