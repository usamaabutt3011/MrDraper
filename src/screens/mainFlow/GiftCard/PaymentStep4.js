import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";
import { CustomInputField, Header, GiftCardSteps, Button, LargeTitle, SmallText, VerifyingModal, Loader } from '../../../components';
import { WP, colors, family } from '../../../services';
import { styles } from './styles';
import moment from "moment"
import { giftCardObj, createGiftCard, GiftCardObjClear, getBarCode } from '../../../store/actions';

class PaymentStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      giftCardData: {},
      isShowPaymentModal: false,
      showSuccessModal: false
    }
  }

  componentWillMount() {
    const { giftCard } = this.props
    this.setState({ 
      giftCardData: giftCard.giftCardObj
    }, async()=>{
      const { giftCard } = this.props;
      let params = giftCard.giftCardObj;
      await this.props.getBarCodeAction(params, 'giftCard');
    });
    console.log("giftCard: ", giftCard.giftCardObj);
  }

  componentWillReceiveProps = async (nextProps) => {
    const { isSuccess, isFailure, loading, error } = nextProps.giftCard;
    const { getBarCode, giftCard } = nextProps;
    let params = giftCard.giftCardObj;
    if (getBarCode.isSuccess && getBarCode.getBarcode.isSuccess) {
      nextProps.getBarCode.isSuccess = false;
      params.barcode = getBarCode.getBarcode.result.barcode;
    }
    if (isSuccess) {
      nextProps.giftCard.isSuccess = false;
      await this.showPaymentModals();
    }
    console.log('===componentWillReceiveProps: ', nextProps, params);
  }

  showPaymentModals = async () => {
    this.setState({ isShowPaymentModal: true })

    setTimeout(() => {
      this.setState({ showSuccessModal: true })
      setTimeout(() => {
        this.setState({ isShowPaymentModal: false, showSuccessModal: false, showSuccess: true });
      }, 3000);
    }, 3000);
  }

  handlePayment = async () => {
    const { giftCard } = this.props;
    let params = giftCard.giftCardObj;
    await this.props.sendGiftCardAction(params);
  }
  openNewGiftCard() {
    this.props.clearCardDataAction();
    this.props.navigation.push('LandingContent');
  }
  async onPay() {
    const { userInfo } = this.props;
    const { giftCard } = this.props;
    let params = giftCard.giftCardObj;
    const { giftCardData } = this.state;
    if (giftCardData.amount !== 0) {
      var ammount = giftCardData.amount*100
    } else {
      var ammount = 0;
    }
    try {
      await RNPayFort({
        command: "PURCHASE",
        access_code: "SDml7I01zNJCFuh66dAJ",//"SDml7I01zNJCFuh66dAJ",
        merchant_identifier: "JLNmgBYq",//"JLNmgBYq",
        merchant_reference: params.barcode,
        sha_request_phrase: "TESTSHAOUT",//"TESTSHAOUT",
        amount: ammount,
        currencyType: "AED",
        language: "en",
        email: params.sender_email,
        testing: true,
        // access_code: "AAxmojOBICnfd3acwhNI",//"SDml7I01zNJCFuh66dAJ",
        // merchant_identifier: "UbjSuMqG",//"JLNmgBYq",
        // sha_request_phrase: "DRAPERIN17",//"TESTSHAOUT",
      })
        .then(response => {
            this.handlePayment()
            console.log("--->>>> 1", response);
        })
        .catch(async(error) => {
            if (error.response_code === '00047') {
              this.setState({showSuccess: true})
            }
            await this.props.getBarCodeAction(params, 'giftCard');
            console.log("--->>>> 2", error);
        });
    } catch (error) {
      console.log('try error=========>', error);
    }
  }
  render() {
    const { giftCardData, isShowPaymentModal, showSuccessModal } = this.state;
    const { giftCard } = this.props;

    return (
      <View style={styles.container}>
        <Header
          drawerLeft={true}
          right={true}
          titleStyle={{ color: colors.white }}
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <GiftCardSteps
          stepOneText={'Amount'}
          stepOneColored={true}
          stepOneChecked={true}
          stepTwoText={'Recipient'}
          stepTwoColored={true}
          stepTwoChecked={true}
          stepThreeText={'Delivery'}
          stepThreeColored={true}
          stepThreeChecked={true}
          stepFourText={'Payment'}
          stepFourColored={true}
          stepFourChecked={this.state.showSuccess}
          progress={WP('75')} //83 total , per head= 6.9 , current =79.5
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >

          <View style={{ height: WP('5') }} />
          {this.state.showSuccess ?
            <View style={{ flex: 1 }}>
              <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white, paddingHorizontal: WP('5'), }}>
                <Image source={require('../../../assets/images/paymentSuccess.png')}
                  style={{ height: WP('38'), width: WP('90'), resizeMode: 'contain', }}
                />

                <Text style={{ alignSelf: 'flex-start', marginVertical: WP('6'), fontSize: WP('4') }}>
                  Your Gift Card will be delivered to
                  <Text style={{ color: colors.buttonColor }}> {giftCardData.recepient_name}</Text> by email on {giftCardData.send_date}
                </Text>
                <View style={styles.twoWayDataContainer}>
                  <View style={{ flex: 0.5 }}>
                    <SmallText
                      text={"Sender"}
                      style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                    />
                    <SmallText
                      text={giftCardData.sender_name}
                      style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                    />
                    <SmallText
                      text={"Sender Email"}
                      style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                    />
                    <SmallText
                      text={giftCardData.sender_email}
                      style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                    />
                    <SmallText
                      text={"Gift Card Amount"}
                      style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                    />
                    <SmallText
                      text={giftCardData.amount}
                      style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                    />
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <SmallText
                      text={"Recipient"}
                      style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                    />
                    <SmallText
                      text={giftCardData.recepient_name}
                      style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                    />
                    <SmallText
                      text={"Recipient Email"}
                      style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                    />
                    <SmallText
                      text={giftCardData.recepient_email}
                      style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                    />
                    <SmallText
                      text={"Delivery Date"}
                      style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                    />
                    <SmallText
                      text={giftCardData.send_date}
                      style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                    />
                  </View>
                </View>
                <View style={{ alignSelf: 'flex-start' }}>
                  <SmallText
                    text={"Message"}
                    style={{ fontFamily: family.normalText, color: colors.lightGrey, marginVertical: WP('2') }}
                  />
                  <SmallText
                    text={giftCardData.message}
                    style={{ fontFamily: family.boldText, color: colors.black, fontSize: WP('4'), marginBottom: WP('2') }}
                  />
                </View>

                <View style={{ width: WP('80'), marginVertical: WP('5'), justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ alignSelf: 'center' }}>

                  </View>
                  <Button
                    title={'New Gift Card'}
                    onPress={() => { this.openNewGiftCard() }}
                    style={{ width: WP('35'), height: WP('12') }}
                  />
                </View>

              </View>
            </View>
            :
            <View style={{ flex: 1 }}>
              {/* <Loader /> */}
              <LargeTitle
                text={`Payment Confirmation`}
                style={{ width: '90%', alignSelf: 'center', fontSize: WP(9), marginHorizontal: WP('5'), marginVertical: WP('5') }}
              />
              <View style={styles.invoiceContainer}>
                <View style={styles.invoiceHeader}>
                  <View style={{ flex: 0.7 }}>
                    <SmallText
                      text={"Product"}
                      style={[styles.smallText, { fontFamily: family.normalText }]}
                    />
                  </View>
                  <View style={{ flex: 0.3 }}>
                    <SmallText
                      text={"Price"}
                      style={[styles.smallText, { fontFamily: family.normalText }]}
                    />
                  </View>
                </View>
                <View style={styles.invoiceContentContainer}>
                  <View style={styles.invoiceRowContainer}>
                    <SmallText
                      text={`AED ${giftCardData.amount} Gift Card`}
                      style={{ fontFamily: family.boldText }}
                    />
                    <SmallText
                      text={`AED ${giftCardData.amount}`}
                    />
                  </View>
                </View>
                <View style={[styles.invoiceHeader, { width: WP('90'), height: WP('12') }]}>
                  <SmallText
                    text={"Total Payable"}
                    style={styles.smallText}
                  />
                  <SmallText
                    text={`AED ${giftCardData.amount}`}
                    style={styles.smallText}
                  />
                </View>
              </View>
               <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: 'transparent' }}>
                {/* <LargeTitle
                  text={`Add Payment Method`}
                  style={{ width: '90%', alignSelf: 'center', fontSize: WP(7), marginHorizontal: WP('5'), marginVertical: WP('5') }}
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
                  onChangeText={(formatted, value) => { }}
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
                    onChangeText={(formatted, value) => { }}
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
                    onChangeText={(formatted, value) => { }}
                    containerStyle={{ width: WP('38') }}
                    style={{ width: WP('35'), paddingHorizontal: WP(1) }}
                  />
                </View> */}
                <Button
                  title={`PAY AED ${giftCardData.amount}`}
                  onPress={() =>{
                    this.onPay()
                    //  this.handlePayment()
                    }}
                  style={{ width: WP('80'), height: WP('12'), marginVertical: WP('5') }}
                  showLoader={giftCard.loading}
                />
              </View> 
            </View>

          }
          {/* </ScrollView> */}
        </KeyboardAwareScrollView >
        <VerifyingModal showModal={isShowPaymentModal} isSuccess={showSuccessModal} />
      </View>
    );
  }
}


mapStateToProps = (state) => {
  return {
    userInfo: state.login,
    giftCard: state.giftCard,
    getBarCode: state.getBarCode,
  }
}
mapDispatchToProps = dispatch => {
  return {
    giftCardObjAction: (params) => dispatch(giftCardObj(params)),
    sendGiftCardAction: (params) => dispatch(createGiftCard(params)),
    clearCardDataAction: (params) => dispatch(GiftCardObjClear(params)),
    getBarCodeAction: (params, called) => dispatch(getBarCode(params, called)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStep4);
