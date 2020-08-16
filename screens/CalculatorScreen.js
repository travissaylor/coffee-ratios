import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Button, View, StatusBar, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

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
    deactivateKeepAwake();
  }

  const updateTimerState = () => {
    setIsTimerMode(true);
    activateKeepAwake();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView 
        contentContainerStyle={{...styles.container, backgroundColor: colors.screenBackground}} 
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        bounces={false}
        extraScrollHeight={20}
      >
        <StatusBar backgroundColor={(theme == 'dark') ? colors.screenBackground : colors.screenBackground} barStyle={(theme == 'dark') ? "light-content" : "dark-content"} />
        <QuantityContextProvider>
          <Ratio />
          <Coffee />
          <Water />
          <Brew />
          <View style={styles.brewButton}>
            <Button color={colors.buttonPrimary} title="Open Timer" onPress={updateTimerState} />
          </View>
          <Timer visible={isTimerMode} cancelAction={cancelActionHandler}/>
        </QuantityContextProvider>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brewButton: {
    marginTop: 30
  },
});

export default CalculatorScreen;
