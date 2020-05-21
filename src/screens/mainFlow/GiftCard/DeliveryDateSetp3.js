import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { CustomInputField, Header, GiftCardSteps, Button, LargeTitle, SmallText } from '../../../components';
import { WP, colors, family } from '../../../services';
import { styles } from './styles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from "moment"
import Toast from 'react-native-simple-toast';
import { giftCardObj } from '../../../store/actions';


class DeliveryDateSetp3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: {},
      selectedDay: ""
    }
  }

  componentWillReceiveProps = async (nextProps) => {
    const { isSuccess, isFailure, loading, error } = nextProps.giftCard;
    console.log('===componentWillReceiveProps: ', nextProps.giftCard);
  }

  saveDate = async () => {
    // send_date
    const { giftCard } = this.props;
    var params = giftCard.giftCardObj;

    if (this.state.selectedDay) {
      params.send_date = this.state.selectedDay;
      await this.props.giftCardObjAction(params);
      this.props.navigation.push('PaymentStep4')
    } else {
      Toast.show("Please select date")
    }
  }

  render() {
    const { } = this.state;

    var date = new Date(); // M-D-YYYY
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

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
          // stepThreeChecked={true}
          stepFourText={'Payment'}
          // stepFourColored={true}
          // stepFourChecked={true}
          progress={WP('65')} //83 total , per head= 6.9 , current =79.5
        />
        <ScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

          <View style={{ height: WP('5') }} />
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white }}>
              <LargeTitle
                text={`Select Email Delivery Date`}
                style={{ width: '90%', alignSelf: 'center', fontSize: WP(9), marginHorizontal: WP('5'), marginVertical: WP('5') }}
              />
              <SmallText
                text={`Select Date`}
                style={{ color: colors.mediumGrey, marginHorizontal: WP('5'), alignSelf: 'center', marginBottom: WP('6'), }}
              />

              <View style={{ width: WP('90'), backgroundColor: colors.white, alignSelf: 'center', borderRadius: 5, overflow: 'hidden', justifyContent: 'center' }}>
                <Calendar
                  markedDates={this.state.dateSelected}
                  // Initially visible month. Default = Date()
                  // current={date}
                  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                  minDate={dateString}
                  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                  maxDate={'2022-01-01'}
                  // Handler which gets executed on day press. Default = undefined
                  onDayPress={(day) => {
                    this.setState({
                      dateSelected: { [day.dateString]: { selected: true, selectedColor: colors.black } },
                      selectedDay: moment(day.dateString).format('MM/DD/YYYY')
                    })
                  }}
                  // Handler which gets executed on day long press. Default = undefined
                  onDayLongPress={(day) => { console.log('selected day', day) }}
                  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                  monthFormat={'yyyy MM'}
                  // Handler which gets executed when visible month changes in calendar. Default = undefined
                  onMonthChange={(month) => { console.log('month changed', month) }}
                  // Hide month navigation arrows. Default = false
                  hideArrows={false}
                  // Replace default arrows with custom ones (direction can be 'left' or 'right')
                  // renderArrow={(direction) => {
                  //     console.log('direction: ',direction);
                  //     return(
                  //         <View style={{ height: WP('5'), width: WP('80'), backgroundColor:'transparent' }}>

                  //         </View>
                  //     )
                  // }}
                  // Do not show days of other months in month page. Default = false
                  hideExtraDays={true}
                  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                  // day from another month that is visible in calendar page. Default = false
                  disableMonthChange={false}
                  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                  firstDay={1}
                  // Hide day names. Default = false
                  hideDayNames={false}
                  // Show week numbers to the left. Default = false
                  showWeekNumbers={true}
                  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                  onPressArrowLeft={substractMonth => substractMonth()}
                  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                  onPressArrowRight={addMonth => addMonth()}
                  // Disable left arrow. Default = false
                  disableArrowLeft={false}
                  // Disable right arrow. Default = false
                  disableArrowRight={false}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: colors.black,
                    selectedDayBackgroundColor: 'white',
                    selectedDayTextColor: 'white',
                    todayTextColor: 'black',
                    // todayBackgroundColor: 'silver',
                    dayTextColor: 'black',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    arrowColor: 'black',
                    monthTextColor: 'black',
                    textDayFontSize: 14,
                    textMonthFontSize: 12,
                    textDayHeaderFontSize: 12,
                  }}
                />
              </View>

              <View style={{ width: WP('80'), marginVertical: WP('5'), justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ alignSelf: 'center' }}>

                </View>
                <Button
                  title={'Next'}
                  onPress={() => this.saveDate()}
                  style={{ width: WP('30'), height: WP('12') }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDateSetp3);
