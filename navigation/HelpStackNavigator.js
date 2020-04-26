import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HelpScreen from '../screens/HelpScreen';
import HamburgerButton from '../components/ui/HamburgerButton';
import ToggleThemeSwitch from '../components/ui/ThemeToggleSwitch';

import { ThemeContext } from '../components/ThemeContext';


const HelpStack = createStackNavigator();

const HelpStackNavigator = (props) => {
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
        <HelpStack.Navigator>
            <HelpStack.Screen 
                name="Help" 
                component={HelpScreen} 
                options={{
                    ...defaultOptions,
                    headerTitle: 'Help'
                }}
            />
        </HelpStack.Navigator>
    )
}

export default HelpStackNavigator;