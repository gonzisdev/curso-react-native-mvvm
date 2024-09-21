import { StyleSheet } from "react-native"

const DeliveryOrderMapStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    imageLocation: {
        height: 65,
        width: 65,
        justifyContent: "center",
        position: "absolute"
    },
    info: {
        backgroundColor: "white",
        height: "38%",
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        alignItems: "center"
    },
    infoRow: {
        flexDirection: "row",
        marginTop: 30
    },
    infoText: {
        flex: 1
    },
    infoImage: {
        width: 25,
        height: 25
    },
    infoTitle: {
        color: "black"
    },
    infoDescription: {
        color: "gray",
        fontSize: 13,
        marginTop: 3
    },
    buttonRefPoint: {
        width: "100%",
        marginTop: 15
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#e2e2e2",
        marginTop: 15
    },
    infoClient: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    imageClient: {
        height: 50,
        width: 50,
        borderRadius: 15
    },
    nameClient: {
        fontWeight: "bold",
        fontSize: 17,
        flex: 1,
        marginLeft: 15
    },
    imagePhone: {
        height: 35,
        width: 35
    }
})

export default DeliveryOrderMapStyles