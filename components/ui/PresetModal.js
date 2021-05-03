import React, { useContext } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import Brew from "../Brew";
import Coffee from "../Coffee";
import QuantityContextProvider from "../QuantityContext";
import Ratio from "../Ratio";
import Water from "../Water";
import { ThemeContext } from "../ThemeContext";
import PresetSaveHandler from "../PresetSaveHandler";
import { useEffect, useState } from "react/cjs/react.development";
const PresetModal = ({ isOpen, index, saving, success, error, closeHandler, saveHandler, initialValues }) => {
    const ThemeCtx = useContext(ThemeContext);
    const { colors, theme } = ThemeCtx;
    const [name, setName] = useState();

    useEffect(() => {
        if (initialValues && initialValues.name) {
            setName(initialValues.name);
        } else {
            setName("");
        }
    }, [initialValues]);

    const updateName = (newText) => {
        setName(newText);
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={isOpen}
                presentationStyle="pageSheet"
            >
                <View style={{flexDirection: "column"}}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={closeHandler}
                            title="Close"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <TextInput value={name} onChangeText={updateName} />
                        <QuantityContextProvider
                            defaultState={initialValues}
                        >
                            <Ratio />
                            <Coffee />
                            <Water />
                            <Brew />
                            <PresetSaveHandler saveHandler={saveHandler} value={{...initialValues, name: name}} index={index} saving={saving} success={success} error={error} />
                        </QuantityContextProvider>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
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
    buttonContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    contentContainer: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    }
});

export default PresetModal;
