import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

const usePreferences = (preferenceKeys) => {
    const [preferences, setPreferences] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getSavedValues = async () => {
            const values = await getData(preferenceKeys)
            if (values != null) {
                setPreferences(JSON.parse(values));
            }
            setLoading(false);
        }
        getSavedValues()
    }, [])

    const getData = async (storageKey) => {
        try {
            return await AsyncStorage.getItem(storageKey)
        } catch (e) {
            console.error(e);
            setError(true);
        }
    }

    return {
        preferences,
        loading,
        error
    }
}

export default usePreferences;