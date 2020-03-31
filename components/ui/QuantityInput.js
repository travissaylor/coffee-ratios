import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { useTheme } from '../../constants/theme';

const QuantityInput = (props) => {
    const { colors } = useTheme();

    const { unit } = props;

    const defaults = {
        maxLength: (unit == 'g') ? 5 : 4,
        keyboardType: 'decimal-pad'
    }

    return (
        <TextInput
            style={{...styles.largeText, ...props.styles, color: colors.largeInput}}
            defaultValue={props.defaultValue}
            keyboardType={(props.keyboardType) ? props.keyboardType : defaults.keyboardType}
            onChangeText={props.onChangeText}
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
        // fontWeight: '100'
    }
});

export default QuantityInput;