import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/Presentation/views/home/Home"
import { RegisterScreen } from "./src/Presentation/views/register/Register"
import { RolesScreen } from "./src/Presentation/views/roles/Roles"
import { AdminTabsNavigator } from "./src/Presentation/navigator/AdminTabsNavigator"
import { ClientTabsNavigator } from "./src/Presentation/navigator/ClientTabsNavigator"
import { ProfileUpdateScreen } from "./src/Presentation/views/profile/update/ProfileUpdate"

export type RootStackParamList = {
  HomeScreen: undefined
  RegisterScreen: undefined
  RolesScreen: undefined
  AdminTabsNavigator: undefined
  ClientTabsNavigator: undefined
  ProfileUpdateScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        headerBackVisible: true
      }}>
        <Stack.Screen 
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen 
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: "Nuevo usuario",
            headerShown: true
          }}
        />
        <Stack.Screen 
          name="RolesScreen"
          component={RolesScreen}
          options={{
            title: "Selecciona un rol",
            headerShown: true
          }}
        />
        <Stack.Screen 
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
        />
        <Stack.Screen 
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
        />
        <Stack.Screen 
          name="ProfileUpdateScreen"
          component={ProfileUpdateScreen}
          options={{
            title: "Actualizar usuario",
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
