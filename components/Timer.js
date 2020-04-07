import React, { useState, useEffect } from 'react';

import { View, Text, Modal, StyleSheet, Button } from 'react-native';

const formatNumber = number => `0${number}`.slice(-2);

const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return { min: formatNumber(min), sec: formatNumber(sec) };
}

const Timer = ({visible, cancelAction}) => {

    const [secs, setSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { min, sec } = formatTime(secs);

    useEffect(() => {
        let interval = null;
        if (isActive) {
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

    return(
        <Modal visible={visible} animationType="slide">
            <View style={styles.timerContainer}>
                <Text style={styles.headingText}>Timer</Text>
                <Text  style={styles.largeText}>{`${min}:${sec}`}</Text>
                <View style={styles.buttonContainer}>
                    <Button title={isActive ? "Stop" : "Start"} style={styles.button} onPress={toggle}/>
                    <Button title="Reset" style={styles.button} onPress={reset}/>
                </View>
                <Button title="Exit Timer" onPress={cancelAction} style={styles.button} color="red"/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    timerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeText: {
        paddingVertical: 10,
        fontSize: 50,
    },
    headingText: {
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        paddingVertical: 10,
        width: '40%',
    },
    buttonContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '60%'
    }
});

export default Timer;