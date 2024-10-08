import { StyleSheet } from "react-native"

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
        height: "65%",
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
    },
    loading: {
        position: "absolute",
        bottom: 0,
        top: 0,
        right: 0,
        left: 0
    }
})

export default RegisterStyles