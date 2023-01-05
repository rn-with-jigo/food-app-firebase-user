import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const WishesTab = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null
    })
  }, [])

  return (
    <View>
      <Text>WishesTab</Text>
    </View>
  )
}

export default WishesTab

const styles = StyleSheet.create({})