import React, { useContext, useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native-gesture-handler";
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ThemeContext } from "../components/ThemeContext";
import QuantityContextProvider from "../components/QuantityContext";
import HelpQuantity from "../components/HelpQuantity";
import Swipeable from "react-native-gesture-handler/Swipeable";

const PresetItem = ({
    name,
    ratio,
    grounds,
    water,
    brewedCoffee,
    groundsUnit,
    waterUnit,
    brewedCoffeeUnit,
    locked,
    style,
    onPress,
}) => {
    const brewUnitConversion = (brew, unit) => {
        if (unit === "g") {
            return brew;
        }

        return brew / 28.35;
    };

    const convertedBrew = brewUnitConversion(brewedCoffee, brewedCoffeeUnit);
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{ ...styles.largeText, ...style, marginBottom: 0 }}>
                {name}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ ...styles.bodyText, ...style }}>{ratio}:1</Text>
                <Text style={{ ...styles.bodyText, ...style }}>
                    {convertedBrew}
                    {brewedCoffeeUnit}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const EditAction = () => {
    return (
        <View>
            <Text
                onPress={() => console.log("Edit")}
                style={{ ...styles.largeText, marginBottom: 0 }}>
                Edit
            </Text>
        </View>
    );
};

const DeleteAction = () => {
    return (
        <View>
            <Text
                onPress={() => console.log("Delete")}
                style={{ ...styles.largeText, marginBottom: 0 }}>
                Delete
            </Text>
        </View>
    );
};

const PresetScreen = (props) => {
    const stubData = [
        {
            key: "0",
            name: "Single Aeropress",
            ratio: 16,
            grounds: 16.2,
            water: 241.9,
            brewedCoffee: 226.8,
            groundsUnit: "g",
            waterUnit: "g",
            brewedCoffeeUnit: "oz",
            locked: "ratio",
        },
        {
            key: "1",
            name: "Chemex for 2",
            ratio: 16,
            grounds: 32.4,
            water: 483.8,
            brewedCoffee: 453.6,
            groundsUnit: "g",
            waterUnit: "g",
            brewedCoffeeUnit: "oz",
            locked: "brew",
        },
    ];

    const ThemeCtx = useContext(ThemeContext);
    const { colors, theme } = ThemeCtx;

    const [presetData, setPresetData] = useState([]);

    useEffect(() => {
        setPresetData(stubData);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    ...styles.container,
                    backgroundColor: colors.screenBackground,
                }}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                bounces={false}
                extraScrollHeight={20}>
                <View>
                    <Text
                        style={{
                            ...styles.largeText,
                            color: colors.unitPrimary,
                        }}>
                        Presets
                    </Text>
                    <Text
                        style={{
                            ...styles.bodyText,
                            color: colors.unitPrimary,
                        }}>
                        Easily create and choose preset brew values so that you
                        can get your coffee even faster.
                    </Text>
                    <View style={styles.moduleContainer}>
                        <FlatList
                            data={stubData}
                            renderItem={({ item }) => (
                                <Swipeable 
                                    renderLeftActions={EditAction}
                                    renderRightActions={DeleteAction}
                                >
                                    <PresetItem
                                        onPress={() =>
                                            console.log("name: ", item.name)
                                        }
                                        style={{ marginHorizontal: 10 }}
                                        {...item}
                                    />
                                </Swipeable>
                            )}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
};

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
    largeText: {
        fontSize: 30,
        textAlign: "center",
        marginHorizontal: 10,
        marginVertical: 15,
        fontFamily: "montserrat-light",
    },
    bodyText: {
        fontSize: 16,
        marginHorizontal: "7%",
        marginVertical: 10,
    },
});

export default PresetScreen;
