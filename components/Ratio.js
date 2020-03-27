import React, { useContext} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { RatioContext } from './RatioContext';
import { QuantityContext } from './QuantityContext';


const Ratio = () => {
    // const [ratio, setRatio] = useState(16);

    const handleRatioChange = (newRatio) => {
        // ratioCtx.ratioChangeHandler(newRatio);
        if(isNaN(+newRatio)) {
            console.log('Not a Number');
            return;
        }

        console.log('newQuantity', newRatio);
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

    const ratioCtx = useContext(RatioContext);    
    const quantityCtx = useContext(QuantityContext);


    return (
        <View style={style.ratioContainer}>
            <Text style={style.headingText}>Water to Coffee Ratio</Text>
            <View style={style.ratio}>
                <Button style={style.button} title="-" onPress={decrementQuantity}/>
                <TextInput
                    style={style.largeText}
                    defaultValue={quantityCtx.ratio.toString()}
                    underlineColorAndroid='transparent'
                    keyboardType={'numeric'}
                    onChangeText={handleRatioChange}
                />
                <Text style={style.largeText}>:1</Text>
                <Button style={style.button} title="+" onPress={incrementQuantity}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    ratioContainer: {
        justifyContent: 'center'
    },
    ratio: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 50,
    },
    headingText: {
        fontSize: 30
    },
    button: {
        padding: 10,
        marginHorizontal: 30,
    }
});

export default Ratio;