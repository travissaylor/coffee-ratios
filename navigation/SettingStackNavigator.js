import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingScreen from '../screens/SettingScreen';
import HamburgerButton from '../components/ui/HamburgerButton';
import ToggleThemeSwitch from '../components/ui/ThemeToggleSwitch';

import { ThemeContext } from '../components/ThemeContext';


const SettingStack = createStackNavigator();

const SettingStackNavigator = (props) => {
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
        <SettingStack.Navigator>
            <SettingStack.Screen 
                name="Settings" 
                component={SettingScreen} 
                options={{
                    ...defaultOptions,
                    headerTitle: 'Settings'
                }}
            />
        </SettingStack.Navigator>
    )
}

export default SettingStackNavigator;