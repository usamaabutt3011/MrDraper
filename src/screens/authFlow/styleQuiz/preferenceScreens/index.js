import { createStackNavigator } from 'react-navigation-stack'

import PreferColor from './preferColor';
import PreferPattern from './preferPattern';

export const PreferenceStack = createStackNavigator({
    PreferColor: PreferColor,
    PreferPattern: PreferPattern,
},{
    headerMode: 'none'
});

export default PreferenceStack;
