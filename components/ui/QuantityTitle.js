import React from 'react';
import { Text, StyleSheet} from 'react-native';

import { useTheme } from '../../constants/theme';

const QuantityTitle = (props) => {
    const { colors } = useTheme();

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