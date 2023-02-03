import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper';
import ModuleSelectorComponent from '../constants/ModuleSelectorComponent';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { storageKeys } from '../constants/storageKeys';
import firestore from '@react-native-firebase/firestore';
import { DB_ITEMS, DB_USER } from "@env"
import { navString } from '../constants/navStrings';
import { AppAssets } from '../assets/appAssets';
import { useIsFocused } from '@react-navigation/native';
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list"
import ChoicerComponent from '../components/ChoicerComponent';
import SNIPComponentSelector from '../components/SNIPComponentSelector';
import SNPComponentSelector from '../components/SNPComponentSelector';

const ProductDetailsScreen = ({ navigation, route }) => {

    const { itemData } = route.params;
    const [cart_count, setCart_count] = useState(0);
    const isFocused = useIsFocused()

    const [itemTotal, setItemTotal] = useState(0);
    const [selected_optoins, setSelectedOptions] = useState([]);

    const { getItem: getUserId } = useAsyncStorage(storageKeys.useruuid)

    const [lsitChoice, setLsitChoice] = useState(null);

    const [customizationOption, setCustomizationOption] = useState([]);
    const [mustliSpaceValie, setMulstiSpaceValue] = useState([]);

    useEffect(() => {
        // console.log(itemData);
        setItemTotal(parseInt(itemData.data.price))
    }, [])

    useEffect(() => {
        navigation.setOptions({
            // headerTintColor: "tomato",
            headerBackTitleVisible: false,
            headerRight: () => <CartCounts />
        })
        getUserCartCount();
    }, [cart_count, isFocused])


    useEffect(() => {
        console.log("selected_optoins => \n", selected_optoins);
        // if (selected_optoins.length > 0) {
        //     let total = selected_optoins.reduce((prev, cur) => {
        //         // console.log(cur);
        //         if (cur?.cusAction != null) {
        //             return prev += parseInt(cur.cusPrice)
        //         }
        //         return prev;
        //     }, 0)

        //     console.log("total => ", total);
        // }
        // getTotal()

    }, [selected_optoins])

    // useEffect(() => {
    //     console.log("customizationOption => ", customizationOption);
    // }, [customizationOption])
    const getTotal = useCallback(() => {
        let total = itemTotal;
        customizationOption.map((ele, ind, arr) => {
            for ([key, value] of Object.entries(arr[ind])) {
                value.map((e) => {
                    console.log(e.action, " ", e.price)
                    if (e.action == "+") {
                        total += e.price;
                    } else if (e.action == "-") {
                        total -= e.price;
                    }
                })
            }
        })
        setItemTotal(total);
    }, [customizationOption])

    // const getTotal = useCallback(() => {
    //     let total = 0;
    //     let get_tatal = selected_optoins.reduce((pre, cur, index, arr) => {
    //         if (arr[index]?.cusAction != null) {
    //             return pre += parseInt(cur.cusPrice);
    //         } else {
    //             return 0;
    //         }
    //     }, 0)
    //     return (get_tatal + parseInt(itemData.data.price));
    // }, [selected_optoins])

    const CartCounts = useCallback(() => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.push(navString.Cart)
                }}
            >
                <Image source={AppAssets.CartIcon} style={{
                    height: 24,
                    width: 24
                }} />
                <View style={styles.cart_count_container}>
                    <Text style={{ fontWeight: "bold", fontSize: 10, color: "#fff" }}>{cart_count}</Text>
                </View>
            </TouchableOpacity>
        )
    }, [cart_count])

    async function onAddToCart() {
        console.log("customizationOption => => ", customizationOption);
        // return;
        let total = itemTotal;
        customizationOption.map((ele, ind, arr) => {
            for ([key, value] of Object.entries(arr[ind])) {
                value.map((e) => {
                    // console.log(e.action, " ", e.price)
                    if (e.action == "+") {
                        total += parseInt(e.price);
                    } else if (e.action == "-") {
                        total -= parseInt(e.price);
                    }
                })
            }
        })
        console.log("total => => => ", total);
        let userId = await getUserId();
        console.log(userId);
        firestore()
            .collection(DB_USER)
            .doc(userId)
            .get()
            .then(userdata => {
                if (userdata.exists) {
                    console.log("user data => \n", userdata.data());
                    let userData = userdata.data()
                    if (userData.hasOwnProperty("cart")) {
                        console.log("user has cart");
                        let cart_items = userdata.data().cart;
                        if (cart_items.length > 0) {
                            let itemHas = false
                            cart_items.map((ele, item_index) => {
                                if (ele.id == itemData.id) {
                                    itemHas = true
                                    ele.data.qty += 1;
                                    ele.customization = customizationOption;
                                }
                            })
                            if (itemHas) {

                            } else {
                                itemData.customization = customizationOption;
                                cart_items.push(itemData)
                            }
                        } else {
                            itemData.customization = customizationOption;
                            cart_items.push(itemData)
                        }
                        console.log("car tvalue \n", cart_items);
                        firestore()
                            .collection(DB_USER)
                            .doc(userId)
                            .update({
                                cart: cart_items,
                            })
                        getUserCartCount();
                    } else {
                        console.log("user has not cart");
                    }
                } else {
                    console.log("user not found");
                }
            });
    }

    const getUserCartCount = async () => {
        let userId = await getUserId();
        let cart_len = await firestore()
            .collection(DB_USER)
            .doc(userId)
            .get()
            .then(userdata => {
                if (userdata.exists) {
                    // console.log(userdata.data());
                    console.log("cart len =>", userdata.data().cart.length);
                    return userdata._data.cart.length;
                }
            })
        console.log("cart_len =>", cart_len);
        setCart_count(cart_len);
    }

    // const LoadSelectonList = (Lprops) => {

    //     const { data, save, label } = Lprops;
    //     const [LData, setLData] = useState([])

    //     useEffect(() => {
    //         let arr = data.reduce((per, cur) => {
    //             per.push({ key: cur.name, value: cur.name })
    //             return per;
    //         }, [])
    //         console.log("arr -> ", arr);
    //         setLData(arr)
    //     }, [])

    //     return (
    //         <MultipleSelectList
    //             data={LData}
    //             save={save}
    //             setSelected={(s) => {
    //                 console.log("ch => ", s);
    //                 // setCh(s)
    //             }}
    //             onSelect={(ans) => {
    //                 console.log("ans => ", ch);
    //             }}
    //             label={label}
    //         // onSelect={() => {
    //         //     console.log("onSelect => ", lsitChoice);
    //         // }}
    //         />
    //     )
    // }

    function udpateCustomization(mKey, data) {
        let isKeyPresent = customizationOption.findIndex(item => { return item.hasOwnProperty(mKey) })
        console.log("isKeyPresent =>", isKeyPresent);

        if (isKeyPresent != -1) {
            // console.log("customizationOption => multiple => ", customizationOption);
            let arr = [];
            arr = customizationOption;
            arr[isKeyPresent][mKey] = data;
            setCustomizationOption(arr)
        } else {
            let arr = [];
            let obj = {};
            arr = customizationOption;
            obj[mKey] = data;
            arr.push(obj)
            setCustomizationOption(arr)
        }
    }

    return (
        <ScreenWrapper style={styles.pro_main_contianer}>
            <ScrollView
                contentContainerStyle={{
                    padding: 10,
                    paddingTop: 16,
                }}
            >
                <ImageBackground style={styles.pro_header_container}
                    source={{ uri: itemData.data?.imgeurl }}
                    borderRadius={10}
                    resizeMode="cover"
                >

                </ImageBackground>
                <View style={{ marginTop: 24, }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            color: "#61876E",
                            fontSize: 20,
                        }}>{itemData.data?.name || "item Name"}</Text>
                        <Text style={{
                            fontWeight: "700",
                            color: "#000",
                            fontSize: 16,
                        }}>Rs. {itemData.data?.price + "  " || 0}
                            <Text style={{
                                color: "gray",
                                textDecorationLine: "line-through",
                                fontSize: 14,
                            }}>
                                {itemData.data?.discountprice || null}
                            </Text>
                        </Text>
                    </View>

                    <View style={{ marginVertical: 8, }}>
                        <Text>{itemData.data?.discription || "item details"}</Text>
                    </View>
                    {itemData.data.hasOwnProperty("extraModule") ?
                        <View style={styles.pro_extra_modules_container}>

                            <Text style={styles.pro_sub_heading}>Customization</Text>
                            {itemData.data?.extraModule.map((ele, index) => {
                                // console.log("ele => ", ele);
                                // customizationOption.push([...customizationOption, {name: ele.name}])
                                return (
                                    <View style={styles.pro_item_container} key={index}>
                                        <Text style={{ color: "#61876E", fontWeight: "bold" }}>{ele.name || "Module name"}</Text>
                                        <View style={{
                                            height: 2,
                                            backgroundColor: "#00000033",
                                            marginVertical: 8,
                                        }} />
                                        {ele.moduleSlug == "SNIP" ?
                                            ele.isMutiple ?
                                                <SNIPComponentSelector
                                                    listData={ele?.moduleData}
                                                    isMulti={ele?.isMutiple}
                                                    getSelectedData={(e) => {
                                                        console.log(e);
                                                        let mName = ele.name.trim()
                                                        udpateCustomization(mName, e)
                                                    }}
                                                />
                                                : <SNIPComponentSelector
                                                    listData={ele?.moduleData}
                                                    isMulti={ele?.isMutiple}
                                                    getSelectedData={(e) => {
                                                        console.log(e);
                                                        let mName = ele.name.trim()
                                                        udpateCustomization(mName, e)
                                                    }}
                                                />
                                            : ele.moduleSlug == "SIP" ?
                                                <SNPComponentSelector
                                                    listData={ele?.moduleData}
                                                    isMulti={ele?.isMutiple}
                                                    getSelectedData={(e) => {
                                                        console.log(e);
                                                        let mName = ele.name.trim()
                                                        udpateCustomization(mName, e)
                                                    }}
                                                />
                                                :
                                                <SNPComponentSelector
                                                    listData={ele?.moduleData}
                                                    isMulti={ele?.isMutiple}
                                                    getSelectedData={(e) => {
                                                        console.log(e);
                                                        let mName = ele.name.trim()
                                                        udpateCustomization(mName, e)
                                                    }}
                                                />
                                        }
                                    </View>
                                )
                            })}

                        </View>
                        : null}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.pro_add_to_cart_btn}
                onPress={() => {

                    onAddToCart();
                }}
            >
                <Text style={styles.pro_add_to_cart_text}>Add To Cart</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    cart_count_container: {
        position: "absolute",
        height: 18,
        width: 18,
        borderRadius: 8,
        backgroundColor: "#61876E",
        justifyContent: "center",
        alignItems: "center",
        top: -5, right: -4
    },
    pro_add_to_cart_btn: {
        height: 40,
        marginHorizontal: 10,
        backgroundColor: "#61876E",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowRadius: 3,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 0.5,
            width: 0,
        },
    },
    pro_add_to_cart_text: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18,
    },
    pro_extra_modules_container: {
    },
    pro_header_container: {
        height: 200,
        backgroundColor: "#00000033",
        borderRadius: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 0.5,
            width: 0,
        },
    },
    pro_item_container: {
        padding: 10,
        marginVertical: 8,
    },
    pro_item_sub_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
    },
    pro_main_contianer: {
        flex: 1,
    },
    pro_sub_heading: {
        fontWeight: "600",
        color: "#61876E",
        fontSize: 16,
    },
})