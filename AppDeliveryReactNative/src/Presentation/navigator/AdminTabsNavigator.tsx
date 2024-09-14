import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AdminCategoryListScreen } from "../views/admin/category/list/CategoryList"
import { AdminOrderListScreen } from "../views/admin/order/list/OrderList"
import { ProfileInfoScreen } from "../views/profile/info/ProfileInfo"

export const AdminTabsNavigator = () => {
  const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
          <Tab.Screen name="AdminCategoryListScreen" component={AdminCategoryListScreen} />
          <Tab.Screen name="AdminOrderListScreen" component={AdminOrderListScreen} />
          <Tab.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
        </Tab.Navigator>
    )
  }