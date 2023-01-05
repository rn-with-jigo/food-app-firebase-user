import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { AppAssets } from '../assets/appAssets';
import { navString } from '../constants/navStrings';
import firestore from '@react-native-firebase/firestore';
import { DB_USER } from "@env";
import orderid from "react-native-uuid"

const OrderStatusScreen = ({ navigation, route }) => {

    // console.log(status);
    const { cartitems, status, username, useremail, usercontact, total, address, userid } = route?.params


    useEffect(() => {
        if (status === "success") {
            orderPlace()
        }
    }, [])

    async function orderPlace() {

        let getUserdata = await firestore().collection(DB_USER).doc(userid).get();
        console.log(getUserdata._data?.orders.length);

        // return;
        if (getUserdata._data?.orders.length > 0) {
            let exisiting_orders = getUserdata._data?.orders;

            exisiting_orders.push({
                oid: orderid.v4(),
                oitems: cartitems,
                status: status,
                orderAddress: address,
                orderBy: username,
                orderEamil: useremail,
                orderContact: usercontact,
                userId: userid,
                orderTotal: total
            });

            firestore()
                .collection(DB_USER)
                .doc(userid)
                .update({
                    cart: [],
                    orders: exisiting_orders,
                })

        } else {
            let temp_orders = []

            temp_orders.push({
                oid: orderid.v4(),
                oitems: cartitems,
                status: status,
                orderAddress: address,
                orderBy: username,
                orderEamil: useremail,
                orderContact: usercontact,
                userId: userid,
                orderTotal: total
            })

            // console.log(temp_orders);
            firestore()
                .collection(DB_USER)
                .doc(userid)
                .update({
                    cart: [],
                    orders: temp_orders,
                })
        }
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