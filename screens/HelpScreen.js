import React, { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet,View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ThemeContext }  from '../components/ThemeContext';
import HelpQuantity from '../components/HelpQuantity';
import QuantityContextProvider from '../components/QuantityContext';
import HelpCoffee from '../components/HelpCoffee';
import Coffee from '../components/Coffee';
import Ratio from '../components/Ratio';

const HelpScreen = (props) => {

  const ThemeCtx = useContext(ThemeContext);
  const { colors, theme } = ThemeCtx;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView 
        contentContainerStyle={{...styles.container, backgroundColor: colors.screenBackground}} 
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        bounces={false}
        extraScrollHeight={20}
        >
            <ScrollView>
            
            <Text style={{ ...styles.largeText, color: colors.unitPrimary }}>Here to Help</Text>
            <Text style={{...styles.bodyText, color: colors.unitPrimary }}>Our goal is to build user interfaces that are intuitive, lightweight, and easy on the eyes. We are also here to help you get started so that you understand the core concepts of our app so that you can get to brewing ASAP.</Text>
            <Text style={{ ...styles.largeText, color: colors.unitPrimary }}>Changing the Quantity</Text>
            <Text style={{...styles.bodyText, color: colors.unitPrimary }}>We have provided two ways to change the quantity. First is by tapping the number and typing a new one. Second is by tapping the + or - buttons to increment or decrement by 1. Try it below.</Text>
            <View style={styles.moduleContainer}>
                <QuantityContextProvider>
                    <HelpQuantity />
                </QuantityContextProvider>
            </View>
            <Text style={{ ...styles.largeText, color: colors.unitPrimary }}>Changing the Unit</Text>
            <Text style={{...styles.bodyText, color: colors.unitPrimary }}>We currently provide the option to toggle between grams and ounces. This will update the quantity to match the specific unit. To toggle the unit, simply tap it. Try it below.</Text>
            <View style={styles.moduleContainer}>
                <QuantityContextProvider>
                    <HelpCoffee />
                </QuantityContextProvider>
            </View>
            <Text style={{ ...styles.largeText, color: colors.unitPrimary }}>Changing the Locked Quantity</Text>
            <Text style={{...styles.bodyText, color: colors.unitPrimary }}>Locking a quantity allows you to change the other quantities without affecting the value of the locked quantity. To select the quantity you would like to like, tap the quantity name that is right above its numeric value. Try it below.</Text>
            <View style={{...styles.moduleContainer, marginTop: 10}}>
                <QuantityContextProvider>
                    <Ratio />
                    <Coffee />
                </QuantityContextProvider>
            </View>
            <Text style={{ ...styles.largeText, color: colors.unitPrimary }}>Toggle Dark Mode</Text>
            <Text style={{...styles.bodyText, color: colors.unitPrimary }}>In the top right corner of the app, inside the navigation bar, you will notice a toggle button. This is used to toggle between light and dark mode. Simply tap it to change the mode. Try it at the top right of any screen.</Text>
            <View style={{paddingBottom: 100}}></View>
            </ScrollView>
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    moduleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    largeText: {
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 10,
        marginVertical: 15,
        fontFamily: 'montserrat-light',
    },
    bodyText: {
        fontSize: 16,
        marginHorizontal: '7%',
        marginVertical: 10,
    }
});

export default HelpScreen;
