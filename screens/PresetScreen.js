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
import PresetItem from "../components/PresetItem";
import { StackActions } from "@react-navigation/routers";

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

const DeleteAction = ({item, index, onDelete}) => {
    return (
        <View>
            <Text
                onPress={() => onDelete(index)}
                style={{ ...styles.largeText, marginBottom: 0, backgroundColor: 'green' }}>
                Delete
            </Text>
        </View>
    );
};

const PresetScreen = ({navigation}) => {
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

    const passPresetToCalcuator = (preset) => {
        navigation.push('Calculator', { ...preset });
        navigation.navigate('Calculator', { ...preset });
    }

    const deleteItemById = (itemIndex) => {
        setPresetData((prevState) => {
            prevState.splice(itemIndex, 1);
            return [
                ...prevState
            ];
        })
    }

    const editItem = (itemIndex) => {

    }

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
                            data={presetData}
                            renderItem={({ item, index }) => (
                                <Swipeable 
                                    renderLeftActions={() => <EditAction item={item} index={index} onEdit={deleteItemById} />}
                                    renderRightActions={() => <DeleteAction item={item} index={index} onDelete={deleteItemById} />}
                                >
                                    <PresetItem
                                        onPress={() => passPresetToCalcuator(item)}
                                        style={{ marginHorizontal: 10, backgroundColor: theme.backgroundColor}}
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
