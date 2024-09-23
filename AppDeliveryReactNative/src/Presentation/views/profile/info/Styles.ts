import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        opacity: 0.7,
        bottom: "30%"
    },
    form: {
        width: "100%",
        height: "45%",
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
    formInfo: {
        flexDirection: "row",
        alignItems: "center"
    },
    formContent:{
        marginLeft: 15
    },
    formImage: {
      height: 30,
      width: 30 
    },
    formTextDescription:{
        fontSize: 12,
        color: "gray"
    },
    logoContainer: {
        position: "absolute",
        alignSelf: "center",
        top: "14%"
    },
    logoImage: {
        width: 180,
        height: 180,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 100
    },
    logoText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
    },
    logout: {
        position: "absolute",
        top: 30,
        right: 15
    },
    logoutImage: {
        width: 40,
        height: 40,
    },
    change: {
        position: "absolute",
        top: 80,
        right: 15
    }
})

export default styles