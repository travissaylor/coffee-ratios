import React, { useContext, useState, useEffect } from "react"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    Button,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import AsyncStorage from "@react-native-community/async-storage"

import { ThemeContext } from "../components/ThemeContext"
import QuantityInput from "../components/ui/QuantityInput"
import IncrementButton from "../components/ui/IncrementButton"
import DecrementButton from "../components/ui/DecrementButton"
import Card, { BaseCard, StandardCard } from "../components/ui/Card"
import Ratio from "../components/Ratio"
import RatioStrength from "../components/ui/RatioStrength"
import Unit from "../components/ui/Unit"
import QuantityTitle from "../components/ui/QuantityTitle"
import QuantityContextProvider, {
    QuantityContext,
} from "../components/QuantityContext"
import Coffee from "../components/Coffee"
import Water from "../components/Water"
import Brew from "../components/Brew"
import SaveHandler from "../components/SaveHandler"

const SettingScreen = (props) => {
    const themeCtx = useContext(ThemeContext)
    const quantityCtx = useContext(QuantityContext)
    const { colors, theme } = themeCtx

    const [defaults, setDefaults] = useState();


    useEffect(() => {
        const getDefaults = async () => {
            const defaultVals = await getDefaultData("default_values")
            if (defaultVals != null) {
                // console.log(JSON.parse(defaultState));
                // quantityCtx.setStateObject(JSON.parse(defaultState))
                setDefaults(JSON.parse(defaultVals));
            }
        }
        getDefaults()
    }, [])

    const getDefaultData = async (storageKey) => {
        try {
            return await AsyncStorage.getItem(storageKey)
        } catch (e) {
            console.error(e)
        }
    }

    console.log(defaults);

    if(!defaults) {
        return <View>
            <Text>Loading...</Text>
        </View>
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
                barStyle={theme == "dark" ? "light-content" : "dark-content"}
            />
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <QuantityContextProvider defaultState={defaults}>
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
                            Set your desired startup values so you can quickly
                            jump into your typical brewing workflow
                        </Text>
                    </View>
                    <View style={styles.moduleContainer}>
                        <Ratio />
                        <Coffee />
                        <Water />
                        <Brew />
                    </View>
                    <View style={styles.moduleContainer}>
                        <SaveHandler color={colors.largeInput} />
                    </View>
                    <View style={{ paddingBottom: 100 }}></View>
                </QuantityContextProvider>
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
