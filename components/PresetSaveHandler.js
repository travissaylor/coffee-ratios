import React, { useContext, useState, useEffect } from "react"
import { Button, View, Text, ActivityIndicator } from "react-native";

import { QuantityContext } from "../components/QuantityContext"
import usePreferenceSaver from "./hooks/usePreferenceSaver";
import { ThemeContext } from "./ThemeContext";

const PresetSaveHandler = ({ saveHandler, value, saving, success, error, index }) => {
    const quantityCtx = useContext(QuantityContext);
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const color = success ? colors.buttonSecondary : colors.buttonPrimary;

    let buttonTitle = "Save Settings";

    if(success) {
        buttonTitle = "Save Successful";
    }

    if(error) {
        buttonTitle = "Error Saving Preferences";
    }

    const onSave = () => {
        console.log('value', value);
        console.log('index', index);
        saveHandler({...value, ...quantityCtx.fullState}, index)
    }

    return (
        <View style={{padding: 30}}>
            <View style={{alignSelf: 'center'}}>
                <Button title={buttonTitle} onPress={onSave} color={color} />
            </View>

            <View style={{paddingHorizontal: 30, marginTop: 10}}>
                { success &&
                    <Text style={{color: color, textAlign: 'center'}}>You will see your changes the next time you reload the app.</Text>
                }
                { error &&
                    <Text style={{color: color, textAlign: 'center'}}>There was a problem saving your preferences. Please try again.</Text>
                }
                <ActivityIndicator animating={saving} color={colors.buttonPrimary} size="large" />
            </View>
        </View>
    )
}

export default PresetSaveHandler;