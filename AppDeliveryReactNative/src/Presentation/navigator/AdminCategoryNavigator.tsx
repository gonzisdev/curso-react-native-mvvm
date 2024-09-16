import { Image, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Category } from '../../Domain/entities/Category'
import { CategoryProvider } from '../context/CategoryContext'
import { AdminCategoryCreateScreen } from '../views/admin/category/create/CategoryCreate'
import { AdminCategoryUpdateScreen } from '../views/admin/category/update/CategoryUpdate'
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList'

export type CategoryStackParamList = {
    AdminCategoryListScreen: undefined
    AdminCategoryCreateScreen: undefined
    AdminCategoryUpdateScreen: {category: Category}
}

export const AdminCategoryNavigator = () => {

    const Stack = createNativeStackNavigator<CategoryStackParamList>()
    
  return (
    <CategoryState>
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerBackVisible: true
        }}>
            <Stack.Screen 
                name="AdminCategoryListScreen"
                component={AdminCategoryListScreen}
                options={({route, navigation}) => (
                    {
                      title: "Categorías",
                      headerShown: true,
                      headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('AdminCategoryCreateScreen')}>
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
                name="AdminCategoryCreateScreen"
                component={AdminCategoryCreateScreen}
                options={{
                title: "Nueva categoría",
                headerShown: true
                }}
            />
            <Stack.Screen 
                name="AdminCategoryUpdateScreen"
                component={AdminCategoryUpdateScreen}
                options={{
                title: "Editar categoría",
                headerShown: true
                }}
            />
        </Stack.Navigator>
    </CategoryState>
  )
}

const CategoryState = ({children}: any) => {
    return ( 
      <CategoryProvider>
        {children}
      </CategoryProvider>
    )
  }
