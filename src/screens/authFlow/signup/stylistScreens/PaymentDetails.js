import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";
import CountDown from 'react-native-countdown-component';
import { CustomInputField, Header, Steps, Button, LargeTitle, SmallText, VerifyingModal } from '../../../../components';
import { WP, colors, family } from '../../../../services';
import { signUpObj } from '../../../../store/actions';
import { styles } from './styles';
import { withNavigation } from 'react-navigation'
import { AddPaymentCard } from '../../../../store/actions'
class PaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headLine: [
                `On-demand only`,
                `Only pay for what you keep`,
                `Return everything at no cost`,
                `Free styling, deliveries & collections`
            ]
        }
    }
    payment = () => {
        this.showPaymentModals()
    }
    showPaymentModals = async () => {
        this.setState({ isShowPaymentModal: true })

        setTimeout(() => {
            this.setState({ showSuccessModal: true })
            setTimeout(() => {
                this.setState({
                    isShowPaymentModal: false,
                    showSuccessModal: false,
                    showSuccess: true
                }, () => {
                    this.props.navigation.push('ThankyouCall')
                });
            }, 3000);
        }, 3000);
    }
    async onPay() {
        // await this.getDeviceToken()
        const { userRes, getBarCode } = this.props;
        try {
            await RNPayFort({
                command: "PURCHASE",
                access_code: "SDml7I01zNJCFuh66dAJ",//"DNedcyLMfAEH3ZbOTTzX",
                merchant_identifier: "JLNmgBYq",//"492860a6",
                merchant_reference: getBarCode.getBarcode ? getBarCode.getBarcode.result.barcode : 'MRDRAPER123',
                sha_request_phrase: "TESTSHAOUT",//"2y$10$6FiAOMNlW",
                amount: 100,
                currencyType: "AED",
                language: "en",
                email: userRes.userProfile.result.email,
                testing: true
            })
                .then(async (response) => {
                    this.showPaymentModals()
                    let params = {
                        user_id: userRes.userProfile.result.user_id,
                        card_no: response.card_number,
                        card_holder_name: response.card_holder_name,
                        card_type: response.payment_option,
                        token_name: response.token_name
                    }
                    await this.props.AddPaymentCardAction(params);
                    this.props.userRes.userProfile.result.has_card = true;
                    console.log("--->>>> 1", response);
                })
                .catch(error => {
                    if (error.response_code === '00047') {
                        this.props.navigation.push('ThankyouCall')
                    }
                    console.log("--->>>> 2", error);
                });
        } catch (error) {
            console.log('try error=========>', error);
        }
    }
    render() {
        const { isShowPaymentModal, showSuccessModal } = this.state;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={false}
                        onPressLeft={() => this.props.navigation.goBack()}
                    />
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* <Steps
                            isCheckStyle={true}
                            isCheckPreference={true}
                            isCheckStylist={true}
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                        /> */}
                        <View style={{ height: WP('5') }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white }}>
                                <LargeTitle
                                    text={`Great! One Last Step`}
                                    style={{ fontSize: WP(11), marginHorizontal: WP('5'), marginVertical: WP('5') }}
                                />
                                <View style={{ flexDirection: 'row', width: WP('80'), flexWrap: 'wrap', marginBottom: WP('4') }}>
                                    <Text style={{ fontFamily: family.boldText, color: colors.drakBlack, fontSize: WP('3.5') }}>
                                        Save a card to your profile in the next
                                    </Text>
                                    <CountDown
                                        until={60 * 30}
                                        onFinish={() => this.props.navigation.push('TabStack')}
                                        digitStyle={{}}
                                        digitTxtStyle={{ color: colors.red, fontSize: 12, top: 0 }}
                                        timeToShow={['M', 'S']}
                                        timeLabels={{ m: '', s: '' }}
                                        size={8}
                                        showSeparator={true}
                                        style={{ height: 20, marginHorizontal: WP('1') }}
                                    />
                                    <Text style={{ fontFamily: family.boldText, color: colors.drakBlack, fontSize: WP('3.5') }}>
                                        minutes & get
                                        <Text style={{ color: colors.buttonColor }}> 15% OFF </Text>
                                        your first box!
                                    </Text>
                                </View>

                                <View style={{ width: WP('80'), marginBottom: WP('4') }}>
                                    {
                                        this.state.headLine.map((item, key) => {
                                            return (
                                                <View key={key} style={styles.checkContainer}>
                                                    <CircleCheckIcon
                                                        name='checkcircle'
                                                        size={11.5}
                                                        color={colors.buttonColor}
                                                        style={styles.checkIcon}
                                                    />
                                                    <SmallText
                                                        text={item}
                                                        style={{ fontFamily: family.boldText }}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <SmallText
                                    text={`We check your card is real for AED 1 (a bit like how a hotel does)`}
                                    style={{ marginHorizontal: WP('5'), alignSelf: 'flex-start', marginBottom: WP('10') }}
                                />
                                {/* <CustomInputField
                                    label={'Name on Card'}
                                    placeholderText={'Shumaim Awanzai'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={false}
                                    onChangeText={() => { }}
                                    containerStyle={{}}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <CustomInputField
                                    label={'Card Number'}
                                    isMaskedInput={true}
                                    masking={"[0000] [0000] [0000] [0000]"}
                                    placeholderText={'4242 4242 4242 4242'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={false}
                                    onChangeText={(formatted,value) => { }}
                                    containerStyle={{}}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <View style={{ flexDirection: 'row', width: WP('80'), justifyContent: 'space-between' }}>
                                    <CustomInputField
                                        label={'CVV'}
                                        isMaskedInput={true}
                                        masking={"[000]"}
                                        placeholderText={'123'}
                                        placeholderTextColor={colors.lightGrey}
                                        isRightIcon={false}
                                        onChangeText={(formatted,value) => { }}
                                        containerStyle={{ width: WP('38') }}
                                        style={{ width: WP('35'), paddingHorizontal: WP(1) }}
                                    />
                                    <CustomInputField
                                        label={'Expiry'}
                                        isMaskedInput={true}
                                        masking={"[00]/[00]"}
                                        placeholderText={'08/25'}
                                        placeholderTextColor={colors.lightGrey}
                                        isRightIcon={false}
                                        onChangeText={(formatted,value) => { }}
                                        containerStyle={{ width: WP('38') }}
                                        style={{ width: WP('35'), paddingHorizontal: WP(1) }}
                                    />
                                </View>
                                <View style={{ width: WP('80'), marginVertical: WP('5'), justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View style={{ alignSelf: 'center' }}>

                                    </View>
                                    <Button
                                        title={'SAVE CARD'}
                                        onPress={() => this.payment()}
                                        style={{ width: WP('30'), height: WP('12') }}
                                    />
                                </View> */}
                                <Button
                                    title={'ADD PAYMENT METHOD'}
                                    onPress={() => this.onPay()}
                                    style={{ width: WP('80'), height: WP('12'), marginBottom: WP('10') }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <VerifyingModal showModal={isShowPaymentModal} isSuccess={showSuccessModal} />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}


mapStateToProps = (state) => {
    return {
        signup: state.signup,
        userRes: state.login,
        getBarCode: state.getBarCode,
    }
}
mapDispatchToProps = dispatch => {
    return {
        signUpObjAction: (params, screen) => dispatch(signUpObj(params, screen)),
        AddPaymentCardAction: (params) => dispatch(AddPaymentCard(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PaymentDetails));
