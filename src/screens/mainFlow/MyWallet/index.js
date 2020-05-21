import { createStackNavigator } from 'react-navigation-stack'

import MyWallet from './MyWallet';
import WalletDetails from './WalletDetail';

export const WalletStack = createStackNavigator({
    MyWallet: MyWallet,
    WalletDetail: WalletDetails,
},{
    headerMode: 'none',
    initialRouteName: 'MyWallet'
});

export default WalletStack;
