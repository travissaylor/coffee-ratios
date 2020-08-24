import React, { useContext, useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { ThemeContext } from "../components/ThemeContext"
import Ratio from "../components/Ratio"
import QuantityContextProvider from "../components/QuantityContext"
import Coffee from "../components/Coffee"
import Water from "../components/Water"
import Brew from "../components/Brew"
import SaveHandler from "../components/SaveHandler"
import usePreferences from "../components/hooks/usePreferences"
import ThemePicker from "../components/ThemePicker"
import LoadingView from "../components/ui/LoadingView"



const ErrorView = () => (
    <View>
        <Text>There was a problem getting your data</Text>
    </View>
)

const SettingScreen = (props) => {
    const themeCtx = useContext(ThemeContext)
    const { colors, theme } = themeCtx

    const [selectedTheme, setSelectedTheme] = useState("system");

    const prefData = usePreferences('@Coffio_default_values');
    const defaultTheme = usePreferences('@Coffio_default_theme');

    useEffect(() => {
        setSelectedTheme(defaultTheme.preferences || "system");
    }, [defaultTheme.preferences])

    const themeChangeHandler = (newTheme) => {
        setSelectedTheme(newTheme);
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                ...styles.container,
                backgroundColor: colors.screenBackground,
            }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            bounces={false}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled">
            <StatusBar
                backgroundColor={
                    theme == "dark"
                        ? colors.screenBackground
                        : colors.screenBackground
                }
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
            />
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <>
                { (prefData.loading || defaultTheme.loading) &&
                    <LoadingView indicatorColor={colors.largeInput} text="Getting your settings" textStyle={{...styles.bodyText, color: colors.unitPrimary}} />
                }

                { (prefData.error || defaultTheme.error) &&
                    <ErrorView />
                }
                { !(prefData.loading || defaultTheme.loading) && !(prefData.error || defaultTheme.error) &&
                    <QuantityContextProvider defaultState={prefData.preferences}>
                        <View style={styles.moduleContainer}>
                            <Text
                                style={{
                                    ...styles.largeText,
                                    color: colors.unitPrimary,
                                }}>
                                Default Startup Values
                            </Text>
                            <Text
                                style={{
                                    ...styles.bodyText,
                                    color: colors.unitPrimary,
                                }}>
                                Set your desired startup values so you can quickly start brewing with the values you use the most
                            </Text>
                        </View>
                        <View style={styles.moduleContainer}>
                            <Ratio />
                            <Coffee />
                            <Water />
                            <Brew />
                        </View>
                        <View style={{...styles.moduleContainer, paddingTop: 20}}>
                            <Text
                                style={{
                                    ...styles.largeText,
                                    color: colors.unitPrimary,
                                }}>
                                Startup Theme Preference
                            </Text>
                            <Text
                                style={{
                                    ...styles.bodyText,
                                    color: colors.unitPrimary,
                                }}>
                                By default, Coffio will try to use your device's theme/dark mode preferences when starting the app. Here you can select a different default if you would like. You will always be able to toggle the theme with the switch in the top right of the header on each page.
                            </Text>
                        </View>
                        <View style={styles.moduleContainer}>
                            <ThemePicker selectedTheme={selectedTheme} themeChangeHandler={themeChangeHandler} />
                        </View>
                        <View style={styles.moduleContainer}>
                            <Text
                                style={{
                                    ...styles.bodyText,
                                    color: colors.unitPrimary,
                                }}>
                                * Not all devices have a native system theming/dark mode setting. If System Theme is selected as the default in these scenarios, Coffio will default to the light theme.
                            </Text>
                        </View>
                        <SaveHandler selectedTheme={selectedTheme} color={colors.largeInput} />
                        <View style={{ paddingBottom: 50 }}></View>
                    </QuantityContextProvider>
                }
                </>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
    },
    moduleContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },
    quantity: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    ratioInput: {
        marginHorizontal: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    largeText: {
        fontSize: 30,
        textAlign: "center",
        marginHorizontal: 10,
        marginVertical: 15,
        fontFamily: "montserrat-light",
    },
    largeInput: {
        fontSize: 50,
        textAlign: "center",
        marginHorizontal: 30,
        fontFamily: "montserrat-light",
    },
    labelText: {
        textAlign: "center",
        fontSize: 20,
        textTransform: "uppercase",
        marginTop: 10,
    },
    bodyText: {
        fontSize: 16,
        marginHorizontal: "7%",
        marginVertical: 10,
    },
})

export default SettingScreen
