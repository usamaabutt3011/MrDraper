import { createStackNavigator } from 'react-navigation-stack'

import StyleIntro from './styleIntro';
import wearOnWork from './wearOnWork';
import wearOnWeekend from './wearOnWeekend';
import wearOnNightOut from './wearOnNightOut';
import PreferencesScreens from '../preferencesScreens';

export const StyleScreens = createStackNavigator({
    StyleIntro: { 
        screen: StyleIntro,
        navigationOptions: {
            gesturesEnabled: false
    }},
    wearOnWork: { 
        screen: wearOnWork,
        navigationOptions: {
            gesturesEnabled: false
    }},
    wearOnWeekend: { 
        screen: wearOnWeekend,
        navigationOptions: {
            gesturesEnabled: false
    }}, 
    wearOnNightOut: { 
        screen: wearOnNightOut,
        navigationOptions: {
            gesturesEnabled: false
    }},
    PreferencesStack: { 
        screen: PreferencesScreens,
        navigationOptions: {
            gesturesEnabled: false
    }}, //perferences Screens Stack    
},{
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    },
});

export default StyleScreens;
