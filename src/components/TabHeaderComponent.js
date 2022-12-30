import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabHeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text>TabHeaderComponent</Text>
    </View>
  )
}

export default TabHeaderComponent

const styles = StyleSheet.create({
    container: {
        height:60,
        width:Dimensions.get("screen").width, 
        elevation: 5,
        shadowColor:"#000",
        shadowOffset:{
            height:0,
            width:0,
        },
        shadowOpacity:0.3,
        shadowRadius:5,
        backgroundColor:"#fff",
    }
})