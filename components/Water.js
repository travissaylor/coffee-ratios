import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { QuantityContext } from './QuantityContext';
import { ThemeContext } from './ThemeContext';
import QuantityInput from './ui/QuantityInput';
import Unit from './ui/Unit';
import Card from './ui/Card';

const Water = () => {
    const quantityCtx = useContext(QuantityContext);
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const handleQuantityChange = (newQuantity) => {
        newQuantity = newQuantity.nativeEvent.text;
        if(isNaN(+newQuantity)) {
            console.log('Not a Number');
            return;
        }
        if(quantityCtx.waterUnit == 'oz') {
            newQuantity = newQuantity * 28.35;
        }
        quantityCtx.quantityChangeHandler('water', newQuantity);
    }

    const incrementQuantity = () => {
        var amount = 1;
        if(quantityCtx.waterUnit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.incrementQuantityHandler('water', amount);
    }

    const decrementQuantity = () => {
        var amount = 1;
        if(quantityCtx.waterUnit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.decrementQuantityHandler('water', amount);
    }

    const handleUnitChange = () => {
        quantityCtx.unitChangeHandler('waterUnit');
        return;
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
                    defaultValue={(quantityCtx.waterUnit == 'g') ? parseFloat(quantityCtx.water.toFixed(1)).toString() : parseFloat((quantityCtx.water/28.35).toFixed(1)).toString()}
                    keyboardType={'numeric'}
                    onChangeText={handleQuantityChange}
                    maxLength={(quantityCtx.waterUnit == 'g') ? 5 : 4}
                    style={{color: isLocked ? colors.locked.largeInput : colors.largeInput}}
                />
            } 
            BottomLabelComponent={
                <Unit onPress={handleUnitChange} unit={quantityCtx.waterUnit} style={{color: isLocked ? colors.locked.unitPrimary : colors.unitPrimary}} />
            }
            locked={isLocked}
            colors={colors}
            lockHandler={handleLockedChange}
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