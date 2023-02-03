import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

interface SNIPComponentSelectorProps {
  listData: Array | Object | undefined,
  isMulti?: Boolean | String | undefined,
  getSelectedData?: void | Function | undefined,
}

const SNIPComponentSelector = (props: SNIPComponentSelectorProps) => {

  const { listData, isMulti, getSelectedData } = props;

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
    if (listOfMultiSelInd.length > 0) {
      // console.log("final _result => ", listOfMultiSelInd);
      if (getSelectedData) {
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
                if (listOfMultiSelInd.findIndex(ite => ite?.id == item?.id) == -1) {
                  setListOfMultiSelInd([...listOfMultiSelInd, item]);
                } else if (listOfMultiSelInd.find(ite => ite?.id == item?.id) != undefined) {
                  setListOfMultiSelInd([...listOfMultiSelInd.filter(i => i?.id != item?.id)])
                }
              }}
            >
              <View style={{
                height: Dimensions.get("screen").width * 0.2,
                width: Dimensions.get("screen").width * 0.2,

                // backgroundColor:"pink"
              }}>
                <ImageBackground
                  source={{ uri: item.img }}
                  style={{ flex: 1, }}
                  borderRadius={8}
                >
                  <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, }} >
                      <View style={{
                        backgroundColor: "#61876E",
                        padding: 4,
                        alignSelf: "flex-start",
                        borderRadius: 8,
                        borderBottomLeftRadius: 0,
                      }}>
                        <Text style={{ fontWeight: '700', fontSize: 12, color: (item.action == "-") ? "red" : (item.action == null) ? "yellow" : "#fff" }}>Rs.{item?.price}</Text>
                      </View>
                    </View>
                    <View style={{
                      flex: 0.5, backgroundColor: "#00000088",
                      borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <Text style={{ fontWeight: "700", color: "#fff", fontSize: 12, }}>{item.name}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{
              padding: 4,
              backgroundColor: selectedInd == index ? "#01bf71" : "#00000033",
              borderRadius: 8
            }}
              onPress={() => {
                if (selectedInd !== index) {

                  setSelectedInd(index);
                  getSelectedData([item])
                }
              }}
            >
              <View style={{
                height: Dimensions.get("screen").width * 0.2,
                width: Dimensions.get("screen").width * 0.2,

                // backgroundColor:"pink"
              }}>
                <ImageBackground
                  source={{ uri: item.img }}
                  style={{ flex: 1, }}
                  borderRadius={8}
                >
                  <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, }} >
                      <View style={{
                        backgroundColor: "#61876E",
                        padding: 4,
                        alignSelf: "flex-start",
                        borderRadius: 8,
                        borderBottomLeftRadius: 0,
                      }}>
                        <Text style={{ fontWeight: '700', fontSize: 12, color: (item.action == "-") ? "red" : (item.action == null) ? "yellow" : "#fff" }}>Rs.{item?.price}</Text>
                      </View>
                    </View>
                    <View style={{
                      flex: 0.5, backgroundColor: "#00000088",
                      borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <Text style={{ fontWeight: "700", color: "#fff", fontSize: 12, }}>{item.name}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
        }

      </View>
    )
  }

  return (
    <View style={{ paddingTop: 8, }}>
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

      <View style={{ margin: 8, marginTop: 10, }}>
        <View style={{
          flexDirection: "row"
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <View style={[{ backgroundColor: "red", marginHorizontal: 4, }, styles.status_style]} />
            <Text>Minus Price</Text>
          </View>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <View style={[{ backgroundColor: "yellow", marginHorizontal: 4, }, styles.status_style]} />
            <Text>No Price</Text>
          </View>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <View style={[{ backgroundColor: "#fff", marginHorizontal: 4, }, styles.status_style]} />
            <Text>Add Price</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SNIPComponentSelector

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