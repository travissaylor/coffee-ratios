import React, { useContext, useEffect } from 'react';
import { StyleSheet, TextInput, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';

//@ts-ignore
import { ThemeContext } from '../ThemeContext';
import { Unit } from '../../types/types';

interface QuanityInputProps {
    unit: Unit
    keyboardType: "decimal-pad" | "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search" | undefined
    style: any
    maxLength: number
    defaultValue: string
    onChangeText: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void
}
const QuantityInput: React.FC<QuanityInputProps> = ({unit, keyboardType, style, maxLength, defaultValue, onChangeText}) => {
    const themeCtx = useContext(ThemeContext);
    const { colors } : any = themeCtx;

    const defaults = {
        maxLength: (unit == 'g') ? 5 : 4,
        keyboardType: 'decimal-pad'
    }

    return (
        <TextInput
            style={{...styles.largeText, color: colors.largeInput, ...style}}
            defaultValue={defaultValue}
            keyboardType={(keyboardType) ? keyboardType : 'decimal-pad'}
            onEndEditing={onChangeText}
            maxLength={(maxLength) ? maxLength : (unit == 'g') ? 5 : 4}
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