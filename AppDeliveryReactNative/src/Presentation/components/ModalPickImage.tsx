import { Alert, View, Modal, Text, StyleSheet } from "react-native"
import { RoundedButton } from "./RoundedButton"

type ModalPickImageProps = {
    openGallery: () => void
    openCamera: () => void
    modalUseState: boolean
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>  
}

export const ModalPickImage = ({openGallery, openCamera, modalUseState, setModalUseState}: ModalPickImageProps) => {

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUseState}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalUseState(!modalUseState);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Selecciona una opción</Text>
                <View style={styles.buttonContainer}s>
                    <RoundedButton 
                        text="Galería"
                        onPress={() => {
                            openGallery()
                            setModalUseState(false)
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <RoundedButton 
                        text="Cámara"
                        onPress={() => {
                            openCamera()
                            setModalUseState(false)
                        }}
                    />
                </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: 250,
      height: 220,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingTop: 35,
      paddingLeft: 25,
      paddingRight: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    buttonContainer: {
        width: "100%",
        marginTop: 20
    }
})
  