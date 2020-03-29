import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import { QuantityContext } from '../QuantityContext';

const Card = ({inputValue, unit, quantityChangeHandler}) => {

    return (
        <View style={style.quantityContainer}>
            <Text style={style.headingText}>COFFEE</Text>
            <View style={style.quantity}>
                <Button style={style.button} title="-" onPress={decrementQuantity}/>
                <TextInput
                    style={style.largeText}
                    defaultValue={(unit == 'g') ? parseFloat(quantityCtx.grounds.toFixed(1)).toString() : parseFloat((quantityCtx.grounds/28.35).toFixed(1)).toString()}
                    keyboardType={'numeric'}
                    onChangeText={handleQuantityChange}
                    maxLength={(unit == 'g') ? 5 : 4}
                />
                <Button style={style.button} title="+" onPress={incrementQuantity}/>
            </View>
            <TouchableOpacity onPress={handleUnitChange}>
                <Text style={style.unitText}>{(unit == 'g') ? 'grams' : 'ounces'}</Text>
            </TouchableOpacity>
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
    largeText: {
        fontSize: 50,
        textAlign: 'center',
        marginHorizontal: 30,
        fontFamily: 'montserrat-light',
        // fontWeight: '100'
    },
    unitText: {
        fontSize: 15,
        textAlign: 'center',
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

export default Card;