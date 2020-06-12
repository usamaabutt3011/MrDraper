import React, { Component } from 'react';
import { View, ScrollView, Keyboard, Clipboard, Linking, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { Header, Button, Loader, MediumTitle, LargeTitle, SmallText, CustomInputField } from '../../../components';
import { WP, colors, appImages, data, family, dynamicBaseURL } from '../../../services';
import { getStylistInfo, walletDetail, getVoucherCode, getRedeemMembershipVoucher, getBarCode } from '../../../store/actions';
import { styles } from './styles';
import Share from 'react-native-share';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
class MyWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            barcode: '',
            m_barcode: '',
            isRedeem: false,
        }
    }
    componentWillMount = async () => {
        console.log('[MyWallet.js] componentWillMount', this.props);
        const { userInfo } = this.props;
        this.getWallet()
        let parameter = {
            user_id: userInfo.userProfile.result.user_id,
        }
        await this.props.getBarCodeAction(parameter, 'billing');
    }
    getWallet = async() => {
        const { userInfo, walletDetailAction } = this.props;
        let params = {
            user_id: userInfo.userProfile.result.user_id
        }
        await walletDetailAction(params)
    }
    componentWillReceiveProps = async (props) => {
        const { walletDetails, getVoucherCode, getMembershipVoucherCode } = props;
        console.log('[MyWallet.js] componentWillReceiveProps', props);
        //Claim voucher code
        if (getVoucherCode.isFailure) {
            props.getVoucherCode.isFailure = false;
            Toast.show(getVoucherCode.error.errors.message)
        } else {
            if (getVoucherCode.isSuccess) {
                getVoucherCode.isSuccess = false;
                this.getWallet()
                this.setState({barcode: ''})
                Toast.show(getVoucherCode.getVoucherCodeRes.user.result.message)
            }
        }

        if (getMembershipVoucherCode.isFailure) {
            props.getMembershipVoucherCode.isFailure = false;
            // this._toggleRedeem()
            Toast.show(getMembershipVoucherCode.error.errors.message)
        } else if (getMembershipVoucherCode.isSuccess) {
            getMembershipVoucherCode.isSuccess = false;
            this.setState({ 
                m_barcode: '' 
            })
            this._toggleRedeem()
            Toast.show(getMembershipVoucherCode.getMembershipVoucherRes.user.result.message)
        }
    }
    copyRefferalLink = async () => {
        const { userInfo } = this.props;
        Keyboard.dismiss()
        await Clipboard.setString(`${dynamicBaseURL}ref/${userInfo.userProfile.result.hash_id}`)
        Toast.show('Copied!')
    }
    makeCall(phoneNum) {
        Linking.canOpenURL(`tel:${phoneNum}`)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + `tel:${phoneNum}`);
                } else {
                    return Linking.openURL(`tel:${phoneNum}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }
    makeEmail(emailAdd) {
        Linking.canOpenURL(`mailto: ${emailAdd}`)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + `mailto: ${emailAdd}`);
                } else {
                    return Linking.openURL(`mailto: ${emailAdd}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }
    makeWhatsppMsg(phoneNum) {
        let url = 'whatsapp://send?text=' + `&phone=${phoneNum.substring(1)}`;
        Linking.openURL(url).then((data) => {
            // console.log('WhatsApp Opened');
        }).catch(() => {
            alert('Make sure Whatsapp installed on your device');
        });
    }
    getVoucherRequest = async () => {
        const { barcode } = this.state;
        const { getVoucherCodeAction, userInfo } = this.props;
        let params = {
            user_id: userInfo.userProfile.result.user_id,
            barcode: this.state.barcode
        }
        if (barcode == '') {
            Toast.show('Please enter your voucher number')
        } else {
            await getVoucherCodeAction(params)
        }
    }

    redeemMembershipRequest = async () => {
        const { m_barcode } = this.state;
        const { getRedeemMembershipVoucherAction, userInfo, getBarCode } = this.props;
        let params = {
            user_id: userInfo.userProfile.result.user_id,
            barcode: m_barcode
        }

        await getRedeemMembershipVoucherAction(params)
    }
    _toggleRedeem = () => 
        this.setState({ isRedeem: !this.state.isRedeem })
    render() {
        const { isRedeem } = this.state;
        const { walletDetails, userInfo, getVoucherCode, getMembershipVoucherCode } = this.props;
        let shareOptions = {
            title: "MrDraper",
            message: "Share this link",
            url: `${dynamicBaseURL}ref/${userInfo.userProfile.result.hash_id}`,
            subject: "Share Link" //  for email
        };
        return (
            <View
                style={{ flexGrow: 1 }}
            >
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('TabStack')}
                />
                <View style={styles.container}>
                    {
                        walletDetails.loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Loader />
                            </View>
                            :
                            <ScrollView
                                style={{ flex: 1 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={{ height: WP('5') }} />
                                <View style={styles.subContainerPersonal}>
                                    <SmallText
                                        text={`Current Balance`}
                                        style={{ fontSize: WP('3.7'), marginTop: WP('5'), marginHorizontal: WP('5'), color: colors.mediumGrey }}
                                    />
                                    <LargeTitle
                                        text={`AED ${walletDetails.walletDetailRes ? walletDetails.walletDetailRes.user.result.total : ''}`}
                                        style={{ marginHorizontal: WP('5'), fontFamily: family.boldText, marginTop: WP('2') }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.push('WalletDetail')}
                                        style={{ flexDirection: 'row', marginBottom: WP('5') }}>
                                        <SmallText
                                            text={`VIEW DETAILS`}
                                            style={{ marginLeft: WP('5'), fontSize: WP('4'), marginTop: WP('7'), color: colors.buttonColor, fontFamily: family.boldText }}
                                        />
                                        <ArrowIcon
                                            name={'arrowright'}
                                            color={colors.buttonColor}
                                            size={WP('5')}
                                            style={{ marginTop: WP('7'), marginLeft: WP('2') }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.subContainerPersonal}>
                                    <MediumTitle
                                        text={'Got a Voucher Code?'}
                                        style={{ marginHorizontal: WP('5'), marginTop: WP('5') }}
                                    />
                                    <SmallText
                                        text={`Enter the voucher code below to redeem your offer.`}
                                        style={{ marginHorizontal: WP('5'), fontSize: WP('4'), marginTop: WP('3'), color: colors.black }}
                                    />
                                    <CustomInputField
                                        label={'Voucher Code'}
                                        value={this.state.barcode}
                                        isRightIcon={false}
                                        isMaskedInput={false}
                                        secureTextEntry={false}
                                        placeholderText={'MRDRAPER777'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'default'}
                                        onChangeText={(text) => this.setState({ barcode: text })}
                                        containerStyle={{ marginHorizontal: WP('5'), marginTop: WP('10'), marginBottom: 5 }}
                                        style={{ paddingHorizontal: WP(1) }}
                                    />
                                    <View style={{ width: WP('80'), alignItems: 'flex-end', marginHorizontal: WP('5') }}>
                                        <Button
                                            title={'REDEEM VOUCHER'}
                                            showLoader={getVoucherCode.loading}
                                            onPress={() => this.getVoucherRequest()}
                                            style={{ backgroundColor: colors.buttonColor, alignSelf: 'center', width: WP('44'), marginVertical: WP('5') }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.subContainerPersonal}>
                                    <MediumTitle
                                        text={'Spread The Word. Get AED 100'}
                                        style={{ marginHorizontal: WP('5'), marginTop: WP('5') }}
                                    />
                                    <SmallText
                                        text={`Earn credit when your friends try Mr. Draper`}
                                        style={{ marginHorizontal: WP('5'), fontSize: WP('4'), marginTop: WP('3'), color: colors.black }}
                                    />
                                    <CustomInputField
                                        label={'Your Referral Link'}
                                        value={`${dynamicBaseURL}ref/${userInfo.userProfile ? userInfo.userProfile.result.hash_id : ""}`}
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
                                    <SmallText
                                        text={`Share via`}
                                        style={{ fontSize: WP('3.7'), marginTop: WP('5'), alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', marginVertical: WP('5'), alignSelf: 'center', marginBottom: WP('10') }}>
                                        <Avatar
                                            rounded
                                            overlayContainerStyle={{ backgroundColor: colors.black }}
                                            icon={{ name: 'logo-twitter', type: 'ionicon', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                            // onPress={() => this.openTwitter('')}
                                            onPress={() => Share.open(shareOptions)}
                                        />
                                        <Avatar
                                            rounded
                                            overlayContainerStyle={{ backgroundColor: colors.black }}
                                            containerStyle={{ marginHorizontal: WP('8') }}
                                            icon={{ name: 'logo-whatsapp', type: 'ionicon', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                            // onPress={() => this.makeWhatsppMsg(userInfo.userProfile.result.stylist_phone)}
                                            onPress={() => Share.open(shareOptions)}
                                        />
                                        <Avatar
                                            rounded
                                            overlayContainerStyle={{ backgroundColor: colors.black }}
                                            icon={{ name: 'facebook', type: 'font-awesome', color: '#fff', underlayColor: 'red', size: WP('5') }}
                                            // onPress={() => this.openFacebook(userInfo.userProfile.result.fb_profile)}
                                            onPress={() => Share.open(shareOptions)}
                                        />
                                    </View>
                                </View>
                                <SmallText
                                    text={`Other links`}
                                    style={{ marginHorizontal: WP('5'), marginBottom: WP('3'), fontSize: WP('3.5'), color: colors.mediumGrey }}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {getMembershipVoucherCode.loading ?
                                        <View style={{ marginTop: WP(-2), width: WP(40), alignContent: 'center' }}>
                                            <ActivityIndicator style={{ marginTop: 0, paddingTop: 0 }} color={colors.mediumGrey} animating size={WP('10')} />
                                        </View>
                                        :
                                        <TouchableOpacity
                                            onPress={() =>{ 
                                                this._toggleRedeem()
                                            }}>

                                            <MediumTitle
                                                text={'REDEEM MEMBERSHIP'}
                                                style={{ marginHorizontal: WP('5'), marginBottom: WP('10'), fontFamily: family.boldText, fontSize: WP('4'), color: colors.mediumGrey }}
                                            />
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('GiftCardStack')}>
                                        <MediumTitle
                                            text={'SEND A GIFT CARD'}
                                            style={{ marginHorizontal: WP('5'), marginBottom: WP('10'), fontFamily: family.boldText, fontSize: WP('4'), color: colors.mediumGrey }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Modal
                                    animationInTiming={200}
                                    animationOutTiming={100}
                                    animationIn="slideInLeft"
                                    animationOut="slideOutRight"
                                    avoidKeyboard={true}
                                    transparent={true}
                                    isVisible={isRedeem}
                                    onBackdropPress={() => this._toggleRedeem()}
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    >
                                    <View style={styles.subContainerPersonal}>
                                    <MediumTitle
                                        text={'Got a Membership Code?'}
                                        style={{ marginHorizontal: WP('5'), marginTop: WP('5') }}
                                    />
                                    <SmallText
                                        text={`Enter the code below to redeem your membership.`}
                                        style={{ marginHorizontal: WP('5'), fontSize: WP('4'), marginTop: WP('3'), color: colors.black }}
                                    />
                                    <CustomInputField
                                        label={'Membership Code'}
                                        value={this.state.m_barcode}
                                        isRightIcon={false}
                                        isMaskedInput={false}
                                        secureTextEntry={false}
                                        placeholderText={'MRDRAPER777'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'default'}
                                        onChangeText={(text) => this.setState({ m_barcode: text })}
                                        containerStyle={{ marginHorizontal: WP('5'), marginTop: WP('10'), marginBottom: 5 }}
                                        style={{ paddingHorizontal: WP(1) }}
                                    />
                                    <View style={{ width: WP('80'), alignItems: 'flex-end', marginHorizontal: WP('5') }}>
                                        <Button
                                            title={'REDEEM Membership'}
                                            showLoader={getVoucherCode.loading}
                                            onPress={() => this.redeemMembershipRequest()}
                                            style={{ backgroundColor: colors.buttonColor, alignSelf: 'center', width: WP('44'), marginVertical: WP('5') }}
                                        />
                                    </View>
                                </View>
                                </Modal>
                            </ScrollView>
                    }
                </View>
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        stylist: state.stylistInfo,
        walletDetails: state.walletDetailReducer,
        getVoucherCode: state.getVoucherCodeReducer,
        getMembershipVoucherCode: state.getMembershipVoucherReducer,
        getBarCode: state.getBarCode
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
        walletDetailAction: (params) => dispatch(walletDetail(params)),
        getVoucherCodeAction: (params) => dispatch(getVoucherCode(params)),
        getRedeemMembershipVoucherAction: (params) => dispatch(getRedeemMembershipVoucher(params)),
        getBarCodeAction: (params, called) => dispatch(getBarCode(params, called)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);
