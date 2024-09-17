import { StyleSheet } from "react-native"

const AdminProductCreateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    image: {
        width: 110,
        height: 110,
        resizeMode: "contain"
    },
    form: {
        backgroundColor: "white",
        height: "65%",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        position: "absolute",
        bottom: 0
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
    categoryInfo: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    imageCategory: {
        width: 30,
        height: 30
    },
    textCategory: {
        marginLeft: 10
    }
})

export default AdminProductCreateStyles