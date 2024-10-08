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
        height: "70%",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        position: "absolute",
        bottom: 0
    },
    buttonContainer: {
        //position: "absolute",
        // bottom: 20,
        // left: 20,
        // right: 20,
        marginTop: 80
    },
    categoryInfo: {
        //flexDirection: "row",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    imageCategory: {
        width: 50,
        height: 50
    },
    textCategory: {
        //marginLeft: 10,
        color: "gray",
        fontSize: 17,
        fontWeight: "bold"
    }
})

export default AdminProductCreateStyles