const palette = {
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