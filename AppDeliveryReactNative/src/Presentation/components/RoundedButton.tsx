import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { MyColors } from "../theme/AppTheme"

type RoundeButtonProps = {
    text: string
    onPress: () => void
}

export const RoundedButton = ({text, onPress}: RoundeButtonProps) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.roundedButton}
    >
        <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: "100%",
        height: 50,
        backgroundColor: MyColors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    textButton: {
        color: "white",
        fontWeight: "bold"
    }
})