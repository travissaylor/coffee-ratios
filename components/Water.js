import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { QuantityContext } from './QuantityContext';
import { ThemeContext } from './ThemeContext';
import QuantityInput from './ui/QuantityInput';
import Unit from './ui/Unit';
import Card from './ui/Card';

const Water = () => {
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
        quantityCtx.quantityChangeHandler('water', newQuantity);
    }

    const incrementQuantity = () => {
        var amount = 1;
        if(unit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.incrementQuantityHandler('water', amount);
    }

    const decrementQuantity = () => {
        var amount = 1;
        if(unit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.decrementQuantityHandler('water', amount);
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
        quantityCtx.lockedQuantityHandler('water');
    }

    const isLocked = quantityCtx.locked === 'water';

    return (
        <Card 
            title="Water"
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            LargeInputComponent={
                <QuantityInput
                    defaultValue={(unit == 'g') ? parseFloat(quantityCtx.water.toFixed(1)).toString() : parseFloat((quantityCtx.water/28.35).toFixed(1)).toString()}
                    keyboardType={'numeric'}
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
        alignItems: 'center',
        paddingVertical: 10,
    },
    quantity: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
    },
    headingText: {
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        padding: 10,
        marginHorizontal: 30,
    }
});

export default Water;