import React, { useContext } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HelpStackNavigator from '../navigation/HelpStackNavigator';
import MainStackNavigator from '../navigation/MainStackNavigator';
import SettingStackNavigator from '../navigation/SettingStackNavigator';

import { ThemeContext } from '../components/ThemeContext';
import PresetStackNavigator from './PresetStackNavigator';

const MainDrawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
    const ThemeCtx = useContext(ThemeContext);
    const { colors } = ThemeCtx;

    return (
        <NavigationContainer>
            <MainDrawer.Navigator 
                drawerContent={(props) => (
                    <View style={{ flex: 1, paddingTop: 20, backgroundColor: colors.screenBackground, color: colors.labelPrimary }}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never'}}>
                        <DrawerItem 
                            label={() => <View style={{flexDirection: "row"}}><Text style={{color: colors.largeInput,fontFamily: 'montserrat-light', textTransform: 'uppercase', fontSize: 30,}}>COFF</Text><Text style={{color: colors.labelPrimary,fontFamily: 'montserrat-light', textTransform: 'uppercase', fontSize: 30,}}>IO</Text></View>}
                            labelStyle={{
                                fontFamily: 'montserrat-light',
                                textTransform: 'uppercase',
                                fontSize: 20,
                            }}
                            activeTintColor={colors.largeInput}
                            inactiveTintColor={colors.labelPrimary}
                        />
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                )}
                drawerContentOptions={{
                    activeTintColor: colors.largeInput,
                    inactiveTintColor: colors.labelPrimary,
                    labelStyle: {
                        fontFamily: 'montserrat-light',
                        textTransform: 'uppercase',
                        fontSize: 16,
                    }
                }}
            >
                <MainDrawer.Screen 
                    name="Calculator" 
                    component={MainStackNavigator} 
                    options={{
                        headerTitle: 'Calculator',
                    }}
                />
                <MainDrawer.Screen 
                    name="Presets" 
                    component={PresetStackNavigator} 
                    options={{
                        headerTitle: 'Presets',
                    }}
                />
                <MainDrawer.Screen 
                    name="Settings" 
                    component={SettingStackNavigator} 
                    options={{
                        headerTitle: 'Settings',
                    }}
                />
                <MainDrawer.Screen 
                    name="Help" 
                    component={HelpStackNavigator} 
                    options={{
                        headerTitle: 'Help',
                    }}
                />
            </MainDrawer.Navigator>
        </NavigationContainer>
    )
}

export default MainDrawerNavigator;