import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { CustomInputField, Header, Button, LargeTitle, NormalText } from '../../../components';
import { WP, colors, family } from '../../../services';
import { AddPaymentCard } from '../../../store/actions';
import Toast from 'react-native-simple-toast';
import { RNPayFort, getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCustom: false,
      selectedValue: '',
      customValue: ''
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    const { isSuccess, isFailure, loading, error } = nextProps.billing;
    console.log('===componentWillReceiveProps billings: ', nextProps.billing);
  }

  selectValueButton = (value) => {
    const { selectedValue } = this.state;
    return (
      <Button
        title={`AED ${value}`}
        onPress={() => this.selectItem(value)}
        style={selectedValue === value ? styles.selectedButton : styles.unSelectedButton}
        titleStyle={{ color: selectedValue === value ? colors.white : colors.black, fontFamily: family.normalText }}
      />
    );
  }

  AddCard = async () => {
    // this.setState({ isCustom: false, selectedValue: value })

    const { userRes } = this.props;

    if (userRes.userProfile.isSuccess) {
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
            console.log("--->>>> then", response);
            // this.handlePayment()
            let params = {
              user_id: userRes.userProfile.result.user_id,
              card_no: response.card_number,
              card_holder_name: response.card_holder_name,
              card_type: response.payment_option,
              token_name: response.token_name
            }
            await this.props.AddPaymentCardAction(params)
          })
          .catch(error => {
            if (error.response_code === '00047') {
              // this.setState({ showSuccess: true })
            }
            console.log("--->>>> error", error);
          });
      } catch (error) {
        console.log('try error=========>', error);
      }
    }

  }

  navigateNextStep = async () => {
    const { isCustom, customValue } = this.state;
    if (isCustom) {
      if (customValue) {
        await this.selectItem(customValue);
        this.props.navigation.push('RecipientDetailsStep2')
      } else {
        Toast.show('Enter custom value')
      }
    } else {
      this.props.navigation.push('RecipientDetailsStep2')
    }

  }

  render() {
    const { isCustom } = this.state;
    const { } = this.props;
    return (

      <View style={styles.container}>
        <Header
          drawerLeft={false}
          right={true}
          titleStyle={{ color: colors.white }}
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onPressLeft={() => this.props.navigation.goBack()}
        />

        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          > */}
          <LargeTitle
            text={`Payment Methods`}
            style={{ width: '90%', fontSize: WP(7), marginHorizontal: WP('5'), marginVertical: WP('10') }}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white }}>
              <NormalText
                text={`Shumaim Awanzai`}
                style={{ fontWeight: '900', marginHorizontal: WP('5'), alignSelf: 'flex-start', marginTop: WP('3'), }}
              />
              <NormalText
                text={`12345 6666 6666 66 666 `}
                style={{ fontWeight: '200', marginHorizontal: WP('5'), alignSelf: 'flex-start', marginVertical: WP('2'), }}
              />
            </View>
            <Button
              title={`ADD PAYMENT METHOD`}
              onPress={() => this.AddCard()}
              style={styles.selectedButton}
            />
          </View>
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}


mapStateToProps = (state) => {
  return {
    billing: state.billing,
    userRes: state.login,
  }
}
mapDispatchToProps = dispatch => {
  return {
    AddPaymentCardAction: (params) => dispatch(AddPaymentCard(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: colors.bgColor
  },
  selectedButton: {
    width: WP('80'),
    height: WP('12'),
    backgroundColor: colors.black,
    marginVertical: WP('2')
  },
});