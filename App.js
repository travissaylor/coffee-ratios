import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button } from 'react-native';

import Ratio from './components/Ratio';
import QuantityContextProvider from './components/QuantityContext';
import Coffee from './components/Coffee';
import Water from './components/Water';
import Brew from './components/Brew';

import Timer from './components/Timer';

export default function App() {

  const[isTimerMode, setIsTimerMode] = useState(false);

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
            <Button title="Start Brewing" onPress={() => setIsTimerMode(true)}/>
          </QuantityContextProvider>
          <Timer visible={isTimerMode} cancelAction={cancelActionHandler} />
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
