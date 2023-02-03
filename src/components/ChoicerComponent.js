import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState, useCallback} from 'react'
import { MultipleSelectList, SelectList } from "react-native-dropdown-select-list"

interface ChoicerComponentProps {
    isMultiple: Boolean | undefined,
    label?: String | undefined,
    whichNameSvae: String | undefined,
    data: Array | undefined,
    setSelected?: void | Function | undefined,
    onSelected?: void | Function | undefined,
    choice? : Array | undefined,
    setChoice? : void | Function | undefined,
    moduleInfo? : Object | Array | undefined | String,
}

const ChoicerComponent = (props: ChoicerComponentProps) => {

    const { data, isMultiple, whichNameSvae, label, onSelected, setSelected, moduleInfo } = props

    const [LData, setLData] = useState([])

    const [multipleData, setMultipleData] = useState([])
    const [singleItem, setSingleItem] = useState(null);

    useEffect(() => {
        let arr = data.reduce((per, cur) => {
            per.push({ key: cur.id, value: cur.name })
            return per;
        }, [])
        console.log("arr -> ", arr);
        setLData(arr)
        // sendReprot();
    }, [])

    const sendReprot = useCallback(() => {
        if(isMultiple){

            return setSelected(multipleData)
        } else {
            return setSelected(singleItem)
        }
    }, [multipleData, singleItem])

    return (
        <>
            {isMultiple ?
                <MultipleSelectList
                    data={LData}
                    save={whichNameSvae}
                    setSelected={(e) => {
                        setMultipleData(e)
                    }}
                    onSelect={(it) => {
                        // console.log("selecte item" , multipleData);
                        sendReprot()
                    }}
                    label={label}
                />
                :

                <SelectList
                    data={LData}
                    setSelected={(e) => {
                        setSingleItem(e)
                    }}
                    save={whichNameSvae}
                    onSelect={() => {
                        sendReprot()
                    }}
                />
            }
        </>
    )
    
}

export default ChoicerComponent

const styles = StyleSheet.create({})