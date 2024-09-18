import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList"

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined
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
        </Stack.Navigator>
    )
}
