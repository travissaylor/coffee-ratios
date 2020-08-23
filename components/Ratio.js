import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { QuantityContext } from './QuantityContext';
import RatioStrength from './ui/RatioStrength';
import { ThemeContext } from './ThemeContext';
import Card from './ui/Card';
import QuantityInput  from './ui/QuantityInput';


const Ratio = () => {
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    const handleRatioChange = (newRatio) => {
        newRatio = newRatio.nativeEvent.text
        if(isNaN(+newRatio)) {
            console.log('Not a Number');
            return;
        }

        quantityCtx.quantityChangeHandler('ratio', newRatio);
    }

    const incrementQuantity = () => {
        var amount = 1;
        quantityCtx.incrementQuantityHandler('ratio', amount);
    }

    const decrementQuantity = () => {
        var amount = 1;
        quantityCtx.decrementQuantityHandler('ratio', amount);
    }

    const quantityCtx = useContext(QuantityContext);
    
    const handleLockedChange = () => {
        quantityCtx.lockedQuantityHandler('ratio');
    }

    const isLocked = () => (
        quantityCtx.locked === 'ratio'
    )

    return (
        <Card 
            title="Ratio"
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            LargeInputComponent={
                <View style={style.ratioInput}>
                    <QuantityInput
                        style={{...style.largeText, marginHorizontal: 0, color: isLocked() ? colors.locked.largeInput : colors.largeInput}}
                        defaultValue={parseFloat(quantityCtx.ratio.toFixed(1)).toString()}
                        underlineColorAndroid='transparent'
                        keyboardType={'numeric'}
                        onChangeText={handleRatioChange}
                    />
                    <Text style={{...style.largeText, color: isLocked() ? colors.locked.largeInput : colors.largeInput}}>:1</Text>
                </View>
            } 
            BottomLabelComponent={
                <RatioStrength style={{color: isLocked() ? colors.locked.unitPrimary : colors.unitPrimary}} ratio={quantityCtx.ratio} />
            }
            locked={quantityCtx.locked === 'ratio'}
            colors={colors}
            lockHandler={handleLockedChange}
        />
    );
}

const style = StyleSheet.create({
    ratioContainer: {
        justifyContent: 'center',
        paddingVertical: 10,  
        paddingHorizontal: 30,
        borderRadius: 10,    
    },
    ratio: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratioInput: {
        marginHorizontal: 30,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeText: {
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'montserrat-light',
    },
    headingText: {
        fontSize: 30,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        marginHorizontal: 30,
    }
});

export default Ratio;