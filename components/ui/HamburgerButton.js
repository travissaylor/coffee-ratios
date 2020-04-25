import React, { useContext } from 'react';
import { View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { ThemeContext } from '../ThemeContext';

const HamburgerButton = (props) => {

    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;


    return (
        <View style={{marginLeft: 10}}>
            <EvilIcons name="navicon" size={32} color={colors.buttonPrimary} backgroundColor="transparent" onPress={props.onPress}/>   
        </View>
    )
}

export default HamburgerButton;