import { useEffect, useState } from "react"
import { View, useWindowDimensions, FlatList } from "react-native"
import { TabBar, TabView } from "react-native-tab-view"
import { Order } from "../../../../../Domain/entities/Order"
import { OrderListItem } from "./Item"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator"
import useViewModel from "./ViewModel"

type OrderListViewProps = {
  status: Order['status']
}

const OrderListView = ({status}: OrderListViewProps) => {

  const { ordersPaid, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrders } = useViewModel()
  const navigation = useNavigation<NativeStackNavigationProp<AdminOrderStackParamList, "AdminOrderListScreen", undefined>>()

  useEffect(() => {
    getOrders(status?.toString())
  }, [])

  return (
    <View>
        <FlatList 
          data={
            status === 'PAGADO' 
            ? ordersPaid 
            : status === 'DESPACHADO'
            ? ordersDispatched 
            : status === 'EN CAMINO'
            ? ordersOnTheWay 
            : status === 'ENTREGADO'
            ? ordersDelivery 
            : []
          }
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => <OrderListItem order={item} navigation={navigation} />}
        />
    </View>
  )
}

const renderScene = ({route}: any) => {
  switch (route.key) {
    case 'first':
      return <OrderListView status={'PAGADO'} />
    case 'second':
      return <OrderListView status={'DESPACHADO'} />
    case 'third':
      return <OrderListView status={'EN CAMINO'} />
    case 'fourth':
      return <OrderListView status={'ENTREGADO'} />
    default:
      return <OrderListView status={'PAGADO'} />
  }
}

export const AdminOrderListScreen = () => {

  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'PAGADO' },
    { key: 'second', title: 'DESPACHADO' },
    { key: 'third', title: 'EN CAMINO' },
    { key: 'fourth', title: 'ENTREGADO' }
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#e2e2e2'}}
          activeColor="black"
          inactiveColor="gray"
          scrollEnabled={true}
          style={{paddingTop: 10, backgroundColor: 'white', height: 60, alignItems: "center", justifyContent: "center"}}
        />
      )}
    />
  )
}