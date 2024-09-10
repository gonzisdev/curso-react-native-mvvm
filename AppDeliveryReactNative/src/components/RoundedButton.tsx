import { StyleSheet, TouchableOpacity, Text } from "react-native"

type RoundeButtonProps = {
    text: string
}

export const RoundedButton = ({text}: RoundeButtonProps) => {
  return (
    <TouchableOpacity
        onPress={() => {}}
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
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    textButton: {
        color: "black",
        fontWeight: "bold"
    }
})