import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../constants/theme';

const IncrementButton = (props) => {
    const { colors } = useTheme();
    
    return (
        <View style={styles.iconContainer}>
            <Ionicons
                name='ios-add-circle-outline'
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