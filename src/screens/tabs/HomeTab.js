import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { DB_ITEMS } from "@env"
import { AppAssets } from '../../assets/appAssets';

const HomeTab = () => {

  const [all_items, setAllItems] = useState([])

  useEffect(() => {
    firestore()
      .collection(DB_ITEMS)
      .get()
      .then(querySnapshot => {
        console.log('Total item: ', querySnapshot.size);
        let temp_arr = []
        querySnapshot.forEach(documentSnapshot => {
          // console.log('items data: ', documentSnapshot.id, documentSnapshot.data());
          temp_arr.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
        });
        setAllItems(temp_arr)
      });
  }, [])

  const renderItemAll = ({ item, index }) => {
    return (
      <View style={styles.home_item_single_container}>
        <Image source={{ uri: item.data.imgeurl }} style={styles.home_item_image} />

        <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
          <View style={styles.home_item_datails}>
            <View style={{ flex: 1, }}>
              <Text style={styles.home_item_name_style} numberOfLines={2} >{item.data.name}</Text>
              <Text style={styles.home_item_discription_style} numberOfLines={1} >{item.data.discription}</Text>
            </View>
            <View style={styles.home_item_price_contianer}>
              <Text style={styles.home_item_price_text_style}>Rs.{item.data.price}</Text>
              <Text style={styles.home_item_discount_price_style}>{item.data.discountprice}</Text>
            </View>
          </View>

          <View style={styles.home_item_wishes_container}>
            <TouchableOpacity>
              <Image source={AppAssets.WishIcon} style={{ height: 25, width: 25, }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.home_container}>
      {/* <Text>HomeTab</Text> */}
      <FlatList
        data={all_items}
        renderItem={renderItemAll}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        // ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => {
          return (
            <View style={{ height: 15, }} />
          )
        }}

      />
    </View>
  )
}

export default HomeTab

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
  },
  home_item_datails: {
    width: "85%",
    paddingLeft: 10,
  },
  home_item_discount_price_style: {
    fontWeight: "700",
    fontSize: 20,
    color: "gray",
    marginLeft: 5,
    textDecorationLine: "line-through"
  },
  home_item_discription_style: {
    ontWeight: "400",
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  home_item_image: {
    width: 90,
    borderRadius: 5,
  },
  home_item_name_style: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
  },
  home_item_price_contianer: {
    flexDirection: "row",
  },
  home_item_price_text_style: {
    fontWeight: "700",
    fontSize: 20,
    color: "green",
  },
  home_item_single_container: {
    height: 110,
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    elevation: 4,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 5,
  },
  home_item_wishes_container: {
    flex: 1, alignItems: "center", paddingVertical: 5,
  }
})