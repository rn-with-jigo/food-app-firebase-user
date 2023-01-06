import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface DateShowerProps {
    date: String | undefined,
}

const DateShower = (props: DateShowerProps) => {

    const { date } = props;

    return (
        <View style={styles.date_main_container}>
            <View style={styles.date_left_line} />
            <Text style={{ marginHorizontal: 10, }}>{date? date : "order date"}</Text>
            <View style={styles.data_right_line} />
        </View>
    )
}

export default DateShower

const styles = StyleSheet.create({
    date_left_line: {
        flex: 1, height: 2, backgroundColor: "#00000033"
    },
    date_main_container: {
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", paddingHorizontal: 10,
    },
    data_right_line: {
        flex: 1, height: 2,
        backgroundColor: "#00000033"
    }
})