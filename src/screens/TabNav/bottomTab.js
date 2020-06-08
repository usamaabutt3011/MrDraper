import React from 'react';
import { View, Text, } from 'react-native';
import { colors, WP, appSvgs } from '../../services';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import PackageIcon from 'react-native-vector-icons/AntDesign';
import { SvgUri } from 'react-native-svg';

//=======================MyPackages==================================================
import MyPackages from '../mainFlow/MyPackages/MyPackages';
import PackageDetail from '../mainFlow/MyPackages/MyPackages/PackageDetails';
import PackageRequestStack from '../mainFlow/MyPackages/PackageRequest';
// import ProfileStack from '../mainFlow/AboutMe/Profile';
//Temprary
// import UpdateProfile from '../mainFlow/AboutMe/Profile/UpdateProfile';
// import MyStyles from '../mainFlow/AboutMe/Profile/MyStyles';
// import MyPreferences from '../mainFlow/AboutMe/Profile/MyPreferences';
// import MySizes from '../mainFlow/AboutMe/Profile/MySizes';
// import FeedBack from '../mainFlow/AboutMe/FeedBack';
// import MyAddresses from '../mainFlow/AboutMe/Profile/MyAddresses';
//========================MyStylist==================================================
import MyStylist from '../mainFlow/MyStylist';
//========================Referrals==================================================
import Referrals from '../mainFlow/Refferals';
//========================PickupRequest==================================================
import PickupRequestStack from '../mainFlow/MyPackages/PickupRequest';
//========================Blogs==================================================
import Blogs from '../mainFlow/Blogs';
//========================PickupRequest==================================================
import WalletStack from '../mainFlow/MyWallet';

export const PackageRequest = createStackNavigator({
    MyPackages: MyPackages,
    PackageDetail: PackageDetail,
    PackageRequestStack: PackageRequestStack,
    // ProfileStack: ProfileStack,
    //Temprary
    // MySizes: MySizes,
    // MyStyles: MyStyles,
    // UpdateProfile: UpdateProfile,
    // MyPreferences: MyPreferences,
    // MyAddresses: MyAddresses,
    // FeedBack: FeedBack,

    // WalletStack: WalletStack,

    PickupRequestStack: PickupRequestStack
}, {
    headerMode: 'none'
});

export default createBottomTabNavigator(
    {
        package: {
            screen: PackageRequest,
            navigationOptions: {
                title: 'My Packages'
            }
        },
        stylist: {
            screen: MyStylist,
            navigationOptions: {
                title: 'My Stylist'
            }
        },
        referral: {
            screen: Referrals,
            navigationOptions: {
                title: 'Referrals'
            }
        },
        blogs: {
            screen: Blogs,
            navigationOptions: {
                title: 'Blogs'
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: colors.buttonColor,
            inactiveTintColor: colors.drakBlack,
        },
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                if (routeName === 'package') {
                    return (
                        <SvgUri
                            width={WP('5')}
                            height={WP('5')}
                            uri={
                                focused ?
                                    `https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/packages-icon-54f35a7c1e64b5e440328820ef579c37df0fd313a284350f2b4031f7a93c6410.svg`
                                    :
                                    'https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/packages-colored-icon-c22610cac99fc7b7ac2479630a5853fba5dc18ffbfb873a343118f32c4d42663.svg'
                            }
                        />
                    )
                } else if (routeName === 'stylist') {
                    return (
                        <SvgUri
                            width={WP('5')}
                            height={WP('5')}
                            uri={
                                focused ?
                                    'https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/stylist-colored-icon-024ff694d769eb9e1474e235f27c64d404288a6c0c971ddf99c4528f9ab4c6a0.svg'
                                    :
                                    `https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/stylist-icon-52ce1b6eaa0077aa0166dd6fe689d5174dd2114ef0f73fedf8e5ca86479313a2.svg`
                            }
                        />
                    )
                }
                else if (routeName === 'referral') {
                    return (
                        <SvgUri
                            width={WP('5')}
                            height={WP('5')}
                            uri={
                                focused ?
                                    'https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/referrals-colored-icon-528a80e5c23c3c5f715c76326784624e29eaa17988784ae5d4bec0eab0e02ea7.svg'
                                    :
                                    `https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/referrals-icon-bfa896b20078b6c5de0c686a838b9f0085a7b47e54ce1f54795fe8006f4739d7.svg`
                            }
                        />
                    )
                }
                else {
                    return (
                        <SvgUri
                            width={WP('5')}
                            height={WP('5')}
                            uri={
                                focused ?
                                    `https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/blog-colored-icon-55ac379374a10d41914bdabc275abe24964ff68353277a543330542bfb5957bd.svg`
                                    :
                                    `https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/blog-icon-14a8471c1baae681ee78a68d9780a21c75e015d3aebd5e25dd9c28213e7dbbc7.svg`
                            }
                        />
                    )
                }
            },
        }),
    }
);
