import { createStackNavigator } from 'react-navigation-stack'

import PersonalDetail from './PersonalDetail';
import SocailLinks from './SocialLinks';
import ItemsReceived from './ItemsReceived';
import PaymentDetails from './PaymentDetails';
import Thankyou from './Thankyou';
import ThankyouCall from './ThankyouCall';

export const StylistScreens = createStackNavigator({
    PersonalDetail: { 
        screen: PersonalDetail,
        navigationOptions: {
            gesturesEnabled: false
    }},
    SocailLinks: { 
        screen: SocailLinks,
        navigationOptions: {
            // gesturesEnabled: false
    }},
    ItemsReceived: { 
        screen: ItemsReceived,
        navigationOptions: {
            gesturesEnabled: false
    }},
    PaymentDetails: { 
        screen: PaymentDetails,
        navigationOptions: {
            gesturesEnabled: false
    }},
    Thankyou: { 
        screen: Thankyou,
        navigationOptions: {
            gesturesEnabled: false
    }},
    ThankyouCall: { 
        screen: ThankyouCall,
        navigationOptions: {
            gesturesEnabled: false
    }},
},{
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    },
});

export default StylistScreens;
