import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const PresetItem = ({
    name,
    ratio,
    grounds,
    water,
    brewedCoffee,
    groundsUnit,
    waterUnit,
    brewedCoffeeUnit,
    locked,
    style,
    onPress,
}) => {
    const brewUnitConversion = (brew, unit) => {
        if (unit === "g") {
            return brew;
        }

        return brew / 28.35;
    };

    const convertedBrew = brewUnitConversion(brewedCoffee, brewedCoffeeUnit);
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{ ...styles.largeText, ...style, marginBottom: 0 }}>
                {name}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ ...styles.bodyText, ...style }}>{ratio}:1</Text>
                <Text style={{ ...styles.bodyText, ...style }}>
                    {convertedBrew}
                    {brewedCoffeeUnit}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
    },
    moduleContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },
    largeText: {
        fontSize: 30,
        textAlign: "center",
        marginHorizontal: 10,
        marginVertical: 15,
        fontFamily: "montserrat-light",
    },
    bodyText: {
        fontSize: 16,
        marginHorizontal: "7%",
        marginVertical: 10,
    },
});

export default PresetItem;