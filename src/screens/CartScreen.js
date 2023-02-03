import { DB_USER } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppAssets } from "../assets/appAssets";
import ScreenWrapper from '../components/ScreenWrapper';
import { navString } from "../constants/navStrings";
import { storageKeys } from '../constants/storageKeys';

const CartScreen = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [cart_list, setCartList] = useState([]);
    const [useruid, setUserId] = useState(null)

    useEffect(() => {
        getCatItems()
    }, [isFocused])
    const getCatItems = async () => {
        await AsyncStorage.getItem(storageKeys.useruuid, async (err, res) => {
            if (res) {
                // res = JSON.parse(res);
                setUserId(res)
                console.log(res);
                firestore()
                    .collection(DB_USER)
                    .doc(res)
                    .get()
                    .then(userdata => {
                        if (userdata.exists) {
                            // console.log(userdata.data());
                            console.log("cart len =>", userdata.data().cart.length);
                            //   return userdata._data.cart.length;
                            setCartList(userdata._data.cart)
                        }
                    })
            } else {
                console.log("uuid is not set");
            }
        })
    }

    const cart_update = async (opration_type, item) => {
        switch (opration_type) {
            case 1: // incress the item on cart
                let userdata = await firestore()
                    .collection(DB_USER)
                    .doc(useruid)
                    .get()
                // console.log(userdata);
                // return
                let tempcart = [];
                tempcart = userdata._data.cart;
                tempcart.map((ele,) => {

                    if (ele.id == item.id) {
                        ele.data.qty += 1;
                    }
                })
                firestore()
                    .collection(DB_USER)
                    .doc(useruid)
                    .update({
                        cart: tempcart,
                    })
                getCatItems()
                break;
            case 2: // incress the item on cart
                let userdata1 = await firestore()
                    .collection(DB_USER)
                    .doc(useruid)
                    .get()
                // console.log(userdata);
                // return
                let tempcart1 = [];
                tempcart1 = userdata1._data.cart;
                tempcart1.map((ele,) => {

                    if (ele.id == item.id) {
                        ele.data.qty -= 1;
                    }
                })
                firestore()
                    .collection(DB_USER)
                    .doc(useruid)
                    .update({
                        cart: tempcart1,
                    })
                getCatItems()
                break;
            default:
                break;
        }
    }

    async function delete_item_from_cart(index) {
        let userdata1 = await firestore()
            .collection(DB_USER)
            .doc(useruid)
            .get()
        // console.log(userdata);
        // return
        let tempcart1 = [];
        tempcart1 = userdata1._data.cart;
        tempcart1.splice(index, 1);
        firestore()
            .collection(DB_USER)
            .doc(useruid)
            .update({
                cart: tempcart1,
            })
        getCatItems()
    }


    const renderCartItems = ({ item, index }) => {
        return (
            <View style={styles.cart_item_single_container}>
                <Image source={{ uri: item.data.imgeurl }} style={styles.cart_item_image} />

                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={styles.cart_item_datails}>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.cart_item_name_style} numberOfLines={2} >{item.data.name}</Text>
                            <Text style={styles.cart_item_discription_style} numberOfLines={1} >{item.data.discription}</Text>
                        </View>
                        <View style={styles.cart_item_price_contianer}>
                            <Text style={styles.cart_item_price_text_style}>Rs.{item.data.price}</Text>
                            <Text style={styles.cart_item_discount_price_style}>{item.data.discountprice}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cart_inc_dec_container}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", }}
                        onPress={() => {
                            cart_update(1, item);
                        }}
                    >
                        <Image source={AppAssets.AddIcon} style={{ height: 16, width: 16, tintColor: "#fff" }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>{item.data.qty}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: "center", }}

                        onPress={() => {
                            console.log(item);
                            if (item.data.qty == 1) {
                                console.log("called delete_item_from_cart");
                                delete_item_from_cart(index)
                            } else {

                                cart_update(2, item);
                            }
                        }}
                    >
                        <Image source={AppAssets.MinusIcon} style={{ height: 16, width: 16, tintColor: "#fff" }} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    const getToalofCart = () => {
        let total = 0;
        cart_list.map((ele, index) => {
            // console.log("item => ", ele);
            let cus_arr = ele.customization;
            let pr_price = parseInt(ele.data.price);
            console.log(pr_price);
            // return 
            let pr_dicount = parseInt(ele.data.discountprice);
// start the map
            cus_arr.map((item) => {
                let get_key = Object.keys(item)[0]
                console.log("item => ", item[get_key]);
                if (Array.isArray(item[get_key])) {
                    console.log("item arr => ", item[get_key]);
                    let final_filter_arr = item[get_key]
                    final_filter_arr.map((e) => {
                        if (e.action == "+") {
                            pr_price += parseInt(e.price)
                        } else if (e.action == "-") {
                            pr_price -= parseInt(e.price)
                        } 
                    })
                    // console.log("price => (pr_price)\n ", pr_price);

                } else {
                    pr_price += parseInt(item[get_key].price)
                    // console.log("item obj => ", item[get_key], " price", pr_price);
                                               
                }
            })


            // console.log("cus_total => ",cus_arr);

            // total = total + ele.data.qty * ele.data.price
            // let custmization_total = ele.customization.reduce((pre, cur) => {
            //     return pre += parseInt(cur.cusPrice)
            // }, 0)
            // total = total + custmization_total;
            total = pr_price;
        })
        return total;
    }

    return (
        <ScreenWrapper>
            <FlatList
                data={cart_list}
                renderItem={renderCartItems}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 15 }}
                // ListEmptyComponent={renderEmptyComponent}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 15, }} />
                    )
                }}
            />
            {cart_list.length > 0 ?
                <View style={styles.cart_checkout_container}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 10, }}>
                        <View style={styles.cart_checout_price_details_container}>
                            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>{`Itesm(${cart_list.length}) `}</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>{`Total Amount (${getToalofCart()}) `}</Text>
                        </View>
                        <TouchableOpacity style={styles.cart_checkout_btn_container}
                            onPress={() => {
                                navigation.push(navString.Checkout, { cData: cart_list, total_amount: getToalofCart(), uid: useruid })
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null}
        </ScreenWrapper>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cart_checkout_btn_container: {
        height: 50,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0081C9",
        borderRadius: 25,
    },
    cart_checkout_container: {
        position: "absolute",
        bottom: 0,
        ...Platform.select({
            ios: {
                height: 120,
            },
            default: {
                height: 70,
            }
        }),
        width: "100%",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            height: -3,
            width: 0,
        },
        shadowOpacity: .3,
        shadowRadius: 10,
        elevation: 4,
    },
    cart_checout_price_details_container: {

    },
    cart_inc_dec_container: {
        flexDirection: "column-reverse",
        width: 40,
        backgroundColor: "#0081C9",
        borderRadius: 30,
        alignItems: "center",
        paddingVertical: 3,
    },
    cart_item_datails: {
        width: "85%",
        paddingLeft: 10,
    },
    cart_item_discount_price_style: {
        fontWeight: "700",
        fontSize: 20,
        color: "gray",
        marginLeft: 5,
        textDecorationLine: "line-through"
    },
    cart_item_discription_style: {
        fontWeight: "400",
        fontSize: 14,
        color: "gray",
        marginTop: 5,
    },
    cart_item_image: {
        width: 90,
        borderRadius: 5,
    },
    cart_item_name_style: {
        fontWeight: "600",
        fontSize: 18,
        color: "#000",
    },
    cart_item_price_contianer: {
        flexDirection: "row",
    },
    cart_item_price_text_style: {
        fontWeight: "700",
        fontSize: 20,
        color: "green",
    },
    cart_item_single_container: {
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
})