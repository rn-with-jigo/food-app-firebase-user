import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { AppAssets } from '../../assets/appAssets';
import CustomToast from '../../components/CustomToast';
import firestore from '@react-native-firebase/firestore';
import { DB_ITEMS, DB_USER } from "@env"
import uuid from "react-native-uuid";

const NewAddressScreen = ({ navigation, route }) => {

    const { uid } = route.params;
    // console.log(uid);
    // console.log("offset => ",uuid.v4({offset: 2}));

    const [add_house_num, setAddHouseNum] = useState("");
    const [add_house_name, setAddHouseName] = useState("");
    const [add_house_street, setAddHouseStreet] = useState("");
    const [add_house_address, setAddHouseAddress] = useState("");
    const [add_name, setAddName] = useState("");

    async function saveAddress() {
        if (!add_house_address || !add_house_num || !add_house_street || !add_name) {
            return CustomToast("Please fill requied filed")
        }

        let make_add_obj = {};
        make_add_obj.aid = uuid.v4()
        make_add_obj.name = add_name || "not-defined";
        make_add_obj.house_name = add_house_name || "";
        make_add_obj.house_number = add_house_num || "";
        make_add_obj.street = add_house_street || "";
        make_add_obj.address = add_house_address || "";

        if (uid) {
            let get_exsiting_address = await firestore().collection(DB_USER).doc(uid).get()
            let temp_address = get_exsiting_address._data.address;
            temp_address.push(make_add_obj)
            firestore().
                collection(DB_USER)
                .doc(uid)
                .update({
                    address: temp_address
                })

            CustomToast("Address is save")
            navigation.pop(1);
        } else {
            console.log("uid is not get");
        }
    }

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, paddingTop: 10, }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingBottom: 20,
                        paddingTop: 20,
                    }}
                >
                    <View>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={styles.input_heading_text}>Address Name: </Text>
                            <Image source={AppAssets.RequiredIcon} style={{ height: 10, width: 10, tintColor: "tomato" }} />
                        </View>
                        <View style={{ margin: 10, }}>

                            <TextInput style={styles.input_text_box} placeholder="Address Name"
                                value={add_name}
                                onChangeText={setAddName}
                            />
                        </View>
                    </View>

                    <View style={{ marginVertical: 10, }}>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={styles.input_heading_text}>House Number: </Text>
                            <Image source={AppAssets.RequiredIcon} style={{ height: 10, width: 10, tintColor: "tomato" }} />
                        </View>
                        <View style={{ margin: 10, }}>

                            <TextInput style={styles.input_text_box} placeholder="House Number"
                                value={add_house_num}
                                onChangeText={setAddHouseNum}
                            />
                        </View>
                    </View>

                    <View style={{ marginVertical: 10, }}>

                        <Text style={styles.input_heading_text}>House Name: </Text>

                        <View style={{ margin: 10, }}>

                            <TextInput style={styles.input_text_box} placeholder="House Name"
                                value={add_house_name}
                                onChangeText={setAddHouseName}
                            />
                        </View>
                    </View>
                    
                    <View style={{ marginVertical: 10, }}>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={styles.input_heading_text}>Street: </Text>
                            <Image source={AppAssets.RequiredIcon} style={{ height: 10, width: 10, tintColor: "tomato" }} />
                        </View>
                        <View style={{ margin: 10, }}>

                            <TextInput style={styles.input_text_box} placeholder="Street"
                                value={add_house_street}
                                onChangeText={setAddHouseStreet}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 10, }}>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={styles.input_heading_text}>Address: </Text>
                            <Image source={AppAssets.RequiredIcon} style={{ height: 10, width: 10, tintColor: "tomato" }} />
                        </View>
                        <View style={{ margin: 10, }}>

                            <TextInput style={styles.input_text_box} placeholder="Address"
                                value={add_house_address}
                                onChangeText={setAddHouseAddress}
                            />
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity style={styles.save_new_add_btn_container}
                    onPress={() => {
                        // navigation.push(navString.NewAddressScreen)
                        saveAddress()
                    }}
                >
                    <Text style={styles.save_new_address_text_style}>Save New Address</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default NewAddressScreen

const styles = StyleSheet.create({
    input_heading_text: {
        fontWeight: "600",
        color: "#000",
        fontSize: 16,
        marginLeft: 10,
    },
    input_text_box: {
        height: Dimensions.get("screen").height * 0.05, paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
    },
    save_new_add_btn_container: {
        height: 50,
        alignSelf: "center",
        width: "80%",
        backgroundColor: "#0081C9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    save_new_address_text_style: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
})