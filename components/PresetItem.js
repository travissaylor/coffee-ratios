import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
            return brew.toFixed(1);
        }

        return (brew / 28.35).toFixed(1);
    };

    const convertedBrew = brewUnitConversion(brewedCoffee, brewedCoffeeUnit);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...style, backgroundColor: style.backgroundColor }}>
            <Text
                style={{
                    ...styles.largeText,
                    ...style,
                    marginBottom: 0,
                    marginHorizontal: 10,
                }}>
                {name}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    ...style,
                }}>
                <Text style={{ ...styles.bodyText, ...style }}>{ratio.toFixed(1)}:1</Text>
                <Text style={{ ...styles.bodyText, ...style }}>
                    {convertedBrew}
                    {brewedCoffeeUnit}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
