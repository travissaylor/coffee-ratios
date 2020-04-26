import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CalculatorScreen from '../screens/CalculatorScreen';
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
        headerTitleStyle: {
            fontFamily: 'montserrat-light',
            textTransform: 'uppercase',
            fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.labelPrimary,
        headerLeft: () => (
            <HamburgerButton
              onPress={() => props.navigation.toggleDrawer()}
            />
        ),
        headerRight: () => (
            <ToggleThemeSwitch />
        ),
    }

    return (
        <MainStack.Navigator>
            <MainStack.Screen 
                name="Calculator" 
                component={CalculatorScreen} 
                options={{
                    ...defaultOptions,
                    headerTitle: 'Calculator'
                }}
            />
        </MainStack.Navigator>
    )
}

export default MainStackNavigator;