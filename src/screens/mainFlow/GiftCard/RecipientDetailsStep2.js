import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import { CustomInputField, Header, GiftCardSteps, Button, LargeTitle, TinyTitle, SmallText, Loader } from '../../../components';
import { WP, colors, appImages, data } from '../../../services';
import { giftCardObj } from '../../../store/actions';
import { styles } from './styles';

class RecipientDetailsStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recip_name: "",
      recip_email: "",
      your_name: "",
      your_email: "",
      message: "",
    }
  }
  componentWillMount = async () => {
  }
  componentWillReceiveProps = async (props) => {
    // const { isSuccess, isFailure, loading, signupRes, error } = props.signup;
    // if (isSuccess) {
    //   console.log('[Personal-detail.js] Stylist Information True', props.signup);
    //   Toast.show(signupRes.message)
    //   this.props.navigation.push('SocailLinks')
    // } else {
    //   console.log('[Personal-detail.js] Stylist Information True', props.signup);
    //   if (isFailure) {
    //     this.setState({ isEmailValidate: true })
    //     Toast.show(error.message)
    //   }
    // }
  }

  onChangeText = async (value, label) => {

    switch (label) {
      case 'r_name':
        this.setState({ recip_name: value })
        break;
      case 'r_email':
        this.setState({ recip_email: value })
        break;
      case 'y_name':
        this.setState({ your_name: value })
        break;
      case 'y_email':
        this.setState({ your_email: value })
        break;
      case 'message':
        this.setState({ message: value })
        break;
      default:
        break;
    }

  }
  saveDetails = async () => {
    const { recip_name, recip_email, your_name, your_email, message } = this.state;
    const { giftCard } = this.props;
    var params = giftCard.giftCardObj;
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (recip_name == '') {
      Toast.show("Please enter Recipient's name.")
    } else if (recip_email == '' || !email.test(recip_email)) {
      Toast.show("Please enter valid Recipient's Email.")
    } else if (your_name == '') {
      Toast.show('Please enter your name.')
    } else if (your_email == '' || !email.test(your_email)) {
      Toast.show('Please enter your valid Email.')
    } else if (message == '') {
      Toast.show('Please enter your message.')
    } else {
      params.recepient_name = recip_name;
      params.recepient_email = recip_email;
      params.sender_name = your_name;
      params.sender_email = your_email;
      params.message = message;

      await this.props.giftCardObjAction(params);
      this.props.navigation.push('DeliveryDateSetp3');
    }
  }

  render() {
    const { } = this.props;
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
          // stepTwoChecked={true}
          stepThreeText={'Delivery'}
          // stepThreeColored={true}
          // stepThreeChecked={true}
          stepFourText={'Payment'}
          // stepFourColored={true}
          // stepFourChecked={true}
          progress={WP('40')} //83 total , per head= 6.9 , current =79.5
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          > */}
          <View style={{ height: WP('5') }} />
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white }}>
              <LargeTitle
                text={`Recipient Details`}
                style={{ width: '90%', fontSize: WP(9), marginHorizontal: WP('5'), marginVertical: WP('5') }}
              />
              <View style={{ marginVertical: WP('5') }}>
                <CustomInputField
                  label={'Recipient Name'}
                  placeholderText={'First Last'}
                  placeholderTextColor={colors.lightGrey}
                  isRightIcon={false}
                  onChangeText={(value) => this.onChangeText(value, 'r_name')}
                // containerStyle={{}}
                // style={{ paddingHorizontal: WP(1) }}
                />
                <CustomInputField
                  label={'Recipient Email'}
                  isRightIcon={false}
                  placeholderText={'email@address.com'}
                  placeholderTextColor={colors.lightGrey}
                  keyboardType={'email-address'}
                  onChangeText={(value) => this.onChangeText(value, 'r_email')}
                  labelStyle={this.state.isEmailValidate ? { color: 'red' } : null}
                // containerStyle={this.state.isEmailValidate ? { borderColor: 'red' } : null}
                // style={styles.inputStylePersonal}
                />
                <CustomInputField
                  label={'Your Name'}
                  isRightIcon={false}
                  placeholderText={'First Last'}
                  placeholderTextColor={colors.lightGrey}
                  keyboardType={'default'}
                  onChangeText={(value) => this.onChangeText(value, 'y_name')}
                // containerStyle={styles.nameInputContainer}
                // style={styles.nameInput}
                />
                <CustomInputField
                  label={'Your Email'}
                  isRightIcon={false}
                  placeholderText={'email@address.com'}
                  placeholderTextColor={colors.lightGrey}
                  keyboardType={'email-address'}
                  onChangeText={(value) => this.onChangeText(value, 'y_email')}
                  labelStyle={this.state.isEmailValidate ? { color: 'red' } : null}
                // containerStyle={this.state.isEmailValidate ? { borderColor: 'red' } : null}
                // style={styles.inputStylePersonal}
                />
                <CustomInputField
                  label={`Message`}
                  placeholderText={'message'}
                  placeholderTextColor={colors.lightGrey}
                  isRightIcon={false}
                  onChangeText={(value) => this.onChangeText(value, 'message')}
                  multiLine={true}
                  containerStyle={{ height: WP(25) }}
                // style={{ height: WP(30) }}
                />
              </View>

              <View style={{ width: WP('80'), marginVertical: WP('5'), justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ alignSelf: 'center' }}>

                </View>
                <Button
                  title={'Next'}
                  onPress={() => this.saveDetails()}
                  style={{ width: WP('30'), height: WP('12') }}
                />
              </View>
            </View>
          </View>

          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const ValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return console.log(true)
  }
  return console.log(false)
}

mapStateToProps = (state) => {
  return {
    giftCard: state.giftCard,
  }
}
mapDispatchToProps = dispatch => {
  return {
    giftCardObjAction: (params) => dispatch(giftCardObj(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipientDetailsStep2);
