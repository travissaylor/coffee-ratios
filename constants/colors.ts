interface colorableItems {
    screenBackground: string,
    largeInput: string,
    buttonPrimary: string,
    buttonSecondary: string,
    iconPrimary: string,
    labelPrimary: string,
    unitPrimary: string,
    androidButtonDefault: string
}

interface palette {
    primary: string,
    secondary: string,
    accent: string,
    secondaryAccent: string,
    androidButtonDefault: string,
}

const defaultPalette: palette = {
    primary: '#08d9d6',
    secondary: '#252a34',
    accent: '#ff2e63',
    secondaryAccent: '#eaeaea',
    androidButtonDefault: '#808080',
};

export const colors: colorableItems = {
    screenBackground: defaultPalette.secondary,
    largeInput: defaultPalette.accent,
    buttonPrimary: defaultPalette.accent,
    buttonSecondary: defaultPalette.primary,
    iconPrimary: defaultPalette.accent,
    labelPrimary: defaultPalette.secondaryAccent,
    unitPrimary: defaultPalette.secondaryAccent,
    androidButtonDefault: defaultPalette.androidButtonDefault
}

export const themedColors = {
    default: {
        ...colors,
    },
    dark: {
        ...colors,
        locked: {
            ...colors,
            screenBackground: defaultPalette.accent,
            largeInput: defaultPalette.secondary,
            labelPrimary: defaultPalette.secondary,
            unitPrimary: defaultPalette.secondary,
            iconPrimary: defaultPalette.secondary,
        }
    },
    light: {
        ...colors,
        screenBackground: 'white',
        labelPrimary: defaultPalette.secondary,
        unitPrimary: defaultPalette.secondary,
        locked: {
            ...colors,
            screenBackground: defaultPalette.accent,
            largeInput: defaultPalette.secondaryAccent,
            labelPrimary: defaultPalette.secondaryAccent,
            unitPrimary: defaultPalette.secondaryAccent,
            iconPrimary: defaultPalette.secondaryAccent,
        }
    }
}