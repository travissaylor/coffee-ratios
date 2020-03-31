import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import { QuantityContext } from './QuantityContext';
import QuantityInput from './ui/QuantityInput';
import Unit from './ui/Unit';
import QuantityTitle from './ui/QuantityTitle';

import IncrementButton from './ui/IncrementButton';
import DecrementButton from './ui/DecrementButton';
 

const Brew = () => {
    const quantityCtx = useContext(QuantityContext);
    const [unit, setUnit] = useState('g');


    const handleQuantityChange = (newQuantity) => {
        if(isNaN(+newQuantity)) {
            console.log('Not a Number');
            return;
        }
        if(unit == 'oz') {
            newQuantity = newQuantity * 28.35;
        }
        console.log('newQuantity', newQuantity);
        quantityCtx.quantityChangeHandler('brewedCoffee', newQuantity);
    }

    const incrementQuantity = () => {
        var amount = 1;
        if(unit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.incrementQuantityHandler('brewedCoffee', amount);
    }

    const decrementQuantity = () => {
        var amount = 1;
        if(unit == 'oz') {
            amount = 28.35;
        }
        quantityCtx.decrementQuantityHandler('brewedCoffee', amount);
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

    return (
        <View style={style.quantityContainer}>
            <QuantityTitle>Brew</QuantityTitle>
            <View style={style.quantity}>
                <DecrementButton onPress={decrementQuantity}/>
                <QuantityInput
                    defaultValue={(unit == 'g') ? parseFloat(quantityCtx.brewedCoffee.toFixed(1)).toString() : parseFloat((quantityCtx.brewedCoffee/28.35).toFixed(1)).toString()}
                    keyboardType={'numeric'}
                    onChangeText={handleQuantityChange}
                    maxLength={(unit == 'g') ? 5 : 4}
                />
                <IncrementButton onPress={incrementQuantity} />
            </View>
            <Unit onPress={handleUnitChange} unit={unit}/>
        </View>
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