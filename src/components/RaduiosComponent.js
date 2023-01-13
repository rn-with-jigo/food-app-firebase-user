import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppAssets } from '../assets/appAssets'

interface RaduiosComponentProps {
    radioList: Array | [] | undefined,
    setSelectedIndex: Function | void,
    selectedIndex: Number | String | undefined,
}

const RaduiosComponent = (props: RaduiosComponentProps) => {

    const { radioList, selectedIndex, setSelectedIndex } = props;

    const renderItemRadios = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={{
                width: "50%"
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    onPress={() => {
                        if (setSelectedIndex) {
                            setSelectedIndex(index)
                        }
                    }}
                >
                    <Image
                        source={ selectedIndex == index ?
                                AppAssets.RadioFill :
                                AppAssets.Radio 
                        }
                        style={{ height: 25, width: 25, tintColor: "#0081C9" }} />

                    <Text style={{
                        fontWeight: "700",
                        color: "#000",
                        fontSize: 16,
                        marginLeft: 10,
                    }}>{item.option || "undefined"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{
            marginHorizontal: 20,
            marginVertical: 8,
            padding: 10,
        }}>
            <FlatList
                data={radioList || [{}, {}]}
                renderItem={renderItemRadios}
                numColumns={2}
            />
        </View>
    )
}

export default RaduiosComponent

const styles = StyleSheet.create({})