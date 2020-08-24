import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../ThemeContext';

const Unit = (props) => {
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const { unit } = props;

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={{...style.unitText, color: colors.unitPrimary, ...props.style}}>{(unit == 'g') ? 'grams' : 'ounces'}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    unitText: {
        fontSize: 15,
        textAlign: 'center',
    },
});

export default Unit;