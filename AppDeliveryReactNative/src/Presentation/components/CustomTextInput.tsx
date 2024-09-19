import { View, Image, TextInput, StyleSheet, KeyboardType } from "react-native"

type CustomTextInputProps = {
    image: any
    placeholder: string
    value: any
    keyboardType: KeyboardType
    secureTextEntry?: boolean
    property: string
    editable?: boolean 
    onChangeText: (property: string, value: any) => void
}

export const CustomTextInput = ({image, placeholder, value, keyboardType, secureTextEntry = false, property, editable = true, onChangeText}: CustomTextInputProps) => {
  return (
    <View style={styles.formInput}>
        <Image
            source={image}
            style={styles.formIcon}
        />
        <TextInput 
            style={styles.formTextInput}
            placeholder={placeholder}
            keyboardType={keyboardType}
            editable={editable}
            value={value}
            onChangeText={(text) => onChangeText(property, text)}
            secureTextEntry={secureTextEntry}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    formInput: {
        flexDirection: "row",
        marginTop: 30
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#aaaaaa",
        marginLeft: 15
    }
})
