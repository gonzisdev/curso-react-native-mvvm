import React, {useEffect} from 'react'
import { View, Image, Pressable } from 'react-native'
import styles from './Styles'
import useViewModel from './ViewModel'
import CreditCard from 'react-native-credit-card-form-ui'
import DropDownPicker from 'react-native-dropdown-picker'
import { CustomTextInput } from '../../../../components/CustomTextInput'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type ClientPaymentFormScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientPaymentFormScreen'>

export const ClientPaymentFormScreen = ({ navigation, route }: ClientPaymentFormScreenProps) => {

  const { 
    creditCardRef, 
    open,
    value,
    items,
    identificationNumber,
    cardToken,
    setOpen,
    setValue,
    onChange,
    setItems,
    handleSubmit, 
    getIdentificationTypes,
  } = useViewModel();

  useEffect(() => {
    getIdentificationTypes();
  }, [])
  
  useEffect(() => {
    console.log('CARD TOKEN: ' + JSON.stringify(cardToken, null, 3));
    
    if (cardToken !== undefined && cardToken !== null) {
      navigation.navigate('ClientPaymentInstallmentsScreen', { cardToken: cardToken  })
    }
  }, [cardToken])
  

  return (
    <View style={ styles.container }>
      <View style={ styles.form }>
       
        <CreditCard 
          ref={creditCardRef} 
          background={ '#e2e2e2' } 
          textColor={ 'black' }
          labels={{
            holder: 'Titular',
            cvv: 'Codigo de seguridad',
            expiration: 'Expiracion'
          }}
          placeholders={{
            number: '0000 0000 0000 0000',
            cvv: 'xxx',
            expiration: 'MM/YYYY',
            holder: 'NOMBRE DEL TITULAR'
          }}
          placeholderTextColor={ 'gray' }
        />
      </View>

      <View style={ styles.dropdown }>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <CustomTextInput 
          placeholder='Numero de identificacion'
          keyboardType='default'
          image={ require('../../../../../../assets/document.png') }
          property='identificationNumber'
          onChangeText={ onChange }
          value={ identificationNumber }
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => handleSubmit()}>
          <Image
            style={styles.check}
            source={require('../../../../../../assets/checked.png')}
            
          />
        </Pressable>
        {/* <RoundedButton text='CONTINUAR' onPress={() => handleSubmit()}/> */}
      </View>
    </View>
  )
}
