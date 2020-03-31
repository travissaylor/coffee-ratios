const palette = {
    // primary: '#481380',
    // primary: '#a1e6e3',
    // accent: '#37586f',

    // primary: '#222831',
    // secondary: '#393e46',
    // accent: '#00adb5',
    // secondaryAccent: '#eeeeee',

    primary: '#08d9d6',
    secondary: '#252a34',
    accent: '#ff2e63',
    secondaryAccent: '#eaeaea',
};

export const colors = {
    screenBackground: palette.secondary,
    largeInput: palette.accent,
    buttonPrimary: palette.accent,
    buttonSecondary: palette.primary,
    iconPrimary: palette.accent,
    labelPrimary: palette.secondaryAccent,
    unitPrimary: palette.secondaryAccent,
}

export const themedColors = {
    default: {
        ...colors,
    },
    dark: {
        ...colors,
    },
    light: {
        ...colors,
        screenBackground: 'white',
        labelPrimary: palette.secondary,
        unitPrimary: palette.secondary,
    }
}