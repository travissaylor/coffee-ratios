import React, { useContext } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import Brew from "../Brew";
import Coffee from "../Coffee";
import QuantityContextProvider from "../QuantityContext";
import Ratio from "../Ratio";
import Water from "../Water";
import { ThemeContext } from "../ThemeContext";
import PresetSaveHandler from "../PresetSaveHandler";
import { useEffect, useState } from "react/cjs/react.development";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const PresetModal = ({ isOpen, index, saving, success, error, closeHandler, saveHandler, initialValues }) => {
    const ThemeCtx = useContext(ThemeContext);
    const { colors, theme } = ThemeCtx;
    const [name, setName] = useState(undefined);
    const [modalError, setModalError] = useState(false);

    useEffect(() => {
        if (initialValues && initialValues.name) {
            setName(initialValues.name);
        } else {
            setName(undefined);
        }
    }, [initialValues]);

    const updateName = (newText) => {
        setName(newText);
    }

    const onSave = (item, itemIndex = null) => {
        if (!item.name || item.name.length === 0) {
            setModalError("You must enter a title");
            setTimeout(() => {
                setModalError(false);
            }, 3000)
            return;
        }
        saveHandler(item, itemIndex);
        setName(undefined);
    }

    return (
        <View style={{...styles.container, backgroundColor: colors.screenBackground}}>
            <Modal
                animationType="slide"
                visible={isOpen}
                presentationStyle="pageSheet"
            >
                <View style={{flexDirection: "column", backgroundColor: colors.screenBackground}}>
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={closeHandler}
                            title="&#10005;"
                            color={colors.unitPrimary}
                            accessibilityLabel="Close the Preset Modal"
                        />
                    </View>
                    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={{...styles.textInputContainer, borderBottomColor: colors.unitPrimary, borderBottomWidth: 1}}>
                            <TextInput placeholder="Preset Name" value={name} style={{...styles.textInput, color: colors.unitPrimary}} onChangeText={updateName} />
                        </View>
                        <QuantityContextProvider
                            defaultState={initialValues}
                        >
                            <Ratio />
                            <Coffee />
                            <Water />
                            <Brew />
                            <PresetSaveHandler saveHandler={onSave} nonQuantityValues={{name: name}} index={index} saving={saving} success={success} error={error} modalError={modalError} />
                        </QuantityContextProvider>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginBottom: 50,
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
        margin: 10,
    },
    contentContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    textInputContainer: {
        marginHorizontal: 10,
        marginVertical: 30,
        width: '80%',
    },
    textInput: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "montserrat-light",
    }
});

export default PresetModal;
