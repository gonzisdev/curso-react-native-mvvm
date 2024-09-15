import { View, Button, Text, Image, TouchableOpacity} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../../../App"
import useViewModel from "./ViewModel"
import styles from "./Styles"
import { RoundedButton } from "../../../components/RoundedButton"

type ProfileInfoScreenProps = NativeStackScreenProps<RootStackParamList>

export const ProfileInfoScreen = ({navigation, route}: ProfileInfoScreenProps) => {

    const { removeSession, user } = useViewModel()

  return (
    <View style={styles.container}>
        {/* <Button 
            title="Cerrar sesión"
            onPress={() => {removeSession(), navigation.navigate('HomeScreen')}}
        /> */}
        <Image 
            source={require('../../../../../assets/chef.jpg')} 
            style={styles.imageBackground}
        />
        <TouchableOpacity style={styles.logout}  onPress={() => {removeSession(), navigation.replace('HomeScreen')}}>
          <Image 
              source={require('../../../../../assets/logout.png')} 
              style={styles.logoutImage}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
            <Image 
                source={{uri: user?.image}} 
                style={styles.logoImage}
            />
        </View> 
        <View style={styles.form}> 
            <View style={styles.formInfo}>
              <Image
                source={require('../../../../../assets/user.png')}
                style={styles.formImage}
              />
              <View style={styles.formContent}>
                <Text>{user?.name} {user?.lastname}</Text>
                <Text style={styles.formTextDescription}>Nombre del usuario</Text>
              </View>
            </View>
            <View style={{...styles.formInfo, marginTop: 25}}>
              <Image
                source={require('../../../../../assets/email.png')}
                style={styles.formImage}
              />
              <View style={styles.formContent}>
                <Text>{user?.email}</Text>
                <Text style={styles.formTextDescription}>Correo electrónico</Text>
              </View>
            </View>
            <View style={{...styles.formInfo, marginTop: 25, marginBottom: 70}}>
              <Image
                source={require('../../../../../assets/phone.png')}
                style={styles.formImage}
              />
              <View style={styles.formContent}>
                <Text>{user?.phone}</Text>
                <Text style={styles.formTextDescription}>Teléfono</Text>
              </View>
            </View>
            <RoundedButton text="ACTUALIZAR INFORMACIÓN" onPress={() => {}} />
        </View>
    </View>
  )
}
