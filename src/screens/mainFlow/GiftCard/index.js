import { createStackNavigator } from 'react-navigation-stack'

import LandingContent from './LandingContent';
import EnterValueStep1 from './EnterValueStep1';
import RecipientDetailsStep2 from './RecipientDetailsStep2';
import DeliveryDateSetp3 from './DeliveryDateSetp3';
import PaymentStep4 from './PaymentStep4';

export const GiftCardStack = createStackNavigator({
    LandingContent: LandingContent,
    EnterValueStep1: EnterValueStep1,
    RecipientDetailsStep2: RecipientDetailsStep2,
    DeliveryDateSetp3: DeliveryDateSetp3,
    PaymentStep4: PaymentStep4
}, {
    headerMode: 'none',
    initialRouteName: 'LandingContent'
});

export default GiftCardStack;
