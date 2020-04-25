import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemeContext } from '../ThemeContext';

const IncrementButton = (props) => {
    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;

    
    return (
        <View style={styles.iconContainer}>
            <Ionicons
                name='ios-add-circle'
                size={32}
                color={(props.color) ? props.color : colors.iconPrimary}
                backgroundColor="black"
                onPress={props.onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default IncrementButton;