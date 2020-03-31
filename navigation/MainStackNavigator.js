import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import CalculatorScreen from '../screens/CalculatorScreen';
import TimerScreen from '../screens/TimerScreen';
import NewScreen from '../screens/NewScreen';

const MainStackNavigator = createStackNavigator({
    Calculator: CalculatorScreen,
    Timer: TimerScreen,
    Detailed: {
        screen: NewScreen,
    }
});

export default createAppContainer(MainStackNavigator);