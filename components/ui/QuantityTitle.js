import React, { useContext } from 'react';
import { Text, StyleSheet} from 'react-native';

import { ThemeContext } from '../ThemeContext';

const QuantityTitle = (props) => {

    const themeCtx = useContext(ThemeContext);
    const { colors } = themeCtx;


    return (
        <Text style={{...styles.headingText, color: colors.labelPrimary}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    headingText: {
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase',
    },
});

export default QuantityTitle;