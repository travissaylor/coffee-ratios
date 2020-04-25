import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

import { ThemeContext } from '../components/ThemeContext';
import SmallQuantityCard from '../components/ui/SmallQuantityCard';

const formatNumber = number => `0${number}`.slice(-2);

const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return { min: formatNumber(min), sec: formatNumber(sec) };
}

const TimerScreen = (props) => {

    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;


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
        <View style={{...styles.timerContainer, backgroundColor: colors.screenBackground}}>
            <SmallQuantityCard colors={colors}/>
            <View style={{justifyContent: 'center', flex: 1}}>
                <Text style={{...styles.largeText, color: colors.unitPrimary}}>{`${min}:${sec}`}</Text>
                <View style={styles.buttonContainer}>
                    <Button title={isActive ? "Stop" : "Start"} style={styles.button} color={isActive ? colors.buttonPrimary : colors.buttonSecondary} onPress={toggle}/>
                    <Button title="Reset" style={styles.button} color={colors.labelPrimary} onPress={reset}/>
                </View>
                <View style={styles.exitContainer}>
                    <Button title="Exit Timer" onPress={() => props.navigation.goBack()} style={styles.button} color={colors.buttonPrimary}/>
                </View>
            </View>
        </View>
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
        paddingVertical: 10,

    },
    buttonContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    exitContainer: {
        marginTop: 50
    }
});

export default TimerScreen;