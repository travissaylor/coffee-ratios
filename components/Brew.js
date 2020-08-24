import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { QuantityContext } from './QuantityContext';
import { ThemeContext } from './ThemeContext';
import QuantityInput from './ui/QuantityInput';
import Unit from './ui/Unit';
import Card from './ui/Card';

const Brew = () => {
    const quantityCtx = useContext(QuantityContext);
    const themeCtx = useContext(ThemeContext);

    const { colors } = themeCtx;


    const handleQuantityChange = (newQuantity) => {
        newQuantity = newQuantity.nativeEvent.text;
        if(isNaN(+newQuantity)) {
            console.log('Not a Number');
            return;
        }
        if(quantityCtx.brewedCoffeeUnit == 'oz') {
            newQuantity = newQuantity * 28.35;
        }
        quantityCtx.quantityChangeHandler('brewedCoffee', newQuantity);
    }

    const incrementQuantity = () => {
        var amount = 1;
        if(quantityCtx.brewedCoffeeUnit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.incrementQuantityHandler('brewedCoffee', amount);
    }

    const decrementQuantity = () => {
        var amount = 1;
        if(quantityCtx.brewedCoffeeUnit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.decrementQuantityHandler('brewedCoffee', amount);
    }

    const handleUnitChange = () => {
        quantityCtx.unitChangeHandler('brewedCoffeeUnit');
    }

    const handleLockedChange = () => {
        quantityCtx.lockedQuantityHandler('brewedCoffee');
    }

    const isLocked = quantityCtx.locked === 'brewedCoffee';

    return (
        <Card 
            title="Brew"
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            LargeInputComponent={
                <QuantityInput
                    defaultValue={(quantityCtx.brewedCoffeeUnit == 'g') ? parseFloat(quantityCtx.brewedCoffee.toFixed(1)).toString() : parseFloat((quantityCtx.brewedCoffee/28.35).toFixed(1)).toString()}
                    keyboardType={'numeric'}
                    onChangeText={handleQuantityChange}
                    maxLength={(quantityCtx.brewedCoffeeUnit == 'g') ? 5 : 4}
                    style={{color: isLocked ? colors.locked.largeInput : colors.largeInput}}
                />
            } 
            BottomLabelComponent={
                <Unit onPress={handleUnitChange} unit={quantityCtx.brewedCoffeeUnit} style={{color: isLocked ? colors.locked.unitPrimary : colors.unitPrimary}} />
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

export default Brew;