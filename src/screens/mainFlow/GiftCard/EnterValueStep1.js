import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { CustomInputField, Header, GiftCardSteps, Button, LargeTitle, SmallText } from '../../../components';
import { WP, colors, family } from '../../../services';
import { styles } from './styles';
import { giftCardObj } from '../../../store/actions';
import Toast from 'react-native-simple-toast';

class EnterValueStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCustom: false,
      selectedValue: '',
      customValue: ''
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    const { isSuccess, isFailure, loading, error } = nextProps.giftCard;
    console.log('===componentWillReceiveProps: ', nextProps.giftCard);
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

  selectItem = async (value) => {
    this.setState({ isCustom: false, selectedValue: value })

    const { giftCardObjAction, giftCard } = this.props;
    var params = giftCard.giftCardObj
    params.amount = value;

    await giftCardObjAction(params);
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
          drawerLeft={true}
          right={true}
          titleStyle={{ color: colors.white }}
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <GiftCardSteps
          stepOneText={'Amount'}
          stepOneColored={true}
          // stepOneChecked={true}
          stepTwoText={'Recipient'}
          // stepTwoColored={true}
          // stepTwoChecked={true}
          stepThreeText={'Delivery'}
          // stepThreeColored={true}
          // stepThreeChecked={true}
          stepFourText={'Payment'}
          // stepFourColored={true}
          // stepFourChecked={true}
          progress={WP('15')} //83 total , per head= 6.9 , current =79.5
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
                text={`Gift Card Value`}
                style={{ width: '90%', fontSize: WP(9), marginHorizontal: WP('5'), marginVertical: WP('5') }}
              />
              <SmallText
                text={`Select gift card value`}
                style={{ color: colors.mediumGrey, marginHorizontal: WP('5'), alignSelf: 'flex-start', marginBottom: WP('6'), }}
              />
              {this.selectValueButton('300')}
              {this.selectValueButton('500')}
              {this.selectValueButton('1000')}
              {this.selectValueButton('2000')}
              {this.selectValueButton('3000')}

              <Button
                title={`Enter Custom Amount`}
                onPress={() => this.setState({ isCustom: true, selectedValue: '' })}
                style={isCustom ? styles.selectedButton : styles.unSelectedButton}
                titleStyle={{ color: isCustom ? colors.white : colors.black }}
              />

              {isCustom ?
                <View style={{ marginVertical: WP('5') }}>
                  <CustomInputField
                    label={'Enter Gift Card Value'}
                    placeholderText={'5000'}
                    keyboardType={'numeric'}
                    placeholderTextColor={colors.lightGrey}
                    isRightIcon={false}
                    onChangeText={(val) => { this.setState({ customValue: val.toUpperCase() }) }}
                    containerStyle={{}}
                    style={{ paddingHorizontal: WP(1) }}
                  />
                </View>
                : null
              }

              <View style={{ width: WP('80'), marginVertical: WP('5'), justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ alignSelf: 'center' }}>

                </View>
                <Button
                  title={'Next'}
                  onPress={() => this.navigateNextStep()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EnterValueStep1);
