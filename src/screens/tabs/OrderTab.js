import { DB_USER, DB_ORDERS } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import OrderListCard from '../../components/OrderListCard';
import { storageKeys } from '../../constants/storageKeys';

const OrderTab = () => {

  const navigation = useNavigation();

  const [ordersLsit, setOrdersList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null
    })
    getOrderList()
  }, [])

  async function getOrderList() {
      let userId = await AsyncStorage.getItem(storageKeys.useruuid)
      if(userId){
        // firestore()
        // .collection(DB_ORDERS)
        // .get()
        // .then(querySnapshot => {
        //   // let order_list = ord._data;
        //   console.log("order_list => ", querySnapshot);
        //   // setOrdersList(order_list)
        // })
        firestore()
        .collection(DB_ORDERS)
        .where("userId", "==", userId)
        .get()
        .then(user_Data => {
          console.log("order_list => ", user_Data.docs);
          let temp_arry = [];
          user_Data.docs.map((el) => {
            temp_arry.push(el._data)
          })
          setOrdersList(temp_arry)
        })
      }
  }

  const renderOrderItems = ({ item, index }) => {
    // console.log(item);
    return (
      <OrderListCard
        orderItemsList={item?.oitems || [{}]}
        orderId={item?.oid.substring(1,8) || null}
        orderPrice={item?.orderTotal || null}
        status={item?.status === "success"? 'In Progress' : null}
        date={item?.odate || null}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>

      <FlatList
        data={ordersLsit}
        renderItem={renderOrderItems}
        contentContainerStyle={{
          paddingBottom:70,
        }}
      />
    </View>
  )
}

export default OrderTab

const styles = StyleSheet.create({})