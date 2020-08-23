import React, { useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { themedColors } from '../constants/colors';
import usePreferences from './hooks/usePreferences';


export const ThemeContext = React.createContext({
    theme: '',
    colors: null,
});

const ThemeContextProvider = (props) => {
    const defaultTheme = usePreferences('@Coffio_default_theme');
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme);
    const [isEnabled, setIsEnabled] = useState((systemTheme === 'dark') ? true : false);
    var colors = theme ? themedColors[theme] : themedColors.default;

    useEffect(() => {
        setColors();
    }, [])

    useEffect(() => {
        if(defaultTheme.preferences === "system") {
            setTheme(systemTheme);
            setIsEnabled(systemTheme === "light" ? false : true)
            return;
        }
        setTheme(defaultTheme.preferences || "light");
        setIsEnabled(defaultTheme.preferences === "dark" ? true : false)

    }, [defaultTheme.preferences])
  
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

    const setLightTheme = () => {
        setTheme('light');
        setIsEnabled(false);
    }

    const setDarkTheme = () => {
        setTheme('dark');
        setIsEnabled(true);
    }

    const setSystemTheme = () => {
        setTheme(systemTheme);
        setIsEnabled(systemTheme === 'light' ? false : true);
    }

    return (
        <ThemeContext.Provider value={{ theme, colors, isEnabled, toggleTheme, setLightTheme, setDarkTheme, setSystemTheme }} >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;