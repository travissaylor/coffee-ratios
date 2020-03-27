import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Ratio from './components/Ratio';
import RatioContextProvider, { RatioContext } from './components/RatioContext';
import QuantityContextProvider from './components/QuantityContext';
import Coffee from './components/Coffee';
import Water from './components/Water';
import Brew from './components/Brew';

export default function App() {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <RatioContextProvider>
        <View style={styles.container}> 
          <RatioContext.Consumer>
            {({ratio}) => (
              <QuantityContextProvider ratio={ratio}>
                <Ratio />
                <Coffee />
                <Water />
                <Brew />
                <Text>Trav's Coffee Ratio App</Text>
              </QuantityContextProvider>
            )}
          </RatioContext.Consumer>
        </View>
      </RatioContextProvider>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
