import { createStackNavigator } from 'react-navigation-stack'

import ShirtsFit from './shirtsFit';
import PantsFit from './pantsFit';

export const FitsStack = createStackNavigator({
    ShirtsFit: ShirtsFit,
    PantsFit: PantsFit,
},{
    headerMode: 'none'
});

export default FitsStack;
