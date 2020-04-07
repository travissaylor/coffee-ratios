import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Button, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Ratio from '../components/Ratio';
import QuantityContextProvider from '../components/QuantityContext';
import Coffee from '../components/Coffee';
import Water from '../components/Water';
import Brew from '../components/Brew';
import Timer from '../components/Timer';
import { useTheme } from '../constants/theme';

const CalculatorScreen = (props) => {
  let { colors } = useTheme();

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
        <QuantityContextProvider>
          <Ratio />
          <Coffee />
          <Water />
          <Brew />
          <View style={styles.brewButton}>
            <Button color={colors.buttonPrimary} title="Start Brewing" onPress={() => setIsTimerMode(true)} />
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
