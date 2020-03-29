import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Ratio from './components/Ratio';
import QuantityContextProvider from './components/QuantityContext';
import Coffee from './components/Coffee';
import Water from './components/Water';
import Brew from './components/Brew';

import Timer from './components/Timer';

const fetchFonts = () => {
  return Font.loadAsync({
    'sf-ultralight': require('./assets/fonts/SFNSDisplayCondensed-Ultralight.otf'),
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
  });
}

export default function App() {

  const [isTimerMode, setIsTimerMode] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
  }

  const cancelActionHandler = () => {
    setIsTimerMode(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={0}>
        <QuantityContextProvider>
          <Ratio />
          <Coffee />
          <Water />
          <Brew />
          <Button title="Start Brewing" onPress={() => setIsTimerMode(true)} />
        </QuantityContextProvider>
        <Timer visible={isTimerMode} cancelAction={cancelActionHandler} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
