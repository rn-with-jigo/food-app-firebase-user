import { DB_USER } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { navString } from '../../constants/navStrings';
import { storageKeys } from '../../constants/storageKeys';

const AddressScreen = ({ navigation }) => {

    const [user_address, setUserAddress] = useState([]);
    const [useruuid, setUserUUID] = useState(null);
    const [user_chossen_add, setUserChossenAdd] = useState(null);
    const isFocused = useIsFocused()

    useEffect(() => {
        getUserDetails()
    }, [isFocused])

    useEffect(() => {
        getUserChossenAddress()
    }, [user_chossen_add])

    const getUserDetails = async () => {
        await AsyncStorage.getItem(storageKeys.useruuid, (err, res) => {
            if (res) {
                setUserUUID(res)
                firestore()
                    .collection(DB_USER)
                    .doc(res)
                    .get()
                    .then(userdata => {

                        let listOfAdd = userdata._data.address
                        setUserAddress(listOfAdd);
                    })
            }
        })
    }

    async function getUserChossenAddress () {
        await AsyncStorage.getItem(storageKeys.userAddres, (err, res) => {
            if(res != null){
                setUserChossenAdd(res);
            } else {
                setUserChossenAdd(null);
            }
        })
    }

    async function setAddressAsDefualt(aid) {
        await AsyncStorage.getItem(storageKeys.userAddres, async (err, res) => {
            if (res != null) {
                if (res != aid) {
                    await AsyncStorage.setItem(storageKeys.userAddres, aid)
                    // setUserChossenAdd(aid)
                }
                // setUserChossenAdd(aid)
            } else {
                await AsyncStorage.setItem(storageKeys.userAddres, aid)
            }
        }).catch((err) => {
            console.log("error while set the address id in Asyncstorage. =>\n", err);
        })
    }

    const renderUserAddress = ({ item, index }) => {
        return (
            <View style={styles.add_item_contianer}>
                <Text style={styles.add_name_text}>{item.name}</Text>
                <Text style={styles.add_house_num_text}>{item.house_number}</Text>
                <Text style={styles.add_address_Text}>{item.house_name}, {item.street}, {item.address}</Text>
                {user_chossen_add === item.aid?
                    <View style={styles.add_defulat_set_style}>
                        <Text style={{fontWeight:"600", color:"gray", fontSize:16,}}>Defualt</Text>
                    </View>
                :
                <TouchableOpacity style={styles.add_set_defulat_btn_container}
                    onPress={() => {
                        setAddressAsDefualt(item.aid);
                        setUserChossenAdd(item.aid)
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>Set Default</Text>
                </TouchableOpacity>
                }
            </View>
        )
    }

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={user_address}
                        renderItem={renderUserAddress}
                        keyExtractor={item => item?.name}
                        contentContainerStyle={{ padding: 15 }}
                        // ListEmptyComponent={renderEmptyComponent}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={{ height: 15, }} />
                            )
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.add_new_add_btn_container}
                    onPress={() => {
                        console.log(useruuid);
                        navigation.push(navString.NewAddressScreen, { uid: useruuid })
                    }}
                >
                    <Text style={styles.add_new_address_text_style}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    add_address_Text: {
        fontSize: 16,
        fontWeight: "700",
        color: "gray",
        marginTop: 5,
    },
    add_defulat_set_style:{
        position: "absolute",
        right: 10,
        top: 10,
    },
    add_house_num_text: {
        fontSize: 16,
        fontWeight: "700",
        color: "gray",
        marginTop: 15,
    },
    add_item_contianer: {
        height: 120,
        width: "90%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        alignSelf: "center",
    },
    add_name_text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    add_new_add_btn_container: {
        height: 50,
        alignSelf: "center",
        width: "80%",
        backgroundColor: "#0081C9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    add_new_address_text_style: {
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
    add_set_defulat_btn_container: {
        position: "absolute",
        right: 10,
        top: 10,
        height: 45,
        width: 100,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 23,
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        backgroundColor: "#0081C9"
    },
})