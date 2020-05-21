import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { CustomInputField, Header, Steps, Button, LargeTitle, SmallText, VerifyingModal } from '../../../../../components';
import { WP, colors, family } from '../../../../../services';
import { signUpObj } from '../../../../../store/actions';
import { styles } from './styles';
import { withNavigation } from 'react-navigation'
class PaymentDetail extends Component {
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
            },()=>{
                this.props.navigation.push('ConfirmationMessage')
            });
          }, 3000);
        }, 3000);
      }
    render() {
        const { isShowPaymentModal, showSuccessModal } = this.state;
        return (
            <View
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                    <KeyboardAwareScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View style={{ height: WP('5') }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white }}>
                                <LargeTitle
                                    text={`Great! One Last Step`}
                                    style={{ fontSize: WP(11), marginHorizontal: WP('5'), marginVertical: WP('5') }}
                                />
                                {/* <SmallText
                                    text={`Save a card to your profile in the next 24:20 minutes & get 15% OFF your first box!`}
                                    style={{ marginHorizontal: WP('5'), alignSelf: 'flex-start', marginBottom: WP('4'), fontFamily: family.boldText }}
                                /> */}
                                <Text style={{ marginHorizontal: WP('5'), alignSelf: 'flex-start', marginBottom: WP('4'), fontFamily: family.boldText, color: colors.drakBlack, fontSize: WP('3.5') }}>
                                    Save a card to your profile in the next 
                                    <Text style={{ color: colors.red }}> 24:20 </Text>
                                    minutes & get 
                                    <Text style={{ color: colors.buttonColor }}> 15% OFF </Text>
                                    your first box!
                                </Text>
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
                                <CustomInputField
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
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                <VerifyingModal showModal={isShowPaymentModal} isSuccess={showSuccessModal} />
                </View>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        signup: state.signup,
    }
}
mapDispatchToProps = dispatch => {
    return {
        signUpObjAction: (params,screen) => dispatch(signUpObj(params, screen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PaymentDetail));
