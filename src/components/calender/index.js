import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { WP, colors } from '../../services';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export const Calender = props => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // console.log('date',date)
    console.log('Marked Date:', props.markedDays)
    // const period = props.markedDays

    const [period, setPeriod] = useState(props.markedDays)
    return (
        // <Modal
        //     animationInTiming={200}
        //     animationOutTiming={100}
        //     animationIn="slideInLeft"
        //     animationOut="slideOutRight"
        //     avoidKeyboard={true}
        //     transparent={true}
        //     isVisible={props.activeCalender}
        //     onBackdropPress={() => props.toggleModle()}
        //     style={{ flex: 1, justifyContent: 'center'}}
        // >
            <View style={{ height: WP('80'), width: WP('90'),backgroundColor: colors.white , alignSelf: 'center',borderRadius: 5, overflow: 'hidden', justifyContent:'center' }}>
                <Calendar
                    // Collection of dates that have to be marked. Default = {}
                    markedDates={{
                        '2020-02-13': {selected: true, marked: true, selectedColor: 'blue'},
                        '2020-02-14': {marked: true},
                        '2020-02-15': {marked: true, dotColor: 'red', activeOpacity: 0},
                        '2020-02-16': {disabled: true, disableTouchEvent: true}
                    }}
                    // markedDates={period}
                    // markedDates={period}
                    // Initially visible month. Default = Date()
                    current={date}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'1999-01-01'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2022-01-01'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={props.onDayPress}
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
                        textSectionTitleColor: 'red',
                        selectedDayBackgroundColor: 'orange',
                        selectedDayTextColor: 'white',
                        todayTextColor: 'white',
                        todayBackgroundColor: 'silver',
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
        // </Modal>
    );
}

const styles = StyleSheet.create({
    mainTitle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        marginVertical: WP('5')
    },
    imgStyle: {
        height: WP('40'),
        width: WP('100'),
        resizeMode: 'contain'
    },
    subTitle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        marginTop: WP('5')
    },
    normalTextStyle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        color: colors.black,
        marginTop: WP('2')
    },
    buttonStyle: {
        height: WP('12'),
        width: WP('64'),
        marginTop: WP('12')
    },

    wrapper: {

    },
    slideStyle: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})
