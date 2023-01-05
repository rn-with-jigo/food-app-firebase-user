import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LanguageModal from '../../components/LanguageModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '../../constants/storageKeys';
import { useNavigation } from '@react-navigation/native';

const PrfoileTab = () => {

  const [isLang, setIsLang] = useState(false);

  const [selectedLang, setSelectedLang] = useState(0);

  // useEffect(() => {
  //   getLanguSaved()
  // }, [])

  // async function getLanguSaved() {
  //   await AsyncStorage.getItem(storageKeys.languageKey, async (err,res) => {
  //     if(res){
  //       console.log("get laguage for storage :");
  //       res = JSON.parse(res)
  //       console.log(res);
  //       setSelectedLang(parseInt(res))
  //     } else {
  //       console.log("store new key for laguage storage");
  //       await AsyncStorage.setItem(storageKeys.languageKey, selectedLang + '');
  //       setSelectedLang(selectedLang)
  //     }
  //   })
  // }

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null
    })
  }, [])

  return (
    <View style={styles.profile_container}>
      <Text>PrfoileTab</Text>
      <TouchableOpacity style={styles.profile_lang_btn}
        onPress={() => setIsLang(true)}
      >
        <Text>Select Lang</Text>
      </TouchableOpacity>
      <LanguageModal isModal={isLang} setIsmodal={setIsLang} onSelecteLanguage={(x) => setSelectedLang(x)} />
    </View>
  )
}

export default PrfoileTab

const styles = StyleSheet.create({
  profile_container: {
    flex: 1,
  },
  profile_lang_btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  }
})