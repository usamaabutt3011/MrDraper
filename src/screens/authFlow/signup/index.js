import { createStackNavigator } from 'react-navigation-stack';

import SignUp from './SinUp'
import StyleScreens from './styleScreens'
import PreferencesScreens from './preferencesScreens'
import StylistScreens from './stylistScreens'

const SignUpStack = createStackNavigator({
    // SignUp: SignUp, //onBoarding Screens Stack
    StyleStack: StyleScreens, //style Screens Stack
    PreferencesStack: PreferencesScreens, //perferences Screens Stack   
    StylistStack: StylistScreens, // stylist screens stack 
}, {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    },
    initialRouteName: 'StyleStack'
});

export default SignUpStack;
