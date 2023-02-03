import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

interface SNPComponentSelectorProps {
  listData: Array | Object | undefined,
  isMulti?: Boolean | String | undefined,
  getSelectedData? : void | Function | undefined,
}

const SNPComponentSelector = (props: SNPComponentSelectorProps) => {

  const { listData, isMulti, getSelectedData} = props;

  const [selectedInd, setSelectedInd] = useState(null)
  const [isMultiSelector, setIsMulstiSelector] = useState(false)
  const [listOfMultiSelInd, setListOfMultiSelInd] = useState([])

  // useEffect(() => {
  //   console.log("listOfMultiSelInd => ", listOfMultiSelInd);
  // }, [listOfMultiSelInd])
  useEffect(() => {
    if (isMulti == null || isMulti == undefined) {
      setIsMulstiSelector(true)
    } else {
      setIsMulstiSelector(isMulti)
    }
  }, [])

  useEffect(() => {
    if(listOfMultiSelInd.length > 0){
      // console.log("final _result => ", listOfMultiSelInd);
      if(getSelectedData){
        getSelectedData(listOfMultiSelInd)
      }
    }
  }, [listOfMultiSelInd])

  const renderItemSNIP = ({ item, index }) => {
    return (
      <View>
        {
          isMultiSelector ?
            <TouchableOpacity style={{
              padding: 4,
              backgroundColor: (listOfMultiSelInd.find(itm => itm?.id == item?.id) != undefined) ? "#01bf71" : "#00000033",
              borderRadius: 8
            }}
              onPress={() => {
                if (listOfMultiSelInd.findIndex(ite => ite?.id== item?.id) == -1) {
                  setListOfMultiSelInd([...listOfMultiSelInd, item]);
                } else if (listOfMultiSelInd.find(ite => ite?.id == item?.id) != undefined) {
                  setListOfMultiSelInd([...listOfMultiSelInd.filter(i => i?.id != item?.id)])
                }
              }}
            >
              <Text>{item?.name}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ padding: 8, backgroundColor: selectedInd == index ? "#01bf71" : "#00000033" }}
              onPress={() => {
                if(selectedInd !== index){

                  setSelectedInd(index);
                  getSelectedData([item])
                }
              }}
            >
              <Text>{item?.name}</Text>
            </TouchableOpacity>
        }

      </View>
    )
  }

  return (
    <View style={{paddingTop:8,}}>
      <FlatList
        data={listData || [{}, {}, {}, {}]}
        renderItem={renderItemSNIP}
        horizontal
        ItemSeparatorComponent={() => {
          return (
            <View style={{ width: 5, }} />
          )
        }}
      />

      {/* <View style={{ margin: 8, marginTop:10, }}>
        <View style={{
          flexDirection: "row"
        }}>
          <View style={{
            flexDirection: "row",
            alignItems:"center"
          }}>
            <View style={[{ backgroundColor: "red",marginHorizontal:4, }, styles.status_style]} />
            <Text>Minus Price</Text>
          </View>
          <View style={{
            flexDirection: "row",
            alignItems:"center"
          }}>
            <View style={[{ backgroundColor: "yellow",marginHorizontal:4, }, styles.status_style]} />
            <Text>No Price</Text>
          </View>
          <View style={{
            flexDirection: "row",
            alignItems:"center"
          }}>
            <View style={[{ backgroundColor: "#fff",marginHorizontal:4, }, styles.status_style]} />
            <Text>Add Price</Text>
          </View>
        </View>
      </View> */}
    </View>
  )
}

export default SNPComponentSelector

const styles = StyleSheet.create({
  status_style: {
    height: 10, width: 10, borderRadius: 5, shadowColor: "#000", shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 4,
  }
})