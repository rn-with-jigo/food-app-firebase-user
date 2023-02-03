import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CloseComponent = ({setIsPress}) => {

  return (
    <TouchableOpacity style={styles.close_main_container}
        onPress={() => {
            if(setIsPress) setIsPress(false)
        }}
    >
      <Text style={styles.close_text_style}>X</Text>
    </TouchableOpacity>
  )
}

export default CloseComponent

const styles = StyleSheet.create({
    close_main_container: {
        position:"absolute",
        right: 10,
        top:10,
    },
    close_text_style:{
        fontWeight:"bold",
        fontSize:20,
        color:"#000",
    }
})