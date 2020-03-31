import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const SmallQuantityCard = props => {

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>Ratio</Text>
                    <Text style={styles.quantity}>16:1</Text>
                    <Text style={styles.unit}>ounces</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>Coffee</Text>
                    <Text style={styles.quantity}>32.7</Text>
                    <Text style={styles.unit}>grams</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>Water</Text>
                    <Text style={styles.quantity}>17.8</Text>
                    <Text style={styles.unit}>ounces</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>Brew</Text>
                    <Text style={styles.quantity}>16</Text>
                    <Text style={styles.unit}>ounces</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
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

