import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateShower from './DateShower'

interface OrderListCardProps {
    orderItemsList: Array | undefined,
    date: String | undefined,
    orderId: String | undefined,
    status: "Delivered" | "In Progress",
    paymentType: "COD" | "Online",
    orderPrice: String | Number | undefined,
}

const OrderListCard = (props: OrderListCardProps) => {

    const { date, orderId, orderItemsList, orderPrice, paymentType, status, } = props;

    const renderOrderItems = ({ item, index }) => {
        return (
            <View style={styles.ord_sub_item_container}>
                {/* <View style={styles.ord_sub_item_image}> */}
                    <Image source={{uri: item?.data?.imgeurl}} style={styles.ord_sub_item_image}/>
                {/* </View> */}
                <View style={{ paddingLeft: 10, flex: 1, paddingVertical: 5, }}>
                    <View><Text style={{ fontWeight: "600", color: "#000", fontSize: 16 }}>{item?.data?.name || "------"}</Text></View>
                    <View style={{ flex: 1, }} />
                    <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", color: "green", fontSize: 14 }}>Price : {item?.data?.price || "0000"}</Text>
                        <Text style={{ fontWeight: "500", color: "#000", fontSize: 12 }}>Order Qty : {item?.data?.qty || "0"}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ marginVertical: 8, }}>
            <DateShower date={date} />
            <View style={styles.ord_item_show_main_container}>
                <View style={styles.ord_item_top_container}>
                    <Text style={styles.ord_item_order_text}>#{orderId || "----"}</Text>
                    <View style={styles.ord_item_status_container}>
                        <Text style={{ color: "#fff", fontWeight: "700" }}>{status || "----"}</Text>
                    </View>
                    <Text style={{ fontWeight: "600", color: "green", fontSize: 18 }}>{orderPrice || "000"}</Text>
                </View>

                <View style={styles.hr_line} />

                <View style={{
                    marginTop: 8,
                }}>
                    <FlatList
                        data={orderItemsList}
                        renderItem={renderOrderItems}
                    />
                </View>
            </View>
        </View>
    )
}

export default OrderListCard

const styles = StyleSheet.create({
    hr_line: {
        height: 2, backgroundColor: "#00000033",
        width: "100%", alignSelf: "center",
        marginVertical: 8,
    },
    ord_item_order_text: {
        fontWeight: "600",
        color: "#00000055", fontSize: 14,
    },
    ord_item_show_main_container: {
        marginTop: 16,
        display: "flex",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        width: "95%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    ord_item_status_container: {
        height: 25,
        width: "30%",
        borderRadius: 15,
        backgroundColor: "#0081C9",
        justifyContent: "center",
        alignItems: "center",
    },
    ord_item_top_container: {
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center",
    },
    ord_sub_item_container: {
        marginVertical: 8, flexDirection: "row",
        height: 80,
        width: "100%",
    },
    ord_sub_item_image:{
        width: 90,
        backgroundColor: "#00000033",
        borderRadius: 5,
    },
})