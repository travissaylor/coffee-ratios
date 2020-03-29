import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Unit = (props) => {

    const { unit } = props;

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={{...style.unitText, ...props.style}}>{(unit == 'g') ? 'grams' : 'ounces'}</Text>
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