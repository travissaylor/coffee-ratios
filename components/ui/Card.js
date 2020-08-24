import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuantityTitle from './QuantityTitle';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import QuantityInput from './QuantityInput';


const Card = ({title, incrementQuantity, decrementQuantity, LargeInputComponent, BottomLabelComponent, colors, lockHandler, locked = false}) => {

    return (
        <View style={{...style.quantityContainer, backgroundColor: locked ? colors.locked.screenBackground : colors.screenBackground}}>
            <TouchableOpacity onPress={lockHandler}>
                <QuantityTitle style={{color: locked ? colors.locked.labelPrimary : colors.labelPrimary}}>{title}</QuantityTitle>
            </TouchableOpacity>
            <View style={style.quantity}>
                <DecrementButton onPress={decrementQuantity} color={locked ? colors.locked.iconPrimary : colors.iconPrimary} />
                {LargeInputComponent}
                <IncrementButton onPress={incrementQuantity} color={locked ? colors.locked.iconPrimary : colors.iconPrimary} />
            </View>
            {BottomLabelComponent}
        </View>
    );
}

export const StandardCard = (props) => (
    <BaseCard
        titleComponent={
            <QuantityTitle>{props.title}</QuantityTitle>
        }
        {...props}
    >
        <DecrementButton onPress={props.decrementHandler} />
        <QuantityInput
            style={{...style.largeInput, ...props.quantityStyle}}
            defaultValue={props.quantityValue}
            underlineColorAndroid='transparent'
            keyboardType={'numeric'}
            onChangeText={props.quantityHandler}
        />
        <IncrementButton onPress={props.incrementHandler}/>
    </BaseCard>
)

export const BaseCard = (props) => {
    return (
        <View style={{...style.quantityContainer, ...props.style}}>
            {props.titleComponent}
            <View style={style.quantity}>
                {props.children}
            </View>
            {props.BottomLabelComponent}
        </View>
    )
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