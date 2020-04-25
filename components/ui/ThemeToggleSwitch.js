import React, { useState, useContext } from "react";
import { View, Switch, StyleSheet } from "react-native";

import { ThemeContext } from '../ThemeContext';

const ThemeToggleSwitch = () => {
    const themeCtx = useContext(ThemeContext);
    const { colors, toggleTheme } = themeCtx;

    const [isEnabled, setIsEnabled] = useState((themeCtx.theme=='dark') ? true : false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        toggleTheme();
    }

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: colors.labelPrimary, true: colors.buttonPrimary }}
                thumbColor={ colors.screenBackground }
                ios_backgroundColor={ colors.labelPrimary }
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    }
});

export default ThemeToggleSwitch;
