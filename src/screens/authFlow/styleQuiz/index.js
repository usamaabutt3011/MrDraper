import { createStackNavigator } from 'react-navigation-stack';

import FitsStack from './fitScreens'
import PreferenceStack from './preferenceScreens'
import NotesStack from './notes'

const StyleQuizStack = createStackNavigator({
    FitsStack: { 
        screen: FitsStack,   //FitsStack Screens Stack
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    PreferenceStack: {
        screen: PreferenceStack, //Preference Screens Stack
        navigationOptions: {
            gesturesEnabled: false
        },
    },    
    NotesStack: {
        screen: NotesStack, //Notes Screens Stack
        navigationOptions: {
            gesturesEnabled: false
        }
    } 
}, {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    },
});

export default StyleQuizStack;
