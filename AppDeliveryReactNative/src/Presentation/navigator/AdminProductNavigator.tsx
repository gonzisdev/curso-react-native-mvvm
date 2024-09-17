import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { Category } from "../../Domain/entities/Category"
import { AdminProductListScreen } from "../views/admin/product/list/ProductList"
import { CategoryStackParamList } from "./AdminCategoryNavigator"
import { AdminProductCreateScreen } from "../views/admin/product/create/ProductCreate"
import { TouchableOpacity, Image } from "react-native"
import { ProductProvider } from "../context/ProductContext"

export type ProductStackParamList = {
    AdminProductListScreen: {category: Category}
    AdminProductCreateScreen: {category: Category}
}

type AdminProductNavigatorProps = NativeStackScreenProps<CategoryStackParamList, 'AdminProductNavigator'>

const Stack = createNativeStackNavigator<ProductStackParamList>()

export const AdminProductNavigator = ({navigation, route}: AdminProductNavigatorProps) => {
  return (
    <ProductState>
      <Stack.Navigator
          screenOptions={{
              headerShown: false
          }}
      >
          <Stack.Screen 
              name="AdminProductListScreen"
              component={AdminProductListScreen}
              initialParams={{category: route.params.category}}
              options={({route, navigation}) => (
                  {
                    title: "Productos",
                    headerShown: true,
                    headerRight: () => (
                      <TouchableOpacity onPress={() => navigation.navigate('AdminProductCreateScreen')}>
                        <Image 
                          source={require('../../../assets/add.png')}
                          style={{width: 35, height: 35, marginRight: 15}}
                        />
                      </TouchableOpacity>
                    )
                  }
                )}
          />
          <Stack.Screen 
              name="AdminProductCreateScreen"
              component={AdminProductCreateScreen}
              initialParams={{category: route.params.category}}
              options={{
                  title: "Nuevo producto",
                  headerShown: true
              }}
          />
      </Stack.Navigator>
    </ProductState>
  )
}

const ProductState = ({children}: any) => {
  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  )
}