import { useEffect } from "react"
import { View, Text, FlatList, Image } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator"
import { OrderDetailItem } from "./Item"
import { DateFormatter } from "../../../../utils/DateFormatter"
import { RoundedButton } from "../../../../components/RoundedButton"
import useViewModel from "./ViewModel"
import styles from "./Styles"

type ClientOrderDetailScreenProps = NativeStackScreenProps<ClientOrderStackParamList, 'ClientOrderDetailScreen'>

export const ClientOrderDetailScreen = ({navigation, route}: ClientOrderDetailScreenProps) => {

  const { order } = route.params
  const { total, getTotal } = useViewModel(order)

  useEffect(() => {
    if (total == 0.0) {
        getTotal()
    }
  }, [])

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
          <View style={styles.infoRow}>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>REPARTIDOR ASIGNADO</Text>
              <Text style={styles.infoDescription}>{order.delivery?.name} {order.delivery?.lastname}</Text>
            </View>
            <Image 
              style={styles.infoImage}
              source={require('../../../../../../assets/my_user.png')}
            />
          </View>
          <View style={styles.totalInfo}>
            <Text style={styles.total}>Total: {total}€</Text>
            <View style={styles.button}>
              {order.status === "EN CAMINO" && <RoundedButton text="RASTREAR PEDIDO" onPress={() => navigation.navigate('ClientOrderMapScreen', {order: order})} />}
            </View>
          </View>
        </View>
    </View>
  )
}
