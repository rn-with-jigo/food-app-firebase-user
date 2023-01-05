import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const SerachTab = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null
    })
  }, [])

  return (
    <View>
      <Text>SerachTab</Text>
    </View>
  )
}

export default SerachTab

const styles = StyleSheet.create({})