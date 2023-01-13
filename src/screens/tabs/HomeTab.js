import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { DB_ITEMS, DB_USER } from "@env"
import { AppAssets } from '../../assets/appAssets';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '../../constants/storageKeys';
import { navString } from '../../constants/navStrings';

const HomeTab = () => {
  const [all_items, setAllItems] = useState([])
  const [cart_count, setCart_count] = useState(0);

  const isFocused = useIsFocused()

  let nav = useNavigation();
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

  useEffect(() => {
    nav.setOptions({
      headerRight: () => <CartCounts />
    })
    getUserCartCount();
  }, [cart_count, isFocused])

  async function onAddToCart(item, index) {

    await AsyncStorage.getItem(storageKeys.useruuid, (err, res) => {
      if (res) {
        firestore()
          .collection(DB_USER)
          .doc(res)
          .get()
          .then(userdata => {
            if (userdata.exists) {
              console.log("user data => \n", userdata.data());
              let cart_items = userdata.data().cart;
              if (cart_items.length > 0) {
                let itemHas = false
                cart_items.map((ele, item_index) => {
                  if (ele.id == item.id) {
                    itemHas = true
                    ele.data.qty += 1;
                  }
                })
                if (itemHas) {

                } else {
                  cart_items.push(item)
                }
              } else {
                cart_items.push(item)
              }
              console.log("car tvalue \n", cart_items);
              firestore()
                .collection(DB_USER)
                .doc(res)
                .update({
                  cart: cart_items,
                })
              getUserCartCount();
            }
          })
      }
    })
  }

  const getUserCartCount = async () => {
    await AsyncStorage.getItem(storageKeys.useruuid, async (err, res) => {
      if (res) {
        // res = JSON.parse(res);
        console.log(res);
        let cart_len = await firestore()
          .collection(DB_USER)
          .doc(res)
          .get()
          .then(userdata => {
            if (userdata.exists) {
              // console.log(userdata.data());
              console.log("cart len =>", userdata.data().cart.length);
              return userdata._data.cart.length;
            }
          })
        console.log("cart_len =>", cart_len);
        setCart_count(cart_len);
      } else {
        console.log("uuid is not set");
        setCart_count(0)
      }
    })
  }

  const CartCounts = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          nav.push(navString.Cart)
        }}
      >
        <Image source={AppAssets.CartIcon} style={{
          height: 24,
          width: 24
        }} />
        <View style={styles.cart_count_container}>
          <Text style={{ fontWeight: "bold", fontSize: 10, color: "#fff" }}>{cart_count}</Text>
        </View>
      </TouchableOpacity>
    )
  }, [cart_count])

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

        <TouchableOpacity style={styles.home_addtocart_btn}
          onPress={() => {
            onAddToCart(item, index);
          }}
        >
          <Text style={{ fontWeight: "600", color: "#fff" }}>Add to Cart</Text>
        </TouchableOpacity>
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
        contentContainerStyle={{ padding: 15, paddingBottom:80, }}
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
  cart_count_container: {
    position: "absolute",
    height: 18,
    width: 18,
    borderRadius: 8,
    backgroundColor: "#61876E",
    justifyContent: "center",
    alignItems: "center",
    top: -5, right: -4
  },
  home_addtocart_btn: {
    position: "absolute",
    bottom: 10, right: 10,
    height: 40,
    width: 100,
    backgroundColor: "#3C6255",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
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
    fontWeight: "400",
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