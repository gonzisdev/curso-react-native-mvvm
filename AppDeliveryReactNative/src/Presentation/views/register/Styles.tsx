import { StyleSheet } from "react-native"
import { MyColors } from "../../theme/AppTheme"

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        opacity: 0.7,
        bottom: "30%"
    },
    form: {
        width: "100%",
        height: "70%",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    }, 
    formText: {
        fontWeight: "bold",
        fontSize: 16
    },
    formRegister: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30
    },
    formRegisterText: {
        fontStyle: "italic",
        color: MyColors.primary,
        borderBottomWidth: 1,
        borderBottomColor: MyColors.primary,
        fontWeight: "bold",
        marginLeft: 10
    },
    logoContainer: {
        position: "absolute",
        alignSelf: "center",
        alignItems: "center",
        top: "5%"
    },
    logoImage: {
        width: 100,
        height: 100
    },
    logoText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
    }
})

export default RegisterStyles