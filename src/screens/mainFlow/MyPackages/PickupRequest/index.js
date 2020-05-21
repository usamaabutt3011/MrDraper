import { createStackNavigator } from 'react-navigation-stack'

import Intro from './Intro';
import Summary from './Summary';
import Confirmation from './Confirmation';
import ItemsShowCase from './ItemsShowCase';

export const PickupRequestStack = createStackNavigator({
    Intro: Intro,
    Summary: Summary,
    Confirmation: Confirmation,
    ItemsShowCase: ItemsShowCase,
},{
    headerMode: 'none',
    initialRouteName: 'Intro'
});

export default PickupRequestStack;
