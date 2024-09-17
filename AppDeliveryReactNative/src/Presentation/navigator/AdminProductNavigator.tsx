import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { Category } from "../../Domain/entities/Category"
import { AdminProductListScreen } from "../views/admin/product/list/ProductList"
import { CategoryStackParamList } from "./AdminCategoryNavigator"

export type ProductStackParamList = {
    AdminProductListScreen: {category: Category}
}

type AdminProductNavigatorProps = NativeStackScreenProps<CategoryStackParamList, 'AdminProductNavigator'>

const Stack = createNativeStackNavigator<ProductStackParamList>()

export const AdminProductNavigator = ({navigation, route}: AdminProductNavigatorProps) => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen 
            name="AdminProductListScreen"
            component={AdminProductListScreen}
            initialParams={{category: route.params.category}}
        />
    </Stack.Navigator>
  )
}
