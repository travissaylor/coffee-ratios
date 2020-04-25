import React, { useContext } from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CalculatorScreen from '../screens/CalculatorScreen';
import TimerScreen from '../screens/TimerScreen';
import NewScreen from '../screens/NewScreen';
import HamburgerButton from '../components/ui/HamburgerButton';
import ToggleThemeSwitch from '../components/ui/ThemeToggleSwitch';

import { ThemeContext } from '../components/ThemeContext';


const MainStack = createStackNavigator();

const MainStackNavigator = (props) => {
    const ThemeCtx = useContext(ThemeContext);
    const { colors } = ThemeCtx;
    
    const defaultOptions = {
        headerStyle: {
            backgroundColor: colors.screenBackground,
        },
        headerTintColor: colors.labelPrimary,
    }

    return (
        <MainStack.Navigator>
            <MainStack.Screen 
                name="Calculator" 
                component={CalculatorScreen} 
                options={{
                    ...defaultOptions,
                    headerTitle: 'Brew Calculator',
                    headerLeft: () => (
                        <HamburgerButton
                          onPress={() => props.navigation.toggleDrawer()}
                        />
                    ),
                    headerRight: () => (
                        <ToggleThemeSwitch
                        //   onPress={() => toggleTheme()}
                        />
                    ),
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
    )
}

export default MainStackNavigator;