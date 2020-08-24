import React, { useState, useEffect, useContext } from 'react';

import { View, Text, Modal, StyleSheet, Button, Platform } from 'react-native';
import { ThemeContext } from './ThemeContext';

const formatNumber = number => `0${number}`.slice(-2);

const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return { min: formatNumber(min), sec: formatNumber(sec) };
}

const Timer = ({ visible, cancelAction }) => {

    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const [secs, setSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { min, sec } = formatTime(secs);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            if (secs >= 3600) {
                reset();
            }
            interval = setInterval(() => {
                setSecs(secs => secs + 1);
            }, 1000);
        } else if (!isActive && secs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, secs]);

    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
        setSecs(0);
        setIsActive(false);
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={{ ...styles.timerContainer, backgroundColor: colors.screenBackground }}>
                <View style={{ justifyContent: 'center', flex: 1, width: '100%' }}>
                    <Text style={{ ...styles.largeText, color: colors.unitPrimary }}>{`${min}:${sec}`}</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title={isActive ? "Stop" : "Start"} color={isActive ? colors.buttonPrimary : colors.buttonSecondary} onPress={toggle} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Reset" color={(Platform.OS === 'ios') ? colors.labelPrimary : colors.androidButtonDefault} onPress={reset} />
                        </View>
                    </View>
                    <View style={styles.exitContainer}>
                        <Button title="Close Timer" onPress={cancelAction} color={colors.buttonPrimary} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    largeText: {
        fontSize: 70,
        textAlign: 'center',
        marginHorizontal: 30,
        fontFamily: 'montserrat-light',
        // fontWeight: '100'
    },
    headingText: {
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 20,
        width: '20%'

    },
    buttonContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitContainer: {
        marginTop: 50,
        alignItems: 'center',
    }
});

export default Timer;