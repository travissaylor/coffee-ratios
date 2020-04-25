import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Button, View, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Ratio from '../components/Ratio';
import QuantityContextProvider from '../components/QuantityContext';
import Coffee from '../components/Coffee';
import Water from '../components/Water';
import Brew from '../components/Brew';
import Timer from '../components/Timer';
import { ThemeContext }  from '../components/ThemeContext';

const CalculatorScreen = (props) => {

  const ThemeCtx = useContext(ThemeContext);
  const { colors, theme } = ThemeCtx;

  const [isTimerMode, setIsTimerMode] = useState(false);

  const cancelActionHandler = () => {
    setIsTimerMode(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView 
        contentContainerStyle={{...styles.container, backgroundColor: colors.screenBackground}} 
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <StatusBar barStyle={(theme == 'dark') ? "light-content" : "dark-content"} />
        <QuantityContextProvider>
          <Ratio />
          <Coffee />
          <Water />
          <Brew />
          <View style={styles.brewButton}>
            <Button color={colors.buttonPrimary} title="Open Timer" onPress={() => setIsTimerMode(true)} />
          </View>
          <Timer visible={isTimerMode} cancelAction={cancelActionHandler}/>
        </QuantityContextProvider>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brewButton: {
    marginTop: 30
  },
});

export default CalculatorScreen;
