import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { optionsList, optionsListProducts } from '../utils/commanStrings';
import { AppAssets } from '../assets/appAssets';

const TestApp = ({ navigation }) => {

  const [selecteOption, setSelecteOptiom] = useState(null);

  const LeftComponent = () => {
    return (
      <TouchableOpacity>
        <Image source={AppAssets.ProfileIcon} style={{ height: 25, width: 25, }} />
      </TouchableOpacity>
    )
  }

  const RightComponent = () => {
    return (
      <TouchableOpacity>
        <Image source={require("../assets/menu_1.png")} style={{ height: 25, width: 25, }} />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      title: "E Food",
      headerLeft: () => <LeftComponent />,
      headerRight: () => <RightComponent />,
    }
    )
  }, [])

  const renderItemBanner = ({ item, index }) => {
    return (
      <View style={{
        width: Dimensions.get("screen").width * 0.75,
        height: 150,
        backgroundColor: "#00000022",
        borderRadius: 10,
      }}>
        <Image source={{ uri: item.imgUrl }} style={{
          resizeMode: "cover",
          flex: 1,
          borderRadius: 10,
        }} />
      </View>
    )
  }

  const renderItemDealOptions = ({ item, index }) => {
    return (
      <TouchableOpacity style={{
        width: Dimensions.get("screen").width * 0.25,
        height: 40,
        borderWidth: 0.5,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: selecteOption == index ? "#2B3A55" : null,
      }}
        onPress={() => {
          setSelecteOptiom(index)
        }}
      >
        <Text style={{ color: selecteOption == index ? "#F2E5E5" : "#2B3A55", fontWeight: "bold", fontSize: 14, }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView
      style={{ flex: 1, }}
    >
      <View style={{ flex: 1, }}>

        <ScrollView
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 24,
            // paddingHorizontal: 16,
          }}
        >
          {/* for the banners */}
          {/* <View style={{}}> */}
          <FlatList
            data={optionsList || [{}, {}, {}]}
            renderItem={renderItemBanner}
            horizontal
            ItemSeparatorComponent={() => {
              return (
                <View style={{ width: 8, }} />
              )
            }}
            contentContainerStyle={{
              paddingHorizontal: 10,
              padding: 10,
            }}
          />
          {/* </View> */}

          <Text style={{
            paddingLeft: 16,
            fontWeight: "bold",
            color: "#CE7777",
            fontSize: 18,
            marginTop: 16,
          }}>Find Your best Food.</Text>

          {/* find out best deal options */}

          <FlatList
            data={[{ name: "Combos" }, { name: "Drinks" }, { name: "Burgurs" }, { name: "Pizzaa" }]}
            renderItem={renderItemDealOptions}
            horizontal
            ItemSeparatorComponent={() => {
              return (
                <View style={{ width: 8, }} />
              )
            }}
            style={{
              marginTop: 8,
            }}
            contentContainerStyle={{
              paddingHorizontal: 10,
              padding: 10,
            }}
            showsHorizontalScrollIndicator={false}
          />
          <View style={{ height: 2, backgroundColor: "#00000022", marginHorizontal: 16, }} />

          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginTop: 16,
          }}>
            {
              optionsListProducts.map((ele, index) => {
                return (
                  <View style={{
                    width: (Dimensions.get("screen").width * 0.5) - 32,
                    backgroundColor: "#fff",
                    height: 230,
                    borderRadius: 10,
                    margin: 8,
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    shadowOffset: {
                      height: 0,
                      width: 0,
                    }
                  }} key={index}>
                    <View style={{ height: 100, }}>
                      <Image source={{ uri: ele.imgUrl }} style={{
                        flex: 1, resizeMode: "cover",
                        borderTopLeftRadius: 10, borderTopRightRadius: 10,
                      }} />
                    </View>
                    <View style={{ padding: 5, flex: 1, }}>
                      <Text style={{
                        color: "#2B3A55",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}>{ele.name}</Text>
                      <Text numberOfLines={2} style={{
                        fontWeight: "600",
                        color: "#CE7777",
                        fontSize: 11,
                        marginTop: 5,
                      }}>Our tribute to classic american taste. BK veg patty, garden fresh crispy lettuce, juicy tomato(seasonal) & our signature sauce. </Text>
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:'baseline', padding:5,}}>
                      <Text style={{
                        fontSize:16,
                        color:"#2B3A55",
                        fontWeight:"bold",
                      }}>Rs. 120/-</Text>
                      <TouchableOpacity style={{
                        padding:8,
                        backgroundColor:"#E8C4C4",
                        borderRadius:30,
                        alignItems:"center",
                        justifyContent:"center",
                        paddingHorizontal:15,
                      }}>
                        <Text style={{
                          fontWeight:"bold",
                          color:"#2B3A55"
                        }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default TestApp

const styles = StyleSheet.create({})