import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import { Header, Steps, Button, MediumTitle, SmallText, Calender } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { scheduleQuiz, ScheduleQuizObj } from '../../../../store/actions';
import { styles } from './styles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
var moment = require('moment');

const yml = data.member_settings_v7.en.style_profile_quiz.scheduling;

class NoteTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false,
            firstSlot: false,
            secondSlot: false,
            thirdSlot: false,
            selectedTimeSlot: '',
            selectedDay: '',
            dateSelected: {}
        }
    }
    toggleTimeSlot = (label, value) => {
        const { ScheduleQuizObjAction, scheduleQuiz } = this.props;
        var params = scheduleQuiz.scheduleQuizObj
        switch (label) {
            case 'first':
                this.setState({
                    selectedTimeSlot: value,
                    firstSlot: true,
                    secondSlot: false,
                    thirdSlot: false
                }, async () => {
                    params.package_send_time = value;
                    await ScheduleQuizObjAction(params)
                })
                break;
            case 'second':
                this.setState({
                    selectedTimeSlot: value,
                    firstSlot: false,
                    secondSlot: true,
                    thirdSlot: false
                }, async () => {
                    params.package_send_time = value;
                    await ScheduleQuizObjAction(params)
                })
                break;
            case 'third':
                this.setState({
                    selectedTimeSlot: value,
                    firstSlot: false,
                    secondSlot: false,
                    thirdSlot: true
                }, async () => {
                    params.package_send_time = value;
                    await ScheduleQuizObjAction(params)
                })
                break;
            default:
                break;
        }
    }
    selectItem = async (item) => {
        const { ScheduleQuizObjAction, scheduleQuiz } = this.props;
        var params = scheduleQuiz.scheduleQuizObj
        params.package_send_date = item;
        console.log('===========================================================================================================')
        console.log('[noteTwo.js] PantsFit obj edited', params)
        await ScheduleQuizObjAction(params)
        console.log('[noteTwo.js] PantsFit obj edited', scheduleQuiz.scheduleQuizObj)
        console.log('===========================================================================================================')
    }
    validate = async () => {
        const { scheduleQuiz } = this.props;
        var params = scheduleQuiz.scheduleQuizObj
        if (params.package_send_time == "") {
            Toast.show('Select Time Slot.')
        } else {
            if (params.package_send_date == "") {
                Toast.show('Select Date.')
            } else {
                this.props.navigation.push('NoteThree')
            }
        }
    }

    render() {
        const { scheduleQuiz } = this.props;
        var params = scheduleQuiz.scheduleQuizObj
        const { firstSlot, secondSlot, thirdSlot } = this.state;
        //Get current date
        var date = new Date(); // M-D-YYYY
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={true}
                        // onPressLeft={() => this.props.navigation.goBack()}
                        onPressLeft={() => this.props.navigation.navigate('ShirtsFit')}
                    />
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Steps
                            isCheckStyle={true}
                            isCheckPreference={true}
                            styleQuiz={true}  // chane the stepper text
                            isCheckStylist={false}
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={styles.subContainerPersonal}>
                            <MediumTitle
                                text={`${yml.q1}`}
                                style={{ marginHorizontal: WP('5'), marginTop: WP('5'), alignSelf: 'flex-start' }}
                            />
                            <SmallText
                                text='Select Time Slot'
                                style={{ marginTop: WP('9'), color: colors.mediumGrey }}
                            />
                            <View style={styles.twoButtonsContainer}>
                                <Button
                                    title={yml.timeslot_1}
                                    titleStyle={{ color: firstSlot ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, firstSlot ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleTimeSlot('first', yml.timeslot_1)}
                                />
                                <Button
                                    title={yml.timeslot_2}
                                    titleStyle={{ color: secondSlot ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, secondSlot ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleTimeSlot('second', yml.timeslot_2)}
                                />
                                <Button
                                    title={yml.timeslot_3}
                                    titleStyle={{ color: thirdSlot ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, thirdSlot ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleTimeSlot('third', yml.timeslot_3)}
                                />
                            </View>
                            <SmallText
                                text='Select Date'
                                style={{ color: colors.mediumGrey }}
                            />
                            {/* <Calender
                                markedDays={this.state.dateSelected}
                                onDayPress={(day)=> this.selectDay(day) }
                                // onDayPress={(day) => {
                                //     this.setState({
                                //         dateSelected: { [day.dateString]: { selected: true, selectedColor: '#466A8F' } }
                                //     }, () => {
                                //         console.log(this.state.dateSelected)
                                //     })
                                // }}
                            /> */}
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
                                            selectedDay: day.dateString
                                        }, () => {
                                            let d1 = moment(day.dateString);
                                            let date = d1.format('ll');
                                            console.log("Formated: ", date),
                                                this.selectItem(date)
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
                            <View style={{ width: WP('80') }}>
                                <Button
                                    title={'NEXT'}
                                    // disabled={params.package_send_date !== "" && params.package_send_time !== "" ? false : true}
                                    onPress={() => this.validate()}
                                    style={{ width: WP('25'), alignSelf: 'flex-end', marginBottom: WP('6'), marginTop: WP('10'), }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

mapStateToProps = (state) => {
    return {
        scheduleQuiz: state.scheduleQuiz,
        signup: state.signup,
    }
}
mapDispatchToProps = dispatch => {
    return {
        ScheduleQuizObjAction: (params) => dispatch(ScheduleQuizObj(params)),
        scheduleQuizAction: (params) => dispatch(scheduleQuiz(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTwo);
