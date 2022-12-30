import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper';
import { DB_USER } from "@env"
import firestore from '@react-native-firebase/firestore';
import { navString } from '../../constants/navStrings';
import CustomToast from '../../components/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '../../constants/storageKeys';

const Login = ({ navigation }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function checkLogin() {

        if (username.length <= 0 || password.length <= 0) {
            return CustomToast("please enter datas");
        } else {
            navigation.push(navString.Loadder)

            firestore()
                .collection(DB_USER)
                // Filter results
                .where('email', '==', username)
                .get()
                .then(async querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        let uData = querySnapshot.docs[0]._data;
                        console.log(uData);
                        if (username == uData.email && password == uData.password) {
                            await AsyncStorage.setItem(storageKeys.storeUserEmail, uData.email);
                            setTimeout(() => {
                                navigation.pop(1);
                                CustomToast("Welcome to User Dash..");
                                navigation.push(navString.Homescreen)
                            }, 2000)
                        } else {
                            CustomToast("password not matched");
                            navigation.pop(1);    
                        }
                    }else {
                        CustomToast("password or username is not matched");
                        navigation.pop(1);
                    }
                });
            return;
            const users = await firestore().collection(DB_USER).get();
            const { docs } = users;
            //     console.log("admins => ", admins.docs[0].data());
            if (docs[0]._data?.email == username && docs[0]._data?.password == password) {
                setTimeout(() => {
                    navigation.pop(1);
                    CustomToast("Welcome to User Dash..");
                    navigation.push(navString.Homescreen)
                }, 2000)
            } else {
                CustomToast("password or username is not matched");
                navigation.pop(1);
            }
        }

    }

    return (
        <ScreenWrapper>
            <Text style={styles.login_admin_text}>User Login</Text>
            <View style={{ margin: 10, marginTop: 50, }}>
                <TextInput style={styles.input_text_box} placeholder="user email" keyboardType='email-address'
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize={false}
                />
            </View>
            <View style={{ margin: 10, }}>
                <TextInput style={styles.input_text_box} placeholder="password" secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword} />
            </View>
            <TouchableOpacity style={styles.login_btn_container}
                onPress={() => {
                    checkLogin();
                }}
            >
                <Text style={{ fontWeight: "600", color: "#000", fontSize: 20, }}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.create_new_accountext}
                onPress={() => navigation.push(navString.Registration)}
            >Create an new Account</Text>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    create_new_accountext: {
        fontSize: 18,
        fontWeight: "600",
        textDecorationLine: "underline",
        marginTop: 15,
        textAlign: "center",
        color: "gray",
    },
    input_text_box: {
        height: Dimensions.get("screen").height * 0.06, paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
    },
    login_admin_text: {
        fontWeight: '600',
        fontSize: 20,
        color: "#000",
        marginTop: 70,
        textAlign: "center",
    },
    login_btn_container: {
        height: Dimensions.get("screen").height * 0.06,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
        backgroundColor: "orange",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})