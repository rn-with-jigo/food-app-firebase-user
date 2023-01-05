import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppAssets } from '../assets/appAssets'
import { storageKeys } from '../constants/storageKeys'

const LanguageModal = ({ isModal, setIsmodal, onSelecteLanguage }) => {

    const [language, setLanguage] = useState([
        { name: "English", selected: true },
        { name: "हिंदी", selected: false },
        { name: "ગુજરાતી", selected: false },
    ])

    const [selectedLang, setSelectedLang] = useState(0);

    // useEffect(() => {
    //     getLanguSaved()
    // }, [selectedLang])

    // async function getLanguSaved() {
    //     await AsyncStorage.getItem(storageKeys.languageKey, async (err, res) => {
    //         if (res) {
    //             console.log("get laguage for storage :");
    //             res = JSON.parse(res)
    //             console.log(res);
    //             setSelectedLang(parseInt(res))
    //         } else {
    //             console.log("store new key for laguage storage");
    //             await AsyncStorage.setItem(storageKeys.languageKey, selectedLang + '');
    //             setSelectedLang(selectedLang)
    //         }
    //     })
    // }

    const renderLanguages = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.modal_lang_container}
                onPress={() => {
                    let temp_arr = language;
                    temp_arr.map(async (ele, eleIndex) => {
                        if (index == eleIndex) {
                            if (ele.selected == true) {
                                ele.selected = false;
                            } else {
                                ele.selected = true;
                                setSelectedLang(eleIndex)
                                await AsyncStorage.setItem(storageKeys.languageKey, selectedLang + '');
                            }
                        } else {
                            ele.selected = false;
                        }
                    })
                    let temp = [];
                    temp_arr.map((el) => {
                        temp.push(el)
                    })
                    setLanguage(temp)
                }}
            >
                <View>
                    <Image source={(item.selected) ? AppAssets.RadioFill : AppAssets.Radio} style={[{
                        height: 25, width: 25, tintColor: "blue",
                    }]} />
                </View>
                <Text style={styles.modal_lang_text}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <Modal
            transparent
            visible={isModal}
            animationType='slide'
        >
            <View style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "center", alignItems: "center" }}>
                <View style={{
                    borderRadius: 10, backgroundColor: "#fff",
                    padding: 20,
                    width: "80%",
                }}>
                    <Text style={styles.modal_heading_text}>Select Lanaguage</Text>
                    <FlatList
                        data={language}
                        renderItem={renderLanguages}
                        keyExtractor={item => item.name.toString()}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 10 }} />
                        )}
                        contentContainerStyle={{ marginTop: 10, }}
                    />
                    <View style={styles.modal_lang_action_container}>
                        <TouchableOpacity style={styles.modal_lang_action_cancle}
                            onPress={() => setIsmodal(false)}
                        >
                            <Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modal_lang_action_apply}
                            onPress={() => {
                                setIsmodal(false);
                                console.log("selected language =>", selectedLang);
                                onSelecteLanguage(selectedLang)
                            }}
                        >
                            <Text style={{ fontSize: 16, color: "#000", fontWeight: "700" }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LanguageModal

const styles = StyleSheet.create({
    modal_heading_text: {
        fontWeight: '700',
        color: "gray",
        fontSize: 20,
        textAlign: "center"

    },
    modal_lang_action_apply: {
        height: 50,
        width: "40%",
        borderRadius: 10,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
    },
    modal_lang_action_cancle: {
        height: 50,
        width: "40%",
        borderRadius: 10,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    modal_lang_action_container: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    modal_lang_container: {
        height: 50,
        width: "90%",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: .5,
        paddingLeft: 10,
        alignSelf: "center",
    },
    modal_lang_text: {
        fontSize: 16,
        color: "#000",
        fontWeight: "700",
        marginLeft: 10,
    }
})