import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuantityTitle from './QuantityTitle';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';


const Card = ({title, incrementQuantity, decrementQuantity, LargeInputComponent, BottomLabelComponent, locked, colors}) => {

    return (
        <View style={{...style.quantityContainer, backgroundColor: locked ? colors.locked.screenBackground : colors.screenBackground}}>
            <QuantityTitle style={{color: locked ? colors.locked.labelPrimary : colors.labelPrimary}}>{title}</QuantityTitle>
            <View style={style.quantity}>
                <DecrementButton onPress={decrementQuantity} color={locked ? colors.locked.iconPrimary : colors.iconPrimary} />
                {LargeInputComponent}
                <IncrementButton onPress={incrementQuantity} color={locked ? colors.locked.iconPrimary : colors.iconPrimary} />
            </View>
            {BottomLabelComponent}
        </View>
    );
}

const style = StyleSheet.create({
    quantityContainer: {
        justifyContent: 'center',
        paddingVertical: 10,  
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    quantity: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityInput: {
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

export default Card;