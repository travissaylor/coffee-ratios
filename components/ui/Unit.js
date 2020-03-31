import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../constants/theme';

const Unit = (props) => {

    const { colors } = useTheme();
    const { unit } = props;

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={{...style.unitText, ...props.style, color: colors.unitPrimary}}>{(unit == 'g') ? 'grams' : 'ounces'}</Text>
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