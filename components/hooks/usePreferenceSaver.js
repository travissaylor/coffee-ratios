import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

const usePreferenceSaver = () => {
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(false);

    const successHandler = () => {
        setTimeout(() => {
            setSaving(false);
            setSuccess(true);
        }, 500);

        setTimeout(() => {
            setSuccess(false);
        }, 5000);

    }

    const errorHandler = () => {
        setTimeout(() => {
            setSaving(false);
            setError(true);
        }, 500);

        setTimeout(() => {
            setError(false);
        }, 5000);
    }

    const saveSingleItem = async (storageKey, value) => {
        setSaving(true);

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)
            successHandler();
            return true;
        } catch (e) {
            errorHandler();
            return false;
        }
    }

    const saveMultipleItems = async (keyValArray) => {
        setSaving(true);

        try {
            await AsyncStorage.multiSet(keyValArray)
            successHandler();
        } catch (e) {
            errorHandler();
        }
    }

    return {
        success,
        saving,
        error,
        saveSingleItem,
        saveMultipleItems
    }
}

export default usePreferenceSaver;