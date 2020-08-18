import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { QuantityContext } from './QuantityContext';
import { ThemeContext } from './ThemeContext';
import QuantityInput from './ui/QuantityInput';
import Unit from './ui/Unit';
import Card from './ui/Card';

const Coffee = () => {
    const quantityCtx = useContext(QuantityContext);
    const themeCtx = useContext(ThemeContext);

    const [unit, setUnit] = useState('g');
    const { colors } = themeCtx;


    const handleQuantityChange = (newQuantity) => {
        if(isNaN(+newQuantity)) {
            console.log('Not a Number');
            return;
        }
        if(unit == 'oz') {
            newQuantity = newQuantity * 28.35;
        }
        quantityCtx.quantityChangeHandler('grounds', newQuantity);
    }

    const incrementQuantity = () => {
        var amount = 1;
        if(unit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.incrementQuantityHandler('grounds', amount);
    }

    const decrementQuantity = () => {
        var amount = 1;
        if(unit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.decrementQuantityHandler('grounds', amount);
    }

    const handleUnitChange = () => {
        setUnit((prevUnit) => {
            if(prevUnit == 'g') {
                return 'oz';
            } else {
                return 'g';
            }
        });
    }

    const handleLockedChange = () => {
        quantityCtx.lockedQuantityHandler('grounds');
    }

    const isLocked = quantityCtx.locked === 'grounds';

    return (
        <Card 
            title="Coffee"
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            LargeInputComponent={
                <QuantityInput
                    defaultValue={(unit == 'g') ? parseFloat(quantityCtx.grounds.toFixed(1)).toString() : parseFloat((quantityCtx.grounds/28.35).toFixed(1)).toString()}
                    keyboardType={'decimal-pad'}
                    onChangeText={handleQuantityChange}
                    maxLength={(unit == 'g') ? 5 : 4}
                    style={{color: isLocked ? colors.locked.largeInput : colors.largeInput}}
                />
            } 
            BottomLabelComponent={
                <Unit onPress={handleUnitChange} unit={unit} style={{color: isLocked ? colors.locked.unitPrimary : colors.unitPrimary}} />
            }
            locked={isLocked}
            colors={colors}
        />
    );
}

const style = StyleSheet.create({
    quantityContainer: {
        justifyContent: 'center',
        paddingVertical: 10,
    },
    quantity: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        textAlign: 'center',
        fontSize: 20,
    },
    button: {
        padding: 10,
        marginHorizontal: 30,
    }
});

export default Coffee;