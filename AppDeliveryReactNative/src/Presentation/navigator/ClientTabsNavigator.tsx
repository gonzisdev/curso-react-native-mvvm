import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList"
import { ClientOrderListScreen } from "../views/client/order/list/OrderList"
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo"

export const ClientTabsNavigator = () => {
  const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
          <Tab.Screen name="AdminCategoryListScreen" component={ClientCategoryListScreen} />
          <Tab.Screen name="AdminOrderListScreen" component={ClientOrderListScreen} />
          <Tab.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
        </Tab.Navigator>
    )
  }