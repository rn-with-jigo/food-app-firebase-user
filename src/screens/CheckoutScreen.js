import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { navString } from '../constants/navStrings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storageKeys } from '../constants/storageKeys'
import firestore from '@react-native-firebase/firestore';
import { DB_USER } from "@env";
import { useIsFocused } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay'
import CustomToast from '../components/CustomToast'
import uuid from "react-native-uuid"
import RaduiosComponent from '../components/RaduiosComponent'

const CheckoutScreen = ({ navigation, route }) => {

    const [checkout_cart_list, setCheckoutCartList] = useState([])
    const [checkout_user_add, setCheckoutUserAdd] = useState(null);
    const [payment_type_index, setPaymentTypeIndex] = useState(null)

    const isFocused = useIsFocused();

    const payment_options = [
        {
            id: "#pay001",
            option: "Online",
        },
        {
            id: "#pay002",
            option: "COD",
        },
    ]

    const { total_amount, uid } = route.params;
    useEffect(() => {
        const { cData } = route?.params;
        // console.log(cData);
        if (cData.length > 0) {
            setCheckoutCartList(cData)
        }
    }, [])

    useEffect(() => {
        getUserAddress()
    }, [isFocused])

    const renderCheckoutItems = ({ item, index }) => {
        return (
            <View style={styles.checkout_item_single_container}>
                <Image source={{ uri: item.data.imgeurl }} style={styles.checkout_item_image} />

                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={styles.checkout_item_datails}>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.checkout_item_name_style} numberOfLines={2} >{item.data.name}</Text>
                        </View>
                        <View style={styles.checkout_item_price_contianer}>
                            <Text style={styles.checkout_item_price_text_style}>Rs.{item.data.price}</Text>
                            <Text style={styles.checkout_item_discount_price_style}>{item.data.discountprice}</Text>
                        </View>

                    </View>
                    <View style={{ width: "35%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", color: "gray", fontSize: 20, }}>Qty : {item.data.qty}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function doPayement() {
        var option = {
            discription: "his is sample",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYhwF7RdHkWa_PN8051l5b29f2Nfro9NtDWOX5tNRz&s",
            currency: "INR",
            key: "rzp_test_ceftYto5cm5II0",
            amount: total_amount.toString().concat("00"),
            name: "jigo goyani",
            order_id: "",
            profile: {
                name: "jigo goyani",
                email: "jigogoyanipc@gmail.com",
                contact: "917621827682"
            },
            theme: {
                color: "#0081C9",
            }
        };

        RazorpayCheckout.open(option)
            .then(async data => {
                console.log("data after complete razorpat \n", data);
                // alert(data.razorpay_payment_id);
                let user_name = await AsyncStorage.getItem(storageKeys.userName);
                let user_contact = await AsyncStorage.getItem(storageKeys.userContact);
                let user_email = await AsyncStorage.getItem(storageKeys.storeUserEmail);
                navigation.push(navString.Loadder)
                setTimeout(() => {
                    navigation.pop(1);
                    // CustomToast("Your payment is done: \n payment id:"+ uuid.v4());
                    console.log(checkout_user_add.house_name + "," +
                        checkout_user_add.house_number + "," + checkout_user_add.street + "," + checkout_user_add.address);
                    navigation.push(navString.OrderStatusScreen, {
                        status: "success",
                        pay_type: payment_options[payment_type_index].option,
                        pay_id: data.razorpay_payment_id,
                        username: user_name,
                        cartitems: checkout_cart_list,
                        useremail: user_email,
                        usercontact: user_contact,
                        total: total_amount,
                        address: checkout_user_add.house_name + "," +
                            checkout_user_add.house_number + "," + checkout_user_add.street + "," + checkout_user_add.address,
                        userid: uid,
                    })
                }, 5000);

            })
            .catch(err => {
                console.log("error while doing payment :", err);
            })
    }

    async function getUserAddress() {
        await AsyncStorage.getItem(storageKeys.userAddres, (err, res) => {
            if (res != null) {
                if (uid != null) {
                    firestore()
                        .collection(DB_USER)
                        .doc(uid)
                        .get()
                        .then(addresses => {
                            // console.log("called");
                            addresses._data.address.map((ele) => {
                                // console.log(ele);
                                if (ele.aid == res) {
                                    console.log(ele);
                                    setCheckoutUserAdd(ele)
                                }
                            })
                        })
                } else {
                    console.log("not found add");
                }
            }
        })
    }

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, }}>
                <View style={{ height: "40%" }}>
                    <FlatList
                        data={checkout_cart_list}
                        renderItem={renderCheckoutItems}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ padding: 15 }}
                        // ListEmptyComponent={renderEmptyComponent}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={{ height: 15, }} />
                            )
                        }}
                    />
                </View>

                <View style={styles.hr_line} />

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, marginHorizontal: 20, }}>
                    <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>Total Amount:</Text>
                    <Text style={{ fontWeight: "bold", color: "#5F8D4E", fontSize: 20 }}>Rs. {total_amount ? total_amount : "0"}</Text>
                </View>

                <View style={[styles.hr_line, { marginTop: 10, }]} />

                <View style={{ paddingHorizontal: 20, }}>
                    <View style={styles.checkout_add_container}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>Add Address</Text>
                            {checkout_user_add ?
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.push(navString.AddressScreen)
                                    }}
                                >
                                    <Text style={styles.checkout_change_add_btn_text}>Change Address</Text>
                                </TouchableOpacity>
                                : null}
                        </View>

                        {checkout_user_add ?
                            <View style={{ marginTop: 10, }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>{checkout_user_add.name}</Text>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 12 }}>{checkout_user_add.house_number}, {checkout_user_add?.house_name} , {checkout_user_add.street}, {checkout_user_add.address}</Text>
                            </View>
                            :

                            <TouchableOpacity style={styles.checkout_add_add_btn_container}
                                onPress={() => {
                                    navigation.push(navString.AddressScreen)
                                }}
                            >
                                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 16 }}>Add Address</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                <Text style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#000",
                    marginTop: 16,
                    paddingHorizontal: 20,
                }}>Payment Option:</Text>
                <RaduiosComponent
                    radioList={payment_options}
                    selectedIndex={payment_type_index}
                    setSelectedIndex={setPaymentTypeIndex}
                />

            </View>
            {checkout_user_add ?
                <TouchableOpacity style={styles.checkout_payment_btn_container}
                    onPress={async () => {
                        let user_name = await AsyncStorage.getItem(storageKeys.userName);
                        let user_contact = await AsyncStorage.getItem(storageKeys.userContact);
                        let user_email = await AsyncStorage.getItem(storageKeys.storeUserEmail);
                        console.log("user_name: ", user_name, "\nuser_contact: ", user_contact, "\nuser_email: ", user_email);
                        if (payment_options[payment_type_index].option == "COD") {
                            console.log("it's COD");
                            navigation.push(navString.Loadder)
                            setTimeout(() => {
                                navigation.pop(1);
                                // CustomToast("Your payment is done: \n payment id:"+ uuid.v4());
                                console.log(checkout_user_add.house_name + "," +
                                checkout_user_add.house_number + "," + checkout_user_add.street + ","+ checkout_user_add.address);
                                navigation.push(navString.OrderStatusScreen, {
                                    status: "success",
                                    pay_type: payment_options[payment_type_index].option,
                                    pay_id: uuid.v4().substring(0,9),
                                    username: user_name,
                                    cartitems: checkout_cart_list,
                                    useremail: user_email,
                                    usercontact: user_contact,
                                    total: total_amount,
                                    address: checkout_user_add.house_name + "," +
                                     checkout_user_add.house_number + "," + checkout_user_add.street + ","+ checkout_user_add.address,
                                    userid: uid,
                                })
                            }, 5000);
                        } else if (payment_options[payment_type_index].option == "Online") {
                            console.log("it's Online");
                            doPayement();
                        }



                    }}
                >
                    <Text style={styles.checkout_payment_btn_text}>pay Now (Rs. {total_amount ? total_amount : "0"})</Text>
                </TouchableOpacity>
                : null}
        </ScreenWrapper>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    checkout_add_add_btn_container: {
        alignSelf: "center",
        width: "50%",
        height: 40,
        backgroundColor: "#0081C9",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    checkout_add_container: {
        marginTop: 20,
    },
    checkout_change_add_btn_text: {
        textDecorationLine: "underline",
        color: "#0081C9",
        fontWeight: "600",
        fontSize: 16,
    },
    checkout_item_datails: {
        width: "65%",
        paddingLeft: 10,
        marginVertical: 10,
    },
    checkout_item_discount_price_style: {
        fontWeight: "700",
        fontSize: 20,
        color: "gray",
        marginLeft: 5,
        textDecorationLine: "line-through"
    },
    checkout_item_discription_style: {
        fontWeight: "400",
        fontSize: 14,
        color: "gray",
        marginTop: 5,
    },
    checkout_item_image: {
        width: 90,
        borderRadius: 5,
    },
    checkout_item_name_style: {
        fontWeight: "600",
        fontSize: 18,
        color: "#000",
    },
    checkout_item_price_contianer: {
        flexDirection: "row",
    },
    checkout_item_price_text_style: {
        fontWeight: "700",
        fontSize: 20,
        color: "green",
    },
    checkout_item_single_container: {
        height: 110,
        flexDirection: "row",
        alignSelf: "center",
        width: "90%",
        elevation: 4,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        padding: 5,
    },
    checkout_payment_btn_container: {
        alignSelf: "center",
        width: "80%",
        height: 50,
        backgroundColor: "#0081C9",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        bottom: 0,
    },
    checkout_payment_btn_text: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    hr_line: {
        height: 3,
        width: "90%",
        backgroundColor: "#00000033",
        borderRadius: 1,
        alignSelf: "center",
    },
})