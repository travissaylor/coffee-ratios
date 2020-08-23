import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingView = ({indicatorColor, textStyle, text = "Loading..."}) => (
    <View>
        <Text style={{marginVertical: 20, ...textStyle}}>{text}</Text>
        <ActivityIndicator size="large" color={indicatorColor} />
    </View>
)

export default LoadingView;