import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SmallQuantityCard = props => {

    const { colors } = props;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.itemContainer}>
                    <Text style={{...styles.label, color: colors.unitPrimary}}>Ratio</Text>
                    <Text style={{...styles.quantity, color: colors.labelPrimary}}>16:1</Text>
                    <Text style={{...styles.unit, color: colors.unitPrimary}}>ounces</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={{...styles.label, color: colors.unitPrimary}}>Coffee</Text>
                    <Text style={{...styles.quantity, color: colors.labelPrimary}}>32.7</Text>
                    <Text style={{...styles.unit, color: colors.unitPrimary}}>grams</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.itemContainer}>
                    <Text style={{...styles.label, color: colors.unitPrimary}}>Water</Text>
                    <Text style={{...styles.quantity, color: colors.labelPrimary}}>17.8</Text>
                    <Text style={{...styles.unit, color: colors.unitPrimary}}>ounces</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={{...styles.label, color: colors.unitPrimary}}>Brew</Text>
                    <Text style={{...styles.quantity, color: colors.labelPrimary}}>16</Text>
                    <Text style={{...styles.unit, color: colors.unitPrimary}}>ounces</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '60%',
    },
    itemContainer: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 15,
    },
    label: {
        fontSize: 20,
    },
    unit: {
        fontSize: 15, 
    },
    quantity: {
        fontSize: 30,
    }
})

export default SmallQuantityCard;

