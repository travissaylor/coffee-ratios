import React, { useContext } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';

import MainStackNavigator from '../navigation/MainStackNavigator';
import CalculatorScreen from '../screens/CalculatorScreen';
import TimerScreen from '../screens/TimerScreen';
import NewScreen from '../screens/NewScreen';
import { ThemeContext } from '../components/ThemeContext';

const MainDrawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
    const ThemeCtx = useContext(ThemeContext);
    const { colors } = ThemeCtx;

    const defaultOptions = {
        headerStyle: {
            backgroundColor: colors.screenBackground,
        },
        headerTintColor: colors.labelPrimary,
    }

    return (
        <NavigationContainer>
            <MainDrawer.Navigator 
                drawerContent={(props) => (
                    <View style={{ flex: 1, paddingTop: 20, backgroundColor: colors.screenBackground, color: colors.labelPrimary }}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                )}
                drawerContentOptions={{
                    activeTintColor: colors.largeInput,
                    inactiveTintColor: colors.labelPrimary
                }}
            >
                <MainDrawer.Screen 
                    name="Calculator" 
                    component={MainStackNavigator} 
                    options={{
                        ...defaultOptions,
                        headerTitle: 'Brew Calculator',
                    }}
                />
                <MainDrawer.Screen 
                    name="Timer" 
                    component={TimerScreen} 
                    options={{
                        ...defaultOptions,
                        headerTitle: 'Brew Timer',
                    }}
                />
                <MainDrawer.Screen 
                    name="Detailed" 
                    component={NewScreen} 
                    options={{
                        ...defaultOptions,
                        headerTitle: 'Details',
                    }}
                />
            </MainDrawer.Navigator>
        </NavigationContainer>
    )
}

export default MainDrawerNavigator;