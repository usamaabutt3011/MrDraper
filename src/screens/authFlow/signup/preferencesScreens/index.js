import { createStackNavigator } from 'react-navigation-stack'

import Brands from './brands';
import Price from './prices';
import HeightWeight from './heightWeight';
import Size from './sizes';

export const PreferencesScreens = createStackNavigator({
    Brands: {
        screen: Brands,
        navigationOptions: {
            gesturesEnabled: false
    }},
    Price: {
        screen: Price,
        navigationOptions: {
            gesturesEnabled: false
    }},
    Height: {
        screen: HeightWeight,
        navigationOptions: {
            gesturesEnabled: false
    }},
    Size: { 
        screen: Size,
        navigationOptions: {
            gesturesEnabled: false
    }},
},{
    headerMode: 'none',
    initialRouteName: 'Brands',
    navigationOptions: {
        gesturesEnabled: false
    },
});

export default PreferencesScreens;
