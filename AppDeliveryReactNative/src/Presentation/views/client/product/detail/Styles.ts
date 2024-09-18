import { StyleSheet } from "react-native";

const ClientProductDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    productImage: {
        width: "100%",
        height: "45%"
    },
    productDetail: {
        position: "absolute",
        width: "100%",
        height: "57%",
        bottom: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    productInfo: {
        padding: 30,
        flex: 1
    },
    divider: {
        height: 1,
        backgroundColor: "#f2f2f2",
        marginTop: 15
    },
    name: {
        fontWeight: "bold",
        fontSize: 18
    },
    descriptionTitle: {
        marginTop: 10,
        fontWeight: "bold"
    },
    descriptionContent:{
        marginTop: 5,
        fontSize: 13
    },
    productActions: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 30
    },
    actionText: {
        color: "white",
        fontSize: 15
    },
    actionLess:{
        backgroundColor: "#3a3a3a",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    quantity: {
        backgroundColor: "#3a3a3a",
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: "center",
    },
    actionAdd: {
        backgroundColor: "#3a3a3a",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    buttonAdd: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20
    },
    back: {
        position: "absolute",
        top: 30,
        left: 15
    },
    backImage: {
        height: 40,
        width: 40
    }
})

export default ClientProductDetailStyles