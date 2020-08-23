import React, { useContext } from "react"
import { ThemeContext } from "./ThemeContext";
import { View, StyleSheet, Button, Platform } from "react-native";


const ThemePicker = (props) => {
    const themeCtx = useContext(ThemeContext);
    const { colors, setLightTheme, setDarkTheme } = themeCtx;

    const systemThemeHandler = () => {
        props.themeChangeHandler("system");
    }

    const lightThemeHandler = () => {
        props.themeChangeHandler("light");
        setLightTheme();
    }

    const darkThemeHandler = () => {
        props.themeChangeHandler("dark");
        setDarkTheme();
    }

    const currentStyles = {
        selected: {
            ...styles.button,
            ...Platform.select({
                ios: {
                    backgroundColor: colors.locked.screenBackground,
                    color: colors.locked.largeInput,
                    borderColor: colors.largeInput,
                    borderWidth: 2
                },
                android: {
                    color: colors.largeInput,
                },
                default: {
                  // other platforms, web for example
                    color: colors.locked.largeInput,
                }
            }),
        },
        standard: {
            ...styles.button,
            ...Platform.select({
                ios: {
                    backgroundColor: colors.screenBackground,
                    color: colors.largeInput,
                    borderColor: colors.largeInput,
                    borderWidth: 2
                },
                android: {
                    color: colors.androidButtonDefault,
                },
                default: {
                  // other platforms, web for example
                    color: colors.largeInput,
                }
            }),
        }
    }

    return (
        <View>
            <View style={props.selectedTheme === "system" ? currentStyles.selected : currentStyles.standard}>
                <Button color={props.selectedTheme === "system" ? currentStyles.selected.color : currentStyles.standard.color} title="System Theme" onPress={systemThemeHandler}/>
            </View>
            <View style={props.selectedTheme === "light" ? currentStyles.selected : currentStyles.standard}>
                <Button color={props.selectedTheme === "light" ? currentStyles.selected.color : currentStyles.standard.color} title="Light Theme" onPress={lightThemeHandler}/>
            </View>
            <View style={props.selectedTheme === "dark" ? currentStyles.selected : currentStyles.standard}>
                <Button color={props.selectedTheme === "dark" ? currentStyles.selected.color : currentStyles.standard.color} title="Dark Theme" onPress={darkThemeHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        textAlign: "center",
        marginHorizontal: 10,
        marginVertical: 15,
        fontFamily: "montserrat-light",
        borderRadius: 10
    }
})

export default ThemePicker;