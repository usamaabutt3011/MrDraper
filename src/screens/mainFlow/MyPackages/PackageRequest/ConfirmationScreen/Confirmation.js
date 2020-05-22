import React, { Component } from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, MediumText, Button, CustomInputField, VerifyingModal } from '../../../../../components';
import { WP, data, colors, appImages } from '../../../../../services';
import { packageRequest } from '../../../../../store/actions';
import { styles } from '../styles';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "Comment Added!",
            showSuccess: false,
            isShowPaymentModal: false,
            showSuccessModal: false
        }
    }
    componentDidMount = async() => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = this.props.packageRequest;
        console.log('[Confirmation.js] Confirmation Props', this.props);
    }
    submitPackage = async() => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = this.props.packageRequest;
        const { userProfile } = this.props.userRes;
        const { packageRequestAction } = this.props;
        if (packageRequestObj.needs == []) {
            var params = {
                user_id: userProfile.result.user_id,
                comment: this.state.comment
            }
        } else {
            var params = {
                user_id: userProfile.result.user_id,
                needs: packageRequestObj.needs,
                comment: this.state.comment
            }
        }
        await packageRequestAction(params)
    }
    componentWillReceiveProps = async (props) => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = props.packageRequest;
        console.log('[Confirmation.js] Confirmation Props', props);
        if (isSuccess) {
            console.log('[Confirmation.js] Confirmation True', props.packageRequest);
            // Toast.show(selectedPackage.message)
            this.props.navigation.push('SchedulePackage')
        } else {
            if (isFailure) {
                console.log('[Confirmation.js] Confirmation False', props.packageRequest);
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
            },() => {
                this.submitPackage()
            });
          }, 3000);
        }, 3000);
      }
    AddCard = async () => {
          try {
            await RNPayFort({
              command: "AUTHORIZATION",
              access_code: "SDml7I01zNJCFuh66dAJ",//"DNedcyLMfAEH3ZbOTTzX",
              merchant_identifier: "JLNmgBYq",//"492860a6",
              sha_request_phrase: "TESTSHAOUT",//"2y$10$6FiAOMNlW",
              amount: 1,
              currencyType: "AED",
              language: "en",
              email: "naishadh@logisticinfotech.co.in",
              testing: true
            })
              .then(async response => {
                await this.showPaymentModals();
                console.log("--->>>> then", response);
              })
              .catch(error => {
                if (error.response_code === '00047') {
                  this.setState({ showSuccess: true })
                }
                console.log("--->>>> error", error);
              });
          } catch (error) {
            console.log('try error=========>', error);
          }
      }
    render() {
        const { isShowPaymentModal, showSuccessModal } = this.state;
        const { packageRequest, billingDetail } = this.props;
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
                                        packageRequest.packageRequestObj.needs.map((item,key)=>(
                                            <MediumText
                                                key={key}
                                                text={`${item} ${ key < packageRequest.packageRequestObj.needs.length - 1 ? ',': ''}`}
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
                            // onChangeText={(text) => this.setState({ password: text })}
                            containerStyle={{ height: WP('25'), width: WP('78') , alignSelf: 'center',marginHorizontal: WP('5'), marginTop: WP('10') }}
                            style={{ height: WP('18') ,paddingHorizontal: WP(1) }}
                        />
                        <Button
                            title={`CONFIRM`}
                            showLoader={packageRequest.loading}
                            style={styles.surpriseButton}
                            onPress={()=>{
                                if (billingDetail.billingDetails && billingDetail.billingDetails.result.has_card) {
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
        packageRequest: state.packageRequestReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        packageRequestAction: (params) => dispatch(packageRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
