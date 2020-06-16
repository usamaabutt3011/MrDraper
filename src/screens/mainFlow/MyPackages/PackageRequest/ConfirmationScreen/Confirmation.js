import React, { Component } from 'react';
import { View, Image, ScrollView, Text, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, MediumText, Button, CustomInputField, VerifyingModal } from '../../../../../components';
import { WP, data, colors, appImages } from '../../../../../services';
import { packageRequest, AddPaymentCard, getBarCode } from '../../../../../store/actions';
import { styles } from '../styles';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            showSuccess: false,
            isShowPaymentModal: false,
            showSuccessModal: false
        }
    }
    componentDidMount = async () => {
        const { userRes } = this.props;
        // const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = this.props.packageRequest;
        console.log('[Confirmation.js] Confirmation Props', this.props);
        let parameter = {
            user_id: userRes.userProfile.result.user_id,
        }
        await this.props.getBarCodeAction(parameter, 'billing');
    }
    submitPackage = async () => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = this.props.packageRequest;
        const { userProfile } = this.props.userRes;
        const { packageRequestAction } = this.props;

        var params = {
            user_id: userProfile.result.user_id,
            needs: packageRequestObj.needs,
            comment: this.state.comment
        }
        await packageRequestAction(params)
    }
    componentWillReceiveProps = async (props) => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = props.packageRequest;
        // console.log('[Confirmation.js] Confirmation Props', props);
        if (isSuccess) {
            props.packageRequest.isSuccess = false;
            // console.log('[Confirmation.js] Confirmation True', props.packageRequest);
            // Toast.show(selectedPackage.message)
            this.props.navigation.push('SchedulePackage')
        } else {
            if (isFailure) {
                // console.log('[Confirmation.js] Confirmation False', props.packageRequest);
                // Toast.show(selectedPackage.message)
            }
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
                }, () => {
                    this.submitPackage()
                });
            }, 3000);
        }, 3000);
    }
    AddCard = async () => {
        const { userRes, getBarCode } = this.props;
        try {
            await RNPayFort({
                command: "AUTHORIZATION",
                access_code: "SDml7I01zNJCFuh66dAJ",//"DNedcyLMfAEH3ZbOTTzX",
                merchant_identifier: "JLNmgBYq",//"492860a6",
                merchant_reference: getBarCode.getBarcode ? getBarCode.getBarcode.result.barcode : 'MRDRAPER123',
                sha_request_phrase: "TESTSHAOUT",//"2y$10$6FiAOMNlW",
                amount: 1 * 100,
                currencyType: "AED",
                language: "en",
                email: userRes.userProfile.result.email,
                testing: true
            })
                .then(async response => {
                    console.log("--->>>> 1", response);
                    await this.showPaymentModals();
                    let params = {
                        user_id: userRes.userProfile.result.user_id,
                        card_no: response.card_number,
                        card_holder_name: response.card_holder_name,
                        card_type: response.payment_option,
                        token_name: response.token_name
                    }
                    await this.props.AddPaymentCardAction(params)
                    this.props.userRes.userProfile.result.has_card = true;
                })
                .catch(error => {
                    console.log("--->>>> 2", error);
                    if (error.response_code === '00047') {
                        this.setState({ showSuccess: true })
                    } else {
                        if (error.response_code === '00007') {
                            ToastAndroid.show(error.response_message)
                        }
                    }
                });
        } catch (error) {
            console.log('try error=========>', error);
        }
    }
    render() {
        const { isShowPaymentModal, showSuccessModal } = this.state;
        const { packageRequest, billingDetail, userRes } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ height: WP('7') }} />
                    <View style={styles.subContainer}>
                        <LargeTitle
                            text={`Almost there!`}
                            style={styles.title}
                        />
                        <NormalText
                            text={`Here's your order summary...`}
                            style={styles.normalText}
                        />
                        <MediumText
                            text={`Package Details`}
                            style={{ fontSize: WP('5'), marginHorizontal: WP('6'), marginTop: WP('6'), fontWeight: 'bold' }}
                        />
                        <MediumText
                            text={`'${packageRequest.packageRequestObj.package_name}' package`}
                            style={{ fontSize: WP('4.5'), marginHorizontal: WP('6'), marginTop: WP('2') }}
                        />
                        {
                            packageRequest.packageRequestObj.needs.length > 0 ?
                                <Text style={{ marginHorizontal: WP('6'), marginTop: WP('2'), flexDirection: 'row' }}>
                                    (
                                    {
                                        packageRequest.packageRequestObj.needs.map((item, key) => (
                                            <MediumText
                                                key={key}
                                                text={`${item} ${key < packageRequest.packageRequestObj.needs.length - 1 ? ',' : ''}`}
                                                style={{ fontSize: WP('4'), marginTop: WP('2') }}
                                            />
                                        ))
                                    }
                                    )
                                </Text>
                                :
                                null
                        }
                        <CustomInputField
                            label={`Any specific comment?`}
                            isRightIcon={false}
                            isMaskedInput={false}
                            multiLine={true}
                            placeholderText={`write something`}
                            placeholderTextColor={colors.lightGrey}
                            keyboardType={'default'}
                            onChangeText={(text) => this.setState({ comment: text })}
                            containerStyle={{ height: WP('25'), width: WP('78'), alignSelf: 'center', marginHorizontal: WP('5'), marginTop: WP('10') }}
                            style={{ height: WP('18'), paddingHorizontal: WP(1) }}
                        />
                        <Button
                            title={userRes.userProfile.result.has_card ? `CONFIRM` : `ADD PAYMENT METHOD`}
                            showLoader={packageRequest.loading}
                            style={styles.surpriseButton}
                            onPress={() => {
                                if (userRes.userProfile.result.has_card) {
                                    this.submitPackage()
                                } else {
                                    this.AddCard()
                                }
                            }}
                        />
                    </View>
                </ScrollView>
                <VerifyingModal showModal={isShowPaymentModal} isSuccess={showSuccessModal} />
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        billingDetail: state.billingDetail,
        getBarCode: state.getBarCode,
        packageRequest: state.packageRequestReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        AddPaymentCardAction: (params) => dispatch(AddPaymentCard(params)),
        packageRequestAction: (params) => dispatch(packageRequest(params)),
        getBarCodeAction: (params, called) => dispatch(getBarCode(params, called)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
