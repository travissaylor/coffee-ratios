import React, { useContext, useState, useEffect } from "react"
import QuantityContextProvider, {
    QuantityContext,
} from "../components/QuantityContext"
import { Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const SaveHandler = (props) => {
    const quantityCtx = useContext(QuantityContext)

    const setDefaultData = async (storageKey, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)
        } catch (e) {
            console.error(e)
        }

        console.log("Done.")
    }

    const saveHandler = () => {
        // console.log(JSON.stringify(quantityCtx.fullState));
        setDefaultData("default_values", quantityCtx.fullState);
    }

    return (
        <Button title="Save" onPress={saveHandler} color={props.color} />
    )
}

export default SaveHandler;