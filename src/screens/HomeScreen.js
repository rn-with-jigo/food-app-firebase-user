import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Constants from "expo-constants";
import { AppAssets } from '../assets/appAssets';
import HomeTab from './tabs/HomeTab';
import SerachTab from './tabs/SerachTab';
import WishesTab from './tabs/WishesTab';
import OrderTab from './tabs/OrderTab';
import PrfoileTab from './tabs/PrfoileTab';

const HomeScreen = ({ navigation }) => {

    const [seletectedTab, setSeletectedTab] = useState(0);

    useEffect(() => {
        if (seletectedTab == 0) {
            setNavigationVAlue("Home");
        } else if (seletectedTab == 1) {
            setNavigationVAlue("Search");
        } else if (seletectedTab == 2) {
            setNavigationVAlue("Wishes");
        } else if (seletectedTab == 3) {
            setNavigationVAlue("Orders");
        } else if (seletectedTab == 4) {
            setNavigationVAlue("Prfoile");
        }
    }, [seletectedTab])

    function setNavigationVAlue(value) {
        navigation.setOptions({
            title: value,
        })
    }

    return (
        <ScreenWrapper isMain={true}>
            {
                seletectedTab == 0 ?
                    (<HomeTab />)
                    : seletectedTab == 1 ?
                        (<SerachTab />)
                        : seletectedTab == 2 ?
                            (<WishesTab />)
                            : seletectedTab == 3 ?
                                (<OrderTab />)
                                : (<PrfoileTab />)
            }

            <View style={styles.home_bottom_container}>
                <TouchableOpacity style={styles.home_tab_btn}
                    onPress={() => setSeletectedTab(0)}
                >
                    <Image source={AppAssets.HomeIcon} style={[styles.home_bottom_icon_style, { tintColor: seletectedTab == 0 ? "orange" : "#000" }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.home_tab_btn}
                    onPress={() => setSeletectedTab(1)}
                >
                    <Image source={AppAssets.SerachIcon} style={[styles.home_bottom_icon_style, { tintColor: seletectedTab == 1 ? "orange" : "#000" }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.home_tab_btn}
                    onPress={() => setSeletectedTab(2)}
                >
                    <Image source={AppAssets.WishIcon} style={[styles.home_bottom_icon_style, { tintColor: seletectedTab == 2 ? "orange" : "#000" }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.home_tab_btn}
                    onPress={() => setSeletectedTab(3)}
                >
                    <Image source={AppAssets.OrderIcon} style={[styles.home_bottom_icon_style, { tintColor: seletectedTab == 3 ? "orange" : "#000" }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.home_tab_btn}
                    onPress={() => setSeletectedTab(4)}
                >
                    <Image source={AppAssets.ProfileIcon} style={[styles.home_bottom_icon_style, { tintColor: seletectedTab == 4 ? "orange" : "#000" }]} />
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    home_bottom_container: {
        position: "absolute",
        bottom: 0,

        backgroundColor: "#fff",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        ...Platform.select({
            ios: {
                height: 50 + Constants.statusBarHeight,
                paddingBottom: Constants.statusBarHeight,
            },
            android: {
                height: 50,
            }
        }),
        shadowColor: "gray",
        shadowOpacity: .2,
        shadowOffset: {
            height: -5,
            width: 0,
        },
        shadowRadius: 0,
    },
    home_bottom_icon_style: {
        height: 25,
        width: 25,
    },
    home_tab_btn: {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
})