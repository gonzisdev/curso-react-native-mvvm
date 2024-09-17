import { Image, TouchableOpacity } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AdminOrderListScreen } from "../views/admin/order/list/OrderList"
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo"
import { AdminCategoryNavigator } from "./AdminCategoryNavigator"

export const AdminTabsNavigator = () => {

  const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="AdminCategoryNavigator" 
          component={AdminCategoryNavigator} 
          options={({route, navigation}) => (
            {
              title: "Categorías",
              tabBarLabel: "Categorías",
              headerShown: false,
              tabBarIcon: () => (
                <Image 
                  source={require('../../../assets/list.png')}
                  style={{width: 25, height: 25}}
                />
              )
            }
          )}
        />
        <Tab.Screen 
          name="AdminOrderListScreen" 
          component={AdminOrderListScreen} 
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