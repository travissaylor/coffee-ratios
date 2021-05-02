import React, { useContext, useEffect, useRef, useState } from "react";
import {
    FlatList,
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
import Swipeable from "react-native-gesture-handler/Swipeable";
import PresetItem from "../components/PresetItem";
import PresetModal from "../components/ui/PresetModal";
import usePreferenceSaver from "../components/hooks/usePreferenceSaver";
import usePreferences from "../components/hooks/usePreferences";

const EditAction = ({item, index, onEdit}) => {
    return (
        <View>
            <Text
                onPress={() => onEdit(item, index)}
                style={{ ...styles.largeText, marginBottom: 0 }}>
                Edit
            </Text>
        </View>
    );
};

const DeleteAction = ({ item, index, onDelete }) => {
    return (
        <View>
            <Text
                onPress={() => onDelete(index)}
                style={{
                    ...styles.largeText,
                    marginBottom: 0,
                    backgroundColor: "green",
                }}>
                Delete
            </Text>
        </View>
    );
};

const PresetScreen = ({ navigation }) => {
    const initialPresets = [
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

    const preferenceSaver = usePreferenceSaver();
    const defaultPresets = usePreferences("@Coffio_preset_items");

    const [presetData, setPresetData] = useState();
    const [currentPreset, setCurrentPreset] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const swipeRef = useRef(null);

    useEffect(() => {
        if (defaultPresets.preferences) {
            const parsedPresets = JSON.parse(defaultPresets.preferences);
            setPresetData(parsedPresets.length !== 0 ? parsedPresets : initialPresets);
        }
    }, [defaultPresets.preferences]);

    // @todo fix navigate bug
    const passPresetToCalcuator = (preset) => {
        navigation.push("Calculator", { ...preset });
        navigation.navigate("Calculator", { ...preset });
    };

    const deleteItemByIndex = (itemIndex) => {
        setPresetData((prevState) => {
            prevState.splice(itemIndex, 1);
            return [...prevState];
        });
        preferenceSaver.saveSingleItem("@Coffio_preset_items", JSON.stringify(presetData));
    };

    const editItem = (item, itemIndex) => {
        setCurrentPreset(itemIndex);
        setIsModalOpen(true);
    };

    const saveHandler = (item, itemIndex = null) => {
        if (itemIndex === null) {
            setPresetData((prevState) => [
                ...prevState,
                item
            ]);
        } else {
            setPresetData((prevState) => {
                prevState[itemIndex] = item
                return [
                    ...prevState
                ]
            });
        }

        setIsModalOpen(false);
        preferenceSaver.saveSingleItem("@Coffio_preset_items", JSON.stringify(presetData));
    };

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
                        {presetData && 
                            <FlatList
                                data={presetData}
                                renderItem={({ item, index }) => (
                                    <Swipeable
                                        ref={swipeRef}
                                        renderLeftActions={() => (
                                            <EditAction
                                                item={item}
                                                index={index}
                                                closeHandler={() => setIsModalOpen(false)}
                                                saveHandler={saveHandler}
                                                onEdit={() => editItem(item, index)}
                                            />
                                        )}
                                        renderRightActions={() => (
                                            <DeleteAction
                                                item={item}
                                                index={index}
                                                onDelete={deleteItemByIndex}
                                            />
                                        )}
                                    >
                                        <PresetItem
                                            onPress={() =>
                                                passPresetToCalcuator(item)
                                            }
                                            style={{
                                                marginHorizontal: 10,
                                                backgroundColor:
                                                    theme.backgroundColor,
                                            }}
                                            {...item}
                                        />
                                    </Swipeable>
                                )}
                            />
                        
                        }
                    </View>
                    <PresetModal isOpen={isModalOpen} intialValues={presetData ? presetData[currentPreset] : null} index={currentPreset} success={preferenceSaver.success} error={preferenceSaver.error} saving={preferenceSaver.saving} closeHandler={() => setIsModalOpen(false)} saveHandler={saveHandler} />
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
