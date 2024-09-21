import { Image } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo"
import { DeliveryOrderStackNavigator } from "./DeliveryOrderStackNavigator"

export const DeliveryTabsNavigator = () => {

  const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="DeliveryOrderStackNavigator" 
          component={DeliveryOrderStackNavigator} 
          options={{
            title: "Pedidos",
            tabBarLabel: "Pedidos",
            tabBarIcon: ({color}) => (
              <Image 
                source={require('../../../assets/orders.png')}
                style={{width: 25, height: 25}}
              />
            )
          }}
        />
        <Tab.Screen 
          name="ProfileInfoScreen" 
          component={ProfileInfoScreen} 
          options={{
            title: "Perfil",
            tabBarLabel: "Perfil",
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Image 
                source={require('../../../assets/user_menu.png')}
                style={{width: 25, height: 25}}
              />
            )
          }}
        />
      </Tab.Navigator>
    )
  }