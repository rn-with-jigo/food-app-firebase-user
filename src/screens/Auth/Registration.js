import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper';
import firestore from '@react-native-firebase/firestore';
import { DB_USER } from "@env"
import { navString } from '../../constants/navStrings';
import CustomToast from '../../components/CustomToast';
import uuid from "react-native-uuid"

const Registration = ({navigation}) => {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    async function checkLogin() {
        if (username.length <= 0 || password.length <= 0 || name.length <= 0 || phone.length <= 0) {
            return CustomToast("please enter datas");
        } else {
           saveUserData();
        }
    }
    const useruid = uuid.v4();

    const saveUserData = () => {
        navigation.push(navString.Loadder)
        firestore()
            .collection(DB_USER)
            // now this id for createin by us.
            .doc(useruid)
            .set({
                name: name,
                email: username,
                contact: phone,
                password: password,
                uid: useruid,
                cart: [],
                address: [],
                favorite: [],
                selectedAddIndex: null, 
            })
            // this for the use id from db of firebase
            // .add({
            //     name: name,
            //     email: username,
            //     contact: phone,
            //     password: password
            // })
            .then(() => {
                console.log("user add!.");
                navigation.pop(1)
                navigation.goBack(); 
            })
            .catch((err) => {
                console.log("error while residtration, ", err);
                navigation.pop(1)
            })
    }

    return (
        <ScreenWrapper>
            <Text style={styles.registor_user_text}>User Registration</Text>
            <View style={{ margin: 10, marginTop: 50, }}>
                <TextInput style={styles.input_text_box} placeholder="user name" keyboardType='default'
                    value={name}
                    onChangeText={setName}
                    autoCapitalize={false}
                />
            </View>
            <View style={{ margin: 10, }}>
                <TextInput style={styles.input_text_box} placeholder="user email" keyboardType='email-address'
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize={false}
                />
            </View>
            <View style={{ margin: 10, }}>
                <TextInput style={styles.input_text_box} placeholder="user phone" keyboardType='number-pad'
                    value={phone}
                    onChangeText={setPhone}
                    autoCapitalize={false}
                />
            </View>
            <View style={{ margin: 10, }}>
                <TextInput style={styles.input_text_box} placeholder="password" secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword} />
            </View>
            <TouchableOpacity style={styles.registor_btn_container}
                onPress={() => {
                    checkLogin();
                }}
            >
                <Text style={{ fontWeight: "600", color: "#000", fontSize: 20, }}>Registor</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default Registration

const styles = StyleSheet.create({
    input_text_box: {
        height: Dimensions.get("screen").height * 0.06, paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 10,
        width: "80%",
        alignSelf: "center",
    },
    registor_user_text: {
        fontWeight: '600',
        fontSize: 20,
        color: "#000",
        marginTop: 70,
        textAlign: "center",
    },
    registor_btn_container: {
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