import React, { useContext, useState, useEffect } from "react"
import { Button, View, Text, ActivityIndicator } from "react-native";

import { QuantityContext } from "../components/QuantityContext"
import usePreferenceSaver from "./hooks/usePreferenceSaver";
import { ThemeContext } from "./ThemeContext";

const SaveHandler = (props) => {
    const quantityCtx = useContext(QuantityContext);
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const preferenceSaver = usePreferenceSaver();

    const saveHandler = () => {
        preferenceSaver.saveMultipleItems([
            ["@Coffio_default_values", JSON.stringify(quantityCtx.fullState)],
            ["@Coffio_default_theme", JSON.stringify(props.selectedTheme)],
        ]);
    }

    const color = preferenceSaver.success ? colors.buttonSecondary : colors.buttonPrimary;

    let buttonTitle = "Save Settings";

    if(preferenceSaver.success) {
        buttonTitle = "Save Successful";
    }

    if(preferenceSaver.error) {
        buttonTitle = "Error Saving Preferences";
    }

    return (
        <View style={{padding: 30}}>
            <View style={{alignSelf: 'center'}}>
                <Button title={buttonTitle} onPress={saveHandler} color={color} />
            </View>

            <View style={{paddingHorizontal: 30, marginTop: 10}}>
                { preferenceSaver.success &&
                    <Text style={{color: color, textAlign: 'center'}}>You will see your changes the next time you reload the app.</Text>
                }
                { preferenceSaver.error &&
                    <Text style={{color: color, textAlign: 'center'}}>There was a problem saving your preferences. Please try again.</Text>
                }
                <ActivityIndicator animating={preferenceSaver.saving} color={colors.buttonPrimary} size="large" />
            </View>
        </View>
    )
}

export default SaveHandler;