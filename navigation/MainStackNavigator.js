import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CalculatorScreen from '../screens/CalculatorScreen';
import TimerScreen from '../screens/TimerScreen';
import NewScreen from '../screens/NewScreen';
import { useTheme } from '../constants/theme';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
    var { colors } = useTheme();

    const defaultOptions = {
        headerStyle: {
            backgroundColor: colors.screenBackground,
        },
        headerTintColor: colors.labelPrimary,
    }

    return (
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen 
                    name="Calculator" 
                    component={CalculatorScreen} 
                    options={{
                        ...defaultOptions,
                        headerTitle: 'Brew Calculator',
                    }}
                />
                <MainStack.Screen 
                    name="Timer" 
                    component={TimerScreen} 
                    options={{
                        ...defaultOptions,
                        headerTitle: 'Brew Timer',
                    }}
                />
                <MainStack.Screen 
                    name="Detailed" 
                    component={NewScreen} 
                    options={{
                        ...defaultOptions,
                        headerTitle: 'Details',
                    }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator;