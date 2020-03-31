import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MainStackNavigator from './navigation/MainStackNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'sf-ultralight': require('./assets/fonts/SFNSDisplayCondensed-Ultralight.otf'),
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
  }

  return (
    <MainStackNavigator />
  );
}
