import React from 'react';
import { Text, StyleSheet} from 'react-native';

const QuantityTitle = (props) => {

    return (
        <Text style={styles.headingText}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    headingText: {
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'uppercase'
    },
});

export default QuantityTitle;