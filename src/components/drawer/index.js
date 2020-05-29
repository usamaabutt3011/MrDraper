import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, AsyncStorage, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { WP, colors, size, family, openDrawer, navigate } from '../../services'
import { SmallTitle, SmallText, MediumTitle, NormalText } from "../../components"
import Icon from 'react-native-vector-icons/AntDesign';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { logout } from '../../store/actions'

// import * as Util from './services/index';

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleDetails: false
        }
    }

    toggleDetailOptions() {
        this.setState({ toggleDetails: !this.state.toggleDetails });
    }
    logout = async () => {
        const { userInfo, logoutAction } = this.props;
        await logoutAction();
        this.props.navigation.navigate('AuthStack');
    }
    renderRowItems(rowText, type, screenName) {
        if (type == 'title') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        // navigate(screenName, '')
                        if (rowText == 'LOGOUT') {
                            this.logout()
                        } else {
                            navigate(screenName, '')
                        }
                    }}
                    activeOpacity={0.7}
                >
                    <SmallTitle
                        text={rowText}
                        style={[drawerStyles.textRowStyles, drawerStyles.verticalMargin]}
                    />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => navigate(screenName, '')}
                    activeOpacity={0.7}
                >
                    <SmallText
                        text={rowText}
                        style={[drawerStyles.whiteColor, drawerStyles.smallTxt]}
                    />
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { userProfile } = this.props.userInfo;
        return (
            <View style={drawerStyles.container}>
                <ScrollView showsVerticalScrollIndicator={false}
                    style={drawerStyles.scrollViewStyles}
                >
                    <View style={drawerStyles.headerStyles}>
                        <MediumTitle
                            text={'Mr.Draper'}
                            style={drawerStyles.whiteColor}
                        />
                        <Icon
                            name={'close'}
                            size={30}
                            color={colors.white}
                            onPress={openDrawer}
                        />
                    </View>
                    <View style={drawerStyles.userContainer}>
                        <Avatar
                            size="medium"
                            rounded
                            source={{ uri: userProfile ? userProfile.result.pic : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', }}
                        />
                        <View style={drawerStyles.userDetailContainer}>
                            <SmallText
                                text={'Welcome'}
                                style={drawerStyles.whiteColor}
                            />
                            <SmallTitle
                                text={userProfile ? userProfile.result.name : null}
                                style={drawerStyles.textRowStyles}
                            />
                        </View>
                    </View>
                    <View style={drawerStyles.textRowContainer}>
                        {/* <View style={drawerStyles.dividedRow}>
                            {this.renderRowItems('NOTIFICATION', 'title')}
                            <Avatar
                                size="small"
                                rounded
                                title="12"
                                overlayContainerStyle={{ backgroundColor: colors.orange }}
                            />
                        </View> */}
                        {this.renderRowItems('MY PACKAGES', 'title', 'TabStack')}
                        {this.renderRowItems('MY WALLET', 'title', 'WalletStack')}
                        {this.renderRowItems('BILLING', 'title', 'Billing')}
                        <TouchableOpacity
                            style={drawerStyles.dividedRow}
                            onPress={() => this.toggleDetailOptions()}
                            activeOpacity={0.7}
                        >
                            <SmallTitle
                                text="ABOUT ME"
                                style={[drawerStyles.textRowStyles, drawerStyles.verticalMargin]}
                            />
                            <Icon
                                name={this.state.toggleDetails ? 'caretup' : 'caretdown'}
                                size={16}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                        {this.state.toggleDetails ?
                            <View style={{ marginLeft: WP('5') }}>
                                {this.renderRowItems('My Details', 'subTitle', 'UpdateProfile')}
                                {this.renderRowItems('My Addresses', 'subTitle', 'MyAddresses')}
                                {this.renderRowItems('My Styles', 'subTitle', 'MyStyles')}
                                {this.renderRowItems('My Sizes', 'subTitle', 'MySizes')}
                                {this.renderRowItems('My Preferences', 'subTitle', 'MyPreferences')}
                            </View>
                            : null}
                        {this.renderRowItems('APP SETTINGS', 'title', 'AppSettings')}
                        {this.renderRowItems('GIFT CARDS', 'title', 'GiftCardStack')}
                        {this.renderRowItems('GIVE FEEDBACK', 'title', 'FeedBack')}
                        {this.renderRowItems('LOGOUT', 'title', 'Login')}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userInfo: state.login,
    }
}
mapDispatchToProps = dispatch => {
    return {
        logoutAction: (params) => dispatch(logout(params)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Drawer));

const drawerStyles = StyleSheet.create({
    container: {
        flex: 1,
        // opacity: 0.7,
        backgroundColor: colors.darkGrey
    },
    scrollViewStyles: {
        marginHorizontal: WP('5')
    },
    headerStyles: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: WP('5'),
        marginBottom: WP('10')
    },
    whiteColor: {
        color: colors.white
    },
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: WP('5')
    },
    userDetailContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: WP('3'),
    },
    textRowContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    textRowStyles: {
        color: colors.white,
        fontFamily: family.normalText,
        fontWeight: '600',
    },
    verticalMargin: {
        marginVertical: WP(4),
        fontSize: WP('4.3'),
        fontFamily: family.boldText
    },
    smallTxt: {
        marginVertical: WP(4),
        fontSize: WP('3.5'),
        fontFamily: family.boldText
    },
    dividedRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
