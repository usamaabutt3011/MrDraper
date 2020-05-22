import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";
import { Header, Steps, Button, MediumTitle, SmallText, VerifyingModal } from '../../../../../components';
import { WP, colors, data, family } from '../../../../../services';
import { styles } from '../styles';
const yml = data.member_settings_v7.en.style_profile_quiz.scheduling;
class DeliveryDetailsConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPaymentModal: false, 
            showSuccessModal: false, 
            showSuccess: true,
            isDisable: false
        }
    }
    async onPay() {
        // this.setState({isDisable: !this.state.isDisable})
        try {
            await RNPayFort({
                command: "PURCHASE",
                access_code: "SDml7I01zNJCFuh66dAJ",//"DNedcyLMfAEH3ZbOTTzX",
                merchant_identifier: "JLNmgBYq",//"492860a6",
                // merchant_reference: "XYZ786-string0900",
                sha_request_phrase: "TESTSHAOUT",//"2y$10$6FiAOMNlW",
                amount: 100,
                currencyType: "AED",
                language: "en",
                email: "naishadh@logisticinfotech.co.in",
                testing: true
            })
                .then(response => {
                    this.showPaymentModals()
                })
                .catch(error => {
                    if (error.response_code === '00047') {
                        this.props.navigation.push('ConfirmationMessage')
                    }
                });
        } catch (error) {
            console.log('try error=========>', error);
        }
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
        const { userRes } = this.props;
        const { isShowPaymentModal, showSuccessModal, isDisable } = this.state;
        const { delivery, deliverTo } = this.props.navigation.state.params;
        // console.log('params: ', delivery,deliverTo);

        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ height: WP('7') }} />
                    <View style={[styles.subContainerSchdule, { alignItems: "flex-start" }]}>
                        <MediumTitle
                            text={yml.confirm_delivery_details}
                            style={{ marginHorizontal: WP('5'), marginTop: WP('5'), alignSelf: 'flex-start' }}
                        />
                        <View style={{ flexDirection: 'row', width: WP('80'), justifyContent: 'space-between', alignSelf: 'center' }}>
                            <SmallText
                                text={`${yml.scheduled_delivery}:`}
                                style={{ marginTop: WP('5'), marginBottom: WP('5'), color: colors.mediumGrey }}
                            />
                            <Button
                                title={'CHANGE'}
                                onPress={() => this.props.navigation.navigate('SchedulePackage')}
                                titleStyle={{ color: colors.orange, fontFamily: family.boldText, fontSize: WP('3.6') }}
                                style={{ width: WP('25'), backgroundColor: 'transparent' }}
                            />
                        </View>
                        <SmallText
                            text={delivery}
                            style={{ marginBottom: WP('5'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                        />
                        <View style={{ flexDirection: 'row', width: WP('80'), justifyContent: 'space-between', alignSelf: 'center' }}>
                            <SmallText
                                text={`${yml.deliver_to}:`}
                                style={{ marginTop: WP('5'), marginBottom: WP('5'), color: colors.mediumGrey }}
                            />
                            <Button
                                title={'CHANGE'}
                                onPress={() => this.props.navigation.navigate('DeliveryAddress')}
                                titleStyle={{ color: colors.orange, fontFamily: family.boldText, fontSize: WP('3.6') }}
                                style={{ width: WP('25'), backgroundColor: 'transparent' }}
                            />
                        </View>
                        <SmallText
                            text={`${userRes.userProfile.result.name}`}
                            style={{ marginBottom: WP('1'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                        />
                        <SmallText
                            text={`${deliverTo.line_1}, ${deliverTo.line_2}`}
                            style={{ marginBottom: WP('1'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                        />
                        <SmallText
                            text={`${deliverTo.area}, ${deliverTo.city}`}
                            style={{ marginBottom: WP('1'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                        />
                        <View style={{ width: WP('80'), alignSelf: 'center', marginTop: WP('7') }}>
                            <Button
                                disabled={isDisable}
                                title={'YES, DETAILS ARE CORRECT'}
                                onPress={() => this.props.navigation.push('ConfirmationMessage')}
                                // onPress={() => this.onPay()}
                                style={{ width: WP('80'), alignSelf: 'center', marginBottom: WP('6') }}
                            />
                        </View>
                    </View>
                    <VerifyingModal showModal={isShowPaymentModal} isSuccess={showSuccessModal} />
                </ScrollView>
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userRes: state.login,
    }
}
mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetailsConfirmation);
