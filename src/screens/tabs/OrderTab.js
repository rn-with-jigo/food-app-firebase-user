import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderTab = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null
    })
  }, [])

  return (
    <View>
      <Text>OrderTab</Text>
    </View>
  )
}

export default OrderTab

const styles = StyleSheet.create({})