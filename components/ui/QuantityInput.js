import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { ThemeContext } from '../ThemeContext';

const QuantityInput = (props) => {
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const { unit } = props;

    const defaults = {
        maxLength: (unit == 'g') ? 5 : 4,
        keyboardType: 'decimal-pad'
    }

    return (
        <TextInput
            style={{...styles.largeText, color: colors.largeInput, ...props.style}}
            defaultValue={props.defaultValue}
            keyboardType={(props.keyboardType) ? props.keyboardType : defaults.keyboardType}
            onEndEditing={props.onChangeText}
            maxLength={(props.maxLength) ? props.maxLength : defaults.maxLength}
        />
    );
}

const styles = StyleSheet.create({
    largeText: {
        fontSize: 50,
        textAlign: 'center',
        marginHorizontal: 30,
        fontFamily: 'montserrat-light',
    }
});

export default QuantityInput;