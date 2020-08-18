import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeContext } from '../ThemeContext';

const RatioStrength = (props) => {
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const { ratio } = props;

    var strength = "standard";

    if(ratio < 15) {
        strength = "stronger";
    } else if(ratio >= 15 && ratio < 19) {
        strength = "standard";
    } else if(ratio >= 19) {
        strength = "weaker";
    }

    return (
        <View>
            <Text style={{...style.unitText, color: colors.unitPrimary, ...props.style}}>{strength}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    unitText: {
        fontSize: 15,
        textAlign: 'center',
    },
});

export default RatioStrength;