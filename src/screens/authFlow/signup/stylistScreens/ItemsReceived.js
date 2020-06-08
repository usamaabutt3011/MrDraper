import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";
import { ReceivingItemsCard, Header, Steps, LargeTitle, SmallText, Loader, VerifyingModal } from '../../../../components';
import { WP, appImages } from '../../../../services';
import { submitFirstPackage, AddPaymentCard, signUpObj, getBarCode } from '../../../../store/actions';
import { styles } from './styles';


class ItemsReceived extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageType: [],
            isShowPaymentModal: false, 
            showSuccessModal: false, 
            showSuccess: true 
        }
    }
    componentDidMount = async () => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        // await signUpObjAction(params, "ItemsReceived")
        await signUpObjAction(params, "")
        let parameter = {
            user_id: signup.signupRes.result.user_id,
        }
        await this.props.getBarCodeAction(parameter, 'billing');
    }
    submitFirstPackage = async (packageType) => {
        const { submitFirstPackageAction, signup } = this.props;
        let needs = []
        needs.push(packageType)
        // const { packageType } = this.state;
        if (packageType == '') {
            Toast.show('Please select any package.')
        } else {
            let params = {
                user_id: signup.signupRes.result.user_id,
                needs: needs
            }
            await submitFirstPackageAction(params)
        }
    }
    componentWillReceiveProps = async (props) => {
        const { isSuccess, isFailure, loading, selectedPackage } = props.selectPackage;
        if (isSuccess) {
            console.log('[socialLink.js] socialLink Information True', props.selectPackage);
            // Toast.show(selectedPackage.message)
            props.navigation.push('PaymentDetails')
            // this.onPay()
        } else {
            if (isFailure) {
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
            },()=>{
                this.props.navigation.push('Thankyou')
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
            merchant_reference: getBarCode.getBarcode? getBarCode.getBarcode.result.barcode : 'MRDRAPER123', 
            sha_request_phrase: "TESTSHAOUT",//"2y$10$6FiAOMNlW",
            amount: 100,
            currencyType: "AED",
            language: "en",
            email: userRes.userProfile.result.email,
            testing: true
          })
            .then(async(response) => {
                this.showPaymentModals()
                let params = {
                    user_id: userRes.userProfile.result.user_id,
                    card_no: response.card_number,
                    card_holder_name: response.card_holder_name,
                    card_type: response.payment_option,
                    token_name: response.token_name
                }
                await this.props.AddPaymentCardAction(params)
                // console.log("--->>>> 1", response);
            })
            .catch(error => {
                if (error.response_code === '00047') {
                    this.props.navigation.push('Thankyou')
                }
                // console.log("--->>>> 2", error);
            });
        } catch (error) {
          console.log('try error=========>', error);
        }
      }
      getDeviceToken = async () => {
        getPayFortDeviceId().then(async deviceId => {
          console.log('deviceID=====:', deviceId);
          //   await Axios.post("YOUR_WEB_URL_FOR_SDK_TOKEN_GENERATION", {
          //     deviceId: deviceId
          //   })
          //     .then(response => {
          //       this.setState({ sdk_token: response.data.sdk_token }, () => {
          //         this.onPay();
          //       });
          //     })
          //     .catch(error => {
          //       console.log(error);
          //     });
        });
      };
    render() {
        const { isShowPaymentModal, showSuccessModal } = this.state;
        const { isSuccess, loading } = this.props.selectPackage;
        return (
            <View style={styles.container}>
                <Header
                    left={false}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Steps
                        isCheckStyle={true}
                        isCheckPreference={true}
                        isCheckStylist={true}
                        isStyleColored={true}
                        iStylistColored={true}
                        isPreferenceColored={true}
                        progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                    />
                    <View style={{ height: WP('5') }} />
                    <SmallText
                        text={`Let's plan your first box.`}
                        style={{ marginHorizontal: WP('5'), marginBottom: WP('3') }}
                    />
                    <LargeTitle
                        text={`What would you like to receive?`}
                        style={{ marginHorizontal: WP('5') }}
                    />
                    <View style={{ flex: 1, marginTop: WP('7') }}>
                        <ReceivingItemsCard
                            title={'Work Wear'}
                            image={appImages.itemReceived1}
                            style={{ alignSelf: 'center' }}
                            onPress={() => {
                                this.submitFirstPackage("Work Wear")
                                //  this.setState({ packageType: "Work Wear" })
                            }}
                        />
                        <ReceivingItemsCard
                            title={'Weekend Wear'}
                            image={appImages.itemReceived2}
                            style={{ alignSelf: 'center' }}
                            onPress={() => {
                                this.submitFirstPackage("Weekend Wear")
                                //  this.setState({ packageType: "Weekend Wear" })
                            }}
                        />
                        <ReceivingItemsCard
                            title={'Night-Out Wear'}
                            image={appImages.itemReceived3}
                            style={{ alignSelf: 'center' }}
                            onPress={() => {
                                this.submitFirstPackage("Night-Out Wear")
                                //  this.setState({ packageType: "Night-Out Wear" })
                            }}
                        />
                    </View>
                </ScrollView>
                {
                    loading ?
                        <View style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', justifyContent: 'center' }}>
                            <Loader
                                color={'white'}
                            />
                        </View>
                        : null
                }
                <VerifyingModal showModal={isShowPaymentModal} isSuccess={showSuccessModal} />
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        signup: state.signup,
        userRes: state.login,
        getBarCode: state.getBarCode,
        selectPackage: state.selectPackage,
    }
}

mapDispatchToProps = dispatch => {
    return {
        AddPaymentCardAction: (params) => dispatch(AddPaymentCard(params)),
        signUpObjAction: (params, screen) => dispatch(signUpObj(params, screen)),
        getBarCodeAction: (params, called) => dispatch(getBarCode(params, called)),
        submitFirstPackageAction: (params) => dispatch(submitFirstPackage(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsReceived);
