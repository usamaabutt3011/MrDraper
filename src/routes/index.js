import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
//Login
import Login from '../screens/authFlow/login';
import EmailVerificationScreen from '../screens/authFlow/emailVerificationScreen';
import ResetPassword from '../screens/authFlow/resetPassword';
import MegicLogin from '../screens/authFlow/megicLogin';
//SignUp
import SignUpStack from '../screens/authFlow/signup';
//Style Quiz
import StyleQuizStack from '../screens/authFlow/styleQuiz'
//Drawer
import DrawerComponent from '../components/drawer';
import WalletStack from '../screens/mainFlow/MyWallet';
import GiftCardStack from '../screens/mainFlow/GiftCard';
//APP
import MyPackages from '../screens/mainFlow/MyPackages/MyPackages';
//Pickup Request
import PickupRequestStack from '../screens/mainFlow/MyPackages/PickupRequest';

// Profile things in side Drawer
import ProfileStack from '../screens/mainFlow/AboutMe/Profile';
import FeedBack from '../screens/mainFlow/AboutMe/FeedBack';

// app settings in side drawer
import AppSettings from '../screens/mainFlow/AppSettings';

//TabStack
// import TabStack from '../screens/TabNav'
import TabStack from '../screens/TabNav/bottomTab'

export const drawerApp = createDrawerNavigator({
    TabStack: TabStack,
    PickupRequestStack: PickupRequestStack,
    WalletStack: WalletStack,
    GiftCardStack: GiftCardStack,
    ProfileStack: ProfileStack,
    FeedBack: FeedBack,
    AppSettings: AppSettings
}, {
    initialRouteName: 'TabStack',
    contentComponent: props => <DrawerComponent {...props} />,
    drawerWidth: '100%'
});

export const AppNavigator = createStackNavigator({
    drawer: drawerApp,
    //logout
    // Login: Login,
}, {
    headerMode: 'none',
});

//AuthStack
export const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUpStack,
    MyPackages: MyPackages,
    TabStack: TabStack,
    EmailVerificationScreen: EmailVerificationScreen,
    ResetPassword: ResetPassword,
    MegicLogin: MegicLogin,
    StyleQuiz: StyleQuizStack,
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
});

export default createAppContainer(AuthStack);
