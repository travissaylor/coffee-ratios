import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemeContext } from "../components/ThemeContext";
import Swipeable from "react-native-gesture-handler/Swipeable";
import PresetItem from "../components/PresetItem";
import PresetModal from "../components/ui/PresetModal";
import usePreferenceSaver from "../components/hooks/usePreferenceSaver";
import usePreferences from "../components/hooks/usePreferences";

const EditAction = ({ item, index, onEdit, colors }) => {
    return (
        <TouchableOpacity
            onPress={() => onEdit(item, index)}
            style={{
                backgroundColor: colors.buttonSecondary,
                justifyContent: "center",
                alignItems: "center",
                flex: 0.25,
            }}>
            <Text
                style={{
                    ...styles.largeText,
                    color: colors.locked.labelPrimary,
                }}>
                <Feather
                    name="edit"
                    size={32}
                    color={colors.locked.labelPrimary}
                />
            </Text>
        </TouchableOpacity>
    );
};

const DeleteAction = ({ item, index, onDelete, colors }) => {
    return (
        <TouchableOpacity
            onPress={() => onDelete(index)}
            style={{
                backgroundColor: colors.buttonPrimary,
                justifyContent: "center",
                alignItems: "center",
                flex: 0.25,
            }}>
            <Text
                style={{
                    ...styles.largeText,
                    color: colors.locked.labelPrimary,
                }}>
                <Feather
                    name="delete"
                    size={32}
                    color={colors.locked.labelPrimary}
                />
            </Text>
        </TouchableOpacity>
    );
};

const PresetScreen = ({ navigation }) => {
    const initialPresets = [
        {
            key: "0",
            name: "Swipe Left to Edit",
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
            name: "Swipe Right to Delete",
            ratio: 16,
            grounds: 32.4,
            water: 483.8,
            brewedCoffee: 453.6,
            groundsUnit: "g",
            waterUnit: "g",
            brewedCoffeeUnit: "oz",
            locked: "brew",
        },
        {
            key: "2",
            name: "Tap to Use",
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

    const [presetData, setPresetData] = useState([]);
    const [currentPreset, setCurrentPreset] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (defaultPresets.preferences) {
            const parsedPresets = JSON.parse(defaultPresets.preferences);
            setPresetData(
                parsedPresets.length !== 0 ? parsedPresets : initialPresets
            );
        } else {
            setPresetData(initialPresets);
        }
    }, [defaultPresets.preferences]);

    useEffect(() => {
        const res = preferenceSaver.saveSingleItem(
            "@Coffio_preset_items",
            JSON.stringify(presetData)
        );
        if (res) {
            setIsModalOpen(false);
        }
    }, [presetData]);

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
    };

    const editItem = (item, itemIndex) => {
        setCurrentPreset(itemIndex);
        setIsModalOpen(true);
    };

    const addItem = () => {
        setCurrentPreset(null);
        setIsModalOpen(true);
    };

    const saveHandler = (item, itemIndex = null) => {
        if (itemIndex === null) {
            setPresetData((prevState) => [...prevState, item]);
        } else {
            setPresetData((prevState) => {
                prevState[itemIndex] = item;
                return [...prevState];
            });
        }
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.screenBackground,
            }}>
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
                    Easily create and choose preset brew values so that you can
                    get your coffee even faster.
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Add New Preset"
                        onPress={addItem}
                        color={colors.buttonPrimary}
                    />
                </View>
                <View style={styles.moduleContainer}>
                    <FlatList
                        data={presetData}
                        renderItem={({ item, index }) => (
                            <Swipeable
                                renderLeftActions={() => (
                                    <EditAction
                                        item={item}
                                        index={index}
                                        onEdit={() => editItem(item, index)}
                                        colors={colors}
                                    />
                                )}
                                renderRightActions={() => (
                                    <DeleteAction
                                        item={item}
                                        index={index}
                                        onDelete={deleteItemByIndex}
                                        colors={colors}
                                    />
                                )}>
                                <PresetItem
                                    onPress={() => passPresetToCalcuator(item)}
                                    style={{
                                        marginHorizontal: 10,
                                        backgroundColor:
                                            colors.screenBackground,
                                        color: colors.labelPrimary,
                                    }}
                                    {...item}
                                />
                            </Swipeable>
                        )}
                    />
                </View>
                <PresetModal
                    isOpen={isModalOpen}
                    initialValues={
                        presetData ? presetData[currentPreset] : null
                    }
                    index={currentPreset}
                    success={preferenceSaver.success}
                    error={preferenceSaver.error}
                    saving={preferenceSaver.saving}
                    closeHandler={() => setIsModalOpen(false)}
                    saveHandler={saveHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    moduleContainer: {
        marginBottom: "150%",
        alignItems: "stretch",
        justifyContent: "center",
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
    buttonContainer: {
        marginVertical: 10,
        alignSelf: "center",
    },
});

export default PresetScreen;
