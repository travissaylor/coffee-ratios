import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import { QuantityContext } from './QuantityContext';

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
            <Text style={style.headingText}>Brewed Coffee</Text>
            <View style={style.quantity}>
                <Button style={style.button} title="-" onPress={decrementQuantity}/>
                <TextInput
                    style={style.largeText}
                    defaultValue={(unit == 'g') ? parseFloat(quantityCtx.brewedCoffee.toFixed(2)).toString() : parseFloat((quantityCtx.brewedCoffee/28.35).toFixed(2)).toString()}
                    keyboardType={'numeric'}
                    onChangeText={handleQuantityChange}
                    maxLength={(unit == 'g') ? 5 : 4}
                />
                <TouchableOpacity onPress={handleUnitChange}>
                    <Text style={style.largeText}> {unit}</Text>
                </TouchableOpacity>
                <Button style={style.button} title="+" onPress={incrementQuantity}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    quantityContainer: {
        justifyContent: 'center'
    },
    quantity: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 50,
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

export default Brew;