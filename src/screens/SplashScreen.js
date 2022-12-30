import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { navString } from '../constants/navStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '../constants/storageKeys';

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => {
            // navigation.navigate(navString.Login)
            checkAuth()
        }, 3000);
    }, [])

    async function checkAuth() {
        const email = await AsyncStorage.getItem(storageKeys.storeUserEmail, (err, res) => {
            if(res){
                navigation.navigate(navString.Homescreen)
            } else {
                navigation.navigate(navString.Login)
            }
        })
    }

  return (
    <View style={styles.screen_main_container}>
      <Text style={styles.logo_text_style}>E Food</Text>
      <Text style={styles.logo_text_subtile}>User dash</Text>
      <Text style={styles.logo_text_subline_style}>get your food quickly.</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    logo_text_style:{
        fontWeight:"700",
        color:"tomato",
        fontSize: 30,
    },
    logo_text_subtile:{
        fontWeight:"700",
        color:"tomato",
        fontSize: 16,
    },
    logo_text_subline_style:{
        fontWeight:"500",
        color:"gray",
        fontSize: 16,
        marginTop:5,
    },
    screen_main_container:{
        flex:1, justifyContent:"center",
        alignItems:"center",
    }
})