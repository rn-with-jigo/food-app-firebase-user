import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { AppAssets } from '../assets/appAssets';
import { navString } from '../constants/navStrings';
import firestore from '@react-native-firebase/firestore';
import { DB_USER, DB_ORDERS } from "@env";
import orderid from "react-native-uuid"

const OrderStatusScreen = ({ navigation, route }) => {

    // console.log(status);
    const { cartitems, status, username, useremail, usercontact, total, address, userid, pay_type, pay_id } = route?.params


    useEffect(() => {
        if (status === "success") {
            orderPlace()
        }
    }, [])

    async function orderPlace() {

        let getUserdata = await firestore().collection(DB_USER).doc(userid).get();
        console.log(getUserdata?._data);

        // if(getUserdata.exists())
        let temp_orders = {}
        temp_orders.oid = orderid.v4();
        temp_orders.status = status;
        temp_orders.orderStatus = "isPlaced";
        temp_orders.orderPayType = pay_type;
        temp_orders.orderPayId = pay_id;
        temp_orders.orderAddress = address;
        temp_orders.orderBy = username;
        temp_orders.orderEamil = useremail;
        temp_orders.orderContact = usercontact;
        temp_orders.userId = userid;
        temp_orders.orderTotal = total;
        temp_orders.odate = new Date().toLocaleString('en', { dateStyle: "medium", timeStyle: "short" });
        temp_orders.oitems = cartitems;


        firestore()
            .collection(DB_USER)
            .doc(userid)
            .update({
                cart: [],
            })

        firestore()
            .collection(DB_ORDERS)
            .add(temp_orders)
    

}

return (
    <ScreenWrapper>
        <View style={styles.ord_status_contianer}>
            <Image source={status === "faild" ? AppAssets.FaildGif : AppAssets.SuccessGif} style={styles.ord_status_image} />

            <Text style={{ fontWeight: "500", fontSize: 14, color: "#0081C9" }}>{status === "faild" ? "Payment is faild." : "Payment is success."}</Text>

            <TouchableOpacity style={styles.ord_status_complete_btn}
                onPress={() => {
                    navigation.navigate(navString.Homescreen);
                }}
            >
                <Text style={{ fontWeight: "600", fontSize: 16, color: "#0081C9" }}>Go Home</Text>
            </TouchableOpacity>
        </View>
    </ScreenWrapper>
)
}

export default OrderStatusScreen

const styles = StyleSheet.create({
    ord_status_complete_btn: {
        marginTop: 16,
        height: 50,
        width: "50%",
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ord_status_contianer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    ord_status_image: {
        height: "40%",
        width: "70%",
    }
})