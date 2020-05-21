import React, { Component } from 'react';
import { View, ScrollView, Clipboard, Keyboard, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share';

import { Header, Button, MediumTitle, LargeTitle, SmallText, CustomInputField, Loader } from '../../../components';
import { WP, colors, data, family } from '../../../services';
import { invitationHistory, invitationSend } from '../../../store/actions';
import { styles } from './styles';
class Referrals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            posts: [{}, {}, {}, {}]
        }
    }
    copyRefferalLink = async () => {
        const { userInfo } = this.props;
        Keyboard.dismiss()
        await Clipboard.setString(`http://178.62.183.214/ref/${userInfo.userProfile.result.hash_id}`)
        Toast.show('Copied!')
    }
    componentWillMount = async () => {
        const { invitationHistoryAction, userInfo } = this.props;
        let params = {
            user_id: userInfo.userProfile.result.user_id,//"8"
        }
        await invitationHistoryAction(params)
    }
    componentWillReceiveProps = async (props) => {
        const { inviteHistory, inviteRes } = props;
        console.log('[Refferals.js] componentWillReceiveProps', props);
        //Invitation History Section
        if (inviteHistory.isSuccess && props.inviteHistory.invitationHitoryRes) {
            // console.log('[Refferals.js] componentWillReceiveProps', props.inviteHistory.invitationHitoryRes.user.result.referrals);
        } else {
            //Failure case
        }

        //Invite a person Section
        if (inviteRes.isSuccess && inviteRes.invitationRes && inviteRes.invitationRes.user.result) {
            inviteRes.isSuccess = false;
            props.inviteHistory.invitationHitoryRes.user.result.referrals.unshift(inviteRes.invitationRes.user.result)
            this.setState({ email: '' })
            Toast.show('Invitation has been successfully sended.')
        } else {
            // Failure case
            if (inviteRes.isSuccess && inviteRes.invitationRes) {
                // Toast.show(inviteRes.invitationRes.user.message)
                Toast.show(`Invition already has been sent to this user.`)
            } else {
                
            }
        }
    }
    makeWhatsppMsg(phoneNum) {
        const { userInfo } = this.props;
        // Linking.canOpenURL(`whatsapp://send?phone=${phoneNum}`)
        //     .then((supported) => {
        //         if (!supported) {
        //             console.log("Can't handle url: " + `whatsapp://send?phone=${phoneNum}`);
        //         } else {
        //             return Linking.openURL(`whatsapp://chat?`);
        //         }
        //     })
        //     .catch((err) => console.error('An error occurred', err));
        const shareOptions = {
            title: '',
            message: '',
            url: `http://178.62.183.214/ref/${userInfo.userProfile.result.hash_id}`,
            social: Share.Social.WHATSAPP,
            whatsAppNumber: ""  // country code + phone number
        };
        Share.shareSingle(shareOptions);
    }
    openFacebook(fb_user) {
        const { userInfo } = this.props;
        // Linking.canOpenURL(`fb://page/${fb_user}`)
        //     .then((supported) => {
        //         if (!supported) {
        //             return Linking.openURL(`https://facebook.com/sharer/sharer.php?u=http://178.62.183.214/ref/2M`);
        //         } else {
        //             return Linking.openURL(`fb://page/${ fb_user ? fb_user : '' }`);
        //         }
        //     })
        //     .catch((err) => console.error('An error occurred', err));
        const shareOptions = {
            title: '',
            message: '',
            url: `http://178.62.183.214/ref/${userInfo.userProfile.result.hash_id}`,
            social: Share.Social.FACEBOOK,
            // whatsAppNumber: ""  // country code + phone number
        };
        Share.shareSingle(shareOptions);
    }
    openTwitter(twitterURL) {
        Linking.canOpenURL(`https://twitter.com/intent/tweet/?text=Sign%20up%20and%20get%20AED%20100%20off%20your%20first%20package&url=http://178.62.183.214/ref/2M`)
            .then((supported) => {
                if (!supported) {
                    return Linking.openURL(`https://www.twitter.com/`);
                } else {
                    return Linking.openURL(`https://twitter.com/intent/tweet/?text=Sign%20up%20and%20get%20AED%20100%20off%20your%20first%20package&url=http://178.62.183.214/ref/2M`);
                    // return Linking.openURL(`twitter://user?screen_name=${twitterUsername}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }
    InvitationSend = async () => {
        const { email } = this.state;
        const { invitationSendAction, userInfo } = this.props;
        let params = {
            user_id: userInfo.userProfile.result.user_id,//"8"
            email: email
        };
        if (email == '') {
            Toast.show('Please enter email address.')
        } else {
            await invitationSendAction(params)
        }
    }
    render() {
        const { userInfo, inviteHistory, inviteRes } = this.props;
        return (
            <View
                style={{ flexGrow: 1 }}
            >
                <Header
                    // drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    behavior="padding"
                >
                    <View style={styles.container}>
                        <ScrollView
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ height: WP('5') }} />
                            <View style={styles.subContainerPersonal}>
                                <LargeTitle
                                    text={'Invite Friends'}
                                    style={{ marginHorizontal: WP('5'), marginTop: WP('5') }}
                                />
                                <SmallText
                                    text={`Invite your friends to Mr. Draper, and if they sign up using your referral link, they will receive AED 100 into their wallet at sign up and you will get AED 100 deposited to yours once they’ve spent theirs.`}
                                    style={{ marginHorizontal: WP('5'), fontSize: WP('4'), marginTop: WP('3'), color: colors.black }}
                                />
                                <CustomInputField
                                    label={'Your Referral Link'}
                                    value={`http://178.62.183.214/ref/${userInfo.userProfile.result.hash_id}`}
                                    disabled={true}
                                    isRightIcon={false}
                                    isMaskedInput={false}
                                    secureTextEntry={false}
                                    onFocus={() => this.copyRefferalLink()}
                                    placeholderText={'https://www.mrdraper.com/ref/2M'}
                                    placeholderTextColor={colors.lightGrey}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    containerStyle={{ marginHorizontal: WP('5'), marginTop: WP('10'), marginBottom: 5 }}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <SmallText
                                    text={`Tap to copy and share it with your friends.`}
                                    style={{ marginHorizontal: WP('5'), fontSize: WP('2.8'), color: colors.mediumGrey }}
                                />
                                <CustomInputField
                                    label={'Invite by email'}
                                    value={this.state.email}
                                    isRightIcon={false}
                                    isMaskedInput={false}
                                    secureTextEntry={false}
                                    placeholderText={'email@address.com'}
                                    placeholderTextColor={colors.lightGrey}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    containerStyle={{ marginHorizontal: WP('5'), marginTop: WP('8') }}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <View style={{ width: WP('80'), alignItems: 'flex-end', marginHorizontal: WP('5') }}>
                                    <Button
                                        title={'SEND INVITE'}
                                        showLoader={inviteRes.loading}
                                        onPress={() => this.InvitationSend()}
                                        style={{ backgroundColor: colors.black, alignSelf: 'center', width: WP('40'), marginVertical: WP('5') }}
                                    />
                                </View>
                                <SmallText
                                    text={`Share via`}
                                    style={{ fontSize: WP('3.7'), marginTop: WP('5'), alignSelf: 'center' }}
                                />
                                <View style={{ flexDirection: 'row', marginVertical: WP('5'), alignSelf: 'center', marginBottom: WP('10') }}>
                                    <Avatar
                                        rounded
                                        onPress={() => this.openTwitter('')}
                                        overlayContainerStyle={{ backgroundColor: colors.black }}
                                        icon={{ name: 'logo-twitter', type: 'ionicon', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                    />
                                    <Avatar
                                        rounded
                                        onPress={() => this.makeWhatsppMsg(userInfo.userProfile.result.stylist_phone)}
                                        overlayContainerStyle={{ backgroundColor: colors.black }}
                                        containerStyle={{ marginHorizontal: WP('8') }}
                                        icon={{ name: 'logo-whatsapp', type: 'ionicon', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                    />
                                    <Avatar
                                        rounded
                                        onPress={() => this.openFacebook(userInfo.userProfile.result.fb_profile)}
                                        overlayContainerStyle={{ backgroundColor: colors.black }}
                                        icon={{ name: 'facebook', type: 'font-awesome', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                    />
                                </View>
                            </View>
                            <MediumTitle
                                text={`Invite History`}
                                style={{ marginHorizontal: WP('5'), marginBottom: WP('5') }}
                            />
                            <View style={{ borderRadius: 3, backgroundColor: colors.white, alignSelf: 'center', overflow: 'hidden', marginBottom: WP('5') }}>
                                {
                                    inviteHistory.loading ?
                                        <Loader />
                                        :
                                        inviteHistory.invitationHitoryRes && inviteHistory.invitationHitoryRes.user.result.referrals.map((item, key) => {
                                            return (
                                                this.historyCard(item, key)
                                            )
                                        })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAwareScrollView>

            </View>
        );
    }
    historyCard = (item, key) => {
        const { inviteHistory } = this.props;
        return (
            <View key={key} style={{ width: WP('90'), justifyContent: 'center', backgroundColor: item.recepient_signed_up ? '#F5F5F5' : colors.white }}>
                <View style={{ marginVertical: WP('5') }}>
                    <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SmallText
                            text={`${item.recepient_email}`}
                            style={{ fontFamily: family.boldText, fontSize: WP('4.5'), width: WP('60') }}
                        />
                        <SmallText
                            text={item.recepient_signed_up ? `Signed Up` : `Invite Sent`}
                            style={{ fontSize: WP('3.5'), color: item.recepient_signed_up ? colors.buttonColor : colors.orange }}
                        />
                    </View>
                    <SmallText
                        text={`${item.barcode}`}
                        style={{ marginHorizontal: WP('5'), fontSize: WP('3'), marginVertical: WP('2'), color: colors.black }}
                    />
                    <SmallText
                        text={`${item.date}`}
                        style={{ marginHorizontal: WP('5'), fontSize: WP('3'), color: colors.lightGrey }}
                    />
                </View>
                {
                    key < inviteHistory.invitationHitoryRes.user.result.referrals.length - 1 ?
                        <View style={{ height: WP('0.2'), width: WP('80'), backgroundColor: '#ccc', alignSelf: 'center' }} />
                        :
                        null
                }
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        inviteRes: state.invitationReducer,
        inviteHistory: state.invitationHistoryReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        invitationSendAction: (params) => dispatch(invitationSend(params)),
        invitationHistoryAction: (params) => dispatch(invitationHistory(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Referrals);
