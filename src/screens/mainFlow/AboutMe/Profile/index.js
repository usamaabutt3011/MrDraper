import { createStackNavigator } from 'react-navigation-stack'

import UpdateProfile from './UpdateProfile';
import MyStyles from './MyStyles'
import MyPreferences from './MyPreferences';
import MySizes from './MySizes';
import MyAddresses from './MyAddresses';

export const ProfileStack = createStackNavigator({
    MySizes: MySizes,
    MyStyles: MyStyles,
    MyPreferences: MyPreferences,
    UpdateProfile: UpdateProfile,
    MyAddresses: MyAddresses

}, {
    headerMode: 'none',
    initialRouteName: 'MyPreferences'
});

export default ProfileStack;
