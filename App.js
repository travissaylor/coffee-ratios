import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { AppearanceProvider } from 'react-native-appearance'


import MainStackNavigator from './navigation/MainStackNavigator';
import MainDrawerNavigator from './navigation/MainDrawerNavigator';
import ThemeContextProvider from './components/ThemeContext';

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
  }

  return (
    // <MainStackNavigator />
    <AppearanceProvider>
      <ThemeContextProvider>
        <MainDrawerNavigator />
      </ThemeContextProvider>
    </AppearanceProvider>
  );
}
