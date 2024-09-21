import { useEffect } from "react"
import { View, Text, FlatList, Image, ToastAndroid } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AdminOrderStackParamList } from "../../../../navigator/AdminOrderStackNavigator"
import { OrderDetailItem } from "./Item"
import { DateFormatter } from "../../../../utils/DateFormatter"
import { RoundedButton } from "../../../../components/RoundedButton"
import DropDownPicker from 'react-native-dropdown-picker'
import useViewModel from "./ViewModel"
import styles from "./Styles"

type AdminOrderDetailScreenProps = NativeStackScreenProps<AdminOrderStackParamList, 'AdminOrderDetailScreen'>

export const AdminOrderDetailScreen = ({navigation, route}: AdminOrderDetailScreenProps) => {

  const { order } = route.params
  const { total, getTotal, getDeliveryMen, deliveryMen, open, value, items, setOpen, setValue, setItems, dispatchOrder, responseMessage } = useViewModel(order)

  useEffect(() => {
    if (total == 0.0) {
        getTotal()
    }
    getDeliveryMen()
  }, [])

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
  }, [responseMessage])

  return (
    <View style={styles.container}>
        <View style={styles.products}>
          <FlatList 
            data={order.products}
            keyExtractor={(item) => item.id!}
            renderItem={({item}) => <OrderDetailItem product={item} />}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Fecha del pedido</Text>
              <Text style={styles.infoDescription}>{DateFormatter(order.timestamp)}</Text>
            </View>
            <Image 
              style={styles.infoImage}
              source={require('../../../../../../assets/reloj.png')}
            />
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Cliente y teléfono</Text>
              <Text style={styles.infoDescription}>{order.client?.name} {order.client?.lastname} - {order.client?.phone}</Text>
            </View>
            <Image 
              style={styles.infoImage}
              source={require('../../../../../../assets/user.png')}
            />
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Dirección de entrega</Text>
              <Text style={styles.infoDescription}>{order.address?.address} - {order.address?.neighborhood}</Text>
            </View>
            <Image 
              style={styles.infoImage}
              source={require('../../../../../../assets/location.png')}
            />
          </View>
          {
            order.status === "PAGADO" ? (
              <>
                <Text style={styles.deliveries}>REPARTIDORES DISPONIBLES</Text>
                <View style={styles.dropdown}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                </View>
              </>
            ) : <Text style={styles.deliveries}>REPARTIDORES ASIGNADO: {order.delivery?.name} {order.delivery?.lastname}</Text>
          }
          <View style={styles.totalInfo}>
            <Text style={styles.total}>Total: {total}€</Text>
            <View style={styles.button}>
              {order.status === "PAGADO" && <RoundedButton text="DESPACHAR ORDEN" onPress={() => dispatchOrder()} />}
            </View>
          </View>
        </View>
    </View>
  )
}
