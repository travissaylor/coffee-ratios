import React, { useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native-appearance';

import { themedColors } from '../constants/colors';


export const ThemeContext = React.createContext({
    theme: '',
    colors: null,
});

const ThemeContextProvider = (props) => {
    var initialTheme = useColorScheme();
    const [theme, setTheme] = useState(initialTheme);
    const [isEnabled, setIsEnabled] = useState((initialTheme == 'dark') ? true : false);
    var colors = theme ? themedColors[theme] : themedColors.default;

    useEffect(() => {
        setColors();
    }, [])
  
    const setColors = () => {
        colors = themedColors[theme];
    }

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            if(prevTheme == 'light') {
                return 'dark';
            }

            return 'light';
        });
        setIsEnabled((prevState) => (!prevState));
    }

    return (
        <ThemeContext.Provider value={{ theme, colors, isEnabled, toggleTheme }} >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;