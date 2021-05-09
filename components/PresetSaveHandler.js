import React, { useContext, useState, useEffect } from "react"
import { Button, View, Text, ActivityIndicator } from "react-native";

import { QuantityContext } from "../components/QuantityContext"
import usePreferenceSaver from "./hooks/usePreferenceSaver";
import { ThemeContext } from "./ThemeContext";

const PresetSaveHandler = ({ saveHandler, nonQuantityValues, saving, success, error, modalError, index }) => {
    const quantityCtx = useContext(QuantityContext);
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const color = success ? colors.buttonSecondary : colors.buttonPrimary;

    let buttonTitle = "Save Settings";

    if(success) {
        buttonTitle = "Save Successful";
    }

    if(error || modalError) {
        buttonTitle = "Error Saving Preferences";
    }

    const onSave = () => {
        saveHandler({...quantityCtx.fullState, ...nonQuantityValues}, index);
    }

    return (
        <View style={{padding: 30}}>
            <View style={{alignSelf: 'center'}}>
                <Button title={buttonTitle} onPress={onSave} color={color} />
            </View>

            <View style={{paddingHorizontal: 30, marginTop: 10}}>
                { success &&
                    <Text style={{color: color, textAlign: 'center'}}>Your Changes Have been Saved Succesfully</Text>
                }
                { error && !modalError &&
                    <Text style={{color: color, textAlign: 'center'}}>There was a problem saving your preferences. Please try again.</Text>
                }
                { modalError &&
                    <Text style={{color: color, textAlign: 'center'}}>{modalError}</Text>
                }
                <ActivityIndicator animating={saving} color={colors.buttonPrimary} size="large" />
            </View>
        </View>
    )
}

export default PresetSaveHandler;