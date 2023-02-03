import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppAssets } from '../assets/appAssets';
import CloseComponent from '../components/CloseComponent';
import { options } from '../utils/commanStrings';

interface ModuleSelectorComponentProps {
    onSelectedIndex: void | Function | undefined,
    propOption?: Array | undefined,
    optionsContainerStyle?: ViewStyle | undefined,
    selectorContianerStyle?: ViewStyle,
    seletorLabel?: String | undefined,
    label?: String | undefined,
    isLabelVisiable?: Boolean | undefined,
    isTowComponent?: true | false,
    isMultipeChosser?: Boolean | String | undefined,
}

const ModuleSelectorComponent = (props: ModuleSelectorComponentProps) => {

    const { onSelectedIndex, optionsContainerStyle, propOption, selectorContianerStyle,
        isLabelVisiable, label, seletorLabel, isTowComponent = false, isMultipeChosser = false } = props;


    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [openSelector, setOpenSelector] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState([])


    const renderOptionItems = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                height: 80,
                padding: 10,
                justifyContent: "center",
            }}
                onPress={() => {
                    setSelectedItemIndex(index)
                    setOpenSelector(false);
                    onSelectedIndex(index, item);
                }}
            >
                {isTowComponent ?
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={[{
                            fontWeight: "600",
                            fontSize: 14,
                        }, {
                            color: selectedItemIndex == index ? "tomato" : "#000",
                        }]}>{item.name}</Text>
                        <Text style={[{
                            fontWeight: "600",
                            fontSize: 14,
                        }, {
                            color: selectedItemIndex == index ? "tomato" : "#000",
                        }]}>Rs. {item?.price || 0}</Text>
                    </View>
                    :
                    <Text style={[{
                        fontWeight: "600",
                        fontSize: 14,
                    }, {
                        color: selectedItemIndex == index ? "tomato" : "#000",
                    }]}>{item.name}</Text>
                }
            </TouchableOpacity>
        )
    }



    return (
        <>
            <View style={styles.main_container}>
                {isLabelVisiable ?
                    <Text style={styles.heading_text}>{label || " "}</Text>
                    : null}
                <TouchableOpacity style={selectorContianerStyle || styles.select_item_contaienr}
                    onPress={() => {
                        setOpenSelector(true);
                    }}
                >
                    <Text style={styles.selecte_text}>{(propOption) ? propOption[selectedItemIndex]?.name || seletorLabel : options[selectedItemIndex]?.name || seletorLabel || " "}</Text>
                    <View style={styles.down_arrow_container}>
                        <Image source={AppAssets.DownIcon} style={{ height: 20, width: 20, }} />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                visible={openSelector}
                transparent
                animationType='fade'
            >
                <View style={styles.outer_modal_container}>
                    {isMultipeChosser ?
                        <View style={styles.mul_cho_main_contianer}>
                            <CloseComponent setIsPress={setOpenSelector} />
                            <View style={styles.mul_sub_container}>
                                <View style={styles.mul_opt_container}>
                                    {(propOption) ?
                                        <ScrollView
                                            contentContainerStyle={{ paddingBottom: 20, flexDirection: "row", flexWrap: "wrap" }}
                                        >
                                            {propOption.map((ele, index) => {
                                                return (
                                                    <TouchableOpacity style={{
                                                        padding: 8, borderRadius: 20,
                                                        backgroundColor: (selectedOptionIndex == index) ? "tomato" : "#00000033", margin: 5,
                                                    }}
                                                        onPress={() => {
                                                            if (selectedOptionIndex.length > 0) {
                                                                setSelectedOptionIndex([...selectedOptionIndex, index])
                                                            } else {

                                                                setSelectedOptionIndex(index)
                                                            }
                                                        }}
                                                    >
                                                        <Text style={{
                                                            fontWeight: "600",
                                                            color: selectedOptionIndex.find() ? "#fff" : "#000",
                                                        }}>{ele.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </ScrollView>

                                        : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text>Sorry Option not load</Text>
                                        </View>}
                                </View>

                                <TouchableOpacity style={styles.mul_cho_btn_container}
                                    onPress={() => {
                                        // console.log("list => ", listOfChosse);
                                    }}
                                >
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "#000",
                                        fontSize: 14,
                                    }}>Save Chosse</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :

                        <View style={optionsContainerStyle || styles.select_container}>
                            <View style={{ flex: 1, }}>
                                <FlatList
                                    data={propOption || options}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={renderOptionItems}
                                    ItemSeparatorComponent={() => (
                                        <View style={{ height: 3, backgroundColor: "#00000033" }} />
                                    )}
                                />
                            </View>
                        </View>
                    }
                </View>
            </Modal>
        </>
    )
}

export default ModuleSelectorComponent

const styles = StyleSheet.create({
    down_arrow_container: {
        // width: "15%",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"pink"
    },
    heading_text: {
        fontWeight: "600",
        fontSize: 14,
        color: "#000"
    },
    main_container: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    mul_cho_btn_container: {
        height: 35,
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 17,
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowOffset: { height: 0, width: 0 },
        backgroundColor: "#61876E"
    },
    mul_cho_main_contianer: {
        height: "25%",
        width: '75%',
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    mul_opt_container: {
        flexDirection: "row",
        alignItems: "center",
        // maxWidth: 200,
        // width:100,
        flexWrap: "wrap",
        padding: 5,
        flex: 1,
    },
    mul_sub_container: {
        marginTop: 16,
        padding: 5,
        flex: 1,
    },
    outer_modal_container: {
        flex: 1,
        backgroundColor: "#00000044",
        justifyContent: "center",
        alignItems: "center",
    },
    select_container: {
        height: "20%",
        width: '75%',
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    select_item_contaienr: {
        marginTop: 8,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowRadius: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
    },
    selecte_text: {
        flex: 1,
        fontWeight: "600",
        fontSize: 12,
        color: "#000",
    }
})