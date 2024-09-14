import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/Presentation/views/home/Home"
import { RegisterScreen } from "./src/Presentation/views/register/Register"
import { ProfileInfoScreen } from "./src/Presentation/views/profile/info/ProfileInfo"
import { RolesScreen } from "./src/Presentation/views/roles/Roles"

export type RootStackParamList = {
  HomeScreen: undefined
  RegisterScreen: undefined
  ProfileInfoScreen: undefined
  RolesScreen: undefined
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
          name="ProfileInfoScreen"
          component={ProfileInfoScreen}
          options={{
            title: "Perfil de usuario"
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
