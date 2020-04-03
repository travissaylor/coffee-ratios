import { useColorScheme } from 'react-native-appearance';
import { themedColors } from './colors';

export const useTheme = () => {
    var theme = useColorScheme();
    var colors = theme ? themedColors[theme] : themedColors.default;
    return {
      colors,
      theme,
    }
}