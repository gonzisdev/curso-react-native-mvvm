import { UserProvider } from "../context/UserContext"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../views/home/Home"
import { ProfileUpdateScreen } from "../views/profile/update/ProfileUpdate"
import { RegisterScreen } from "../views/register/Register"
import { RolesScreen } from "../views/roles/Roles"
import { AdminTabsNavigator } from "./AdminTabsNavigator"
import { ClientTabsNavigator } from "./ClientTabsNavigator"
import { User } from "../../Domain/entities/User"


export type RootStackParamList = {
    HomeScreen: undefined
    RegisterScreen: undefined
    RolesScreen: undefined
    AdminTabsNavigator: undefined
    ClientTabsNavigator: undefined
    ProfileUpdateScreen: {user: User}
  }

export const MainStackNavigator = () => {
    
    const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <UserState>
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
    </UserState>
  )
}

const UserState = ({children}: any) => {
    return ( 
      <UserProvider>
        {children}
      </UserProvider>
    )
  }
