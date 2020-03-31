import React from 'react';

import { View, Button, StyleSheet } from 'react-native';

const Header = (props) => {

    return (
        <View style={styles.header}>
            <Button title="x" />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
    }
 })

export default Header;