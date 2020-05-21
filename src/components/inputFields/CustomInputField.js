import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { WP, colors, family } from '../../services';
// import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker'
import PhoneInput from 'react-native-phone-input'

export const CustomInputField = props => {
    var date = new Date(); // M-D-YYYY
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var minDate = (y-18) + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    var maxDate = (y-18) + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    return (
        <View style={[inputFieldText.container, props.containerStyle]}>
            <Text style={[inputFieldText.labelStyle, props.labelStyle]}>{props.label}</Text>
            {
                props.isMaskedInput ?
                    props.PhoneInput ?
                        <PhoneInput
                            ref={props.ref}
                            initialCountry='ae'
                            disabled={false}
                            value={'051'}
                            autoFormat={true}
                            textProps={{ placeholder: '0513432342393', maxLength: 13 }}
                            textStyle={{ color: colors.black, fontSize: 16 }}
                            flagStyle={{ marginLeft: 5 }}
                            countriesList={props.countriesList}
                            style={{ width: WP('78'), marginBottom: 20 }}
                            allowZeroAfterCountryCode={true}
                            onSelectCountry={(iso2) => props.selectCountry(iso2)}
                        // onPressFlag={props.onPressFlag}
                        />
                        :
                        // <TextInputMask
                        //     refInput={ref => { this.input = ref }}
                        //     mask={props.masking}
                        //     value={props.value}
                        //     onChangeText={props.onChangeText}
                        //     keyboardType={props.keyboardType}
                        //     secureTextEntry={props.isPassword}
                        //     placeholder={props.placeholderText}
                        //     placeholderTextColor={props.placeholderTextColor}
                        //     style={[inputFieldText.inputStyle, props.style]}
                        // />
                        null
                    :
                    props.isCalender ?
                        <DatePicker
                            style={inputFieldText.calender}
                            date={props.date}
                            mode="date"
                            placeholder={props.placeholderText}
                            format="YYYY/MM/DD"
                            // minDate={minDate}
                            maxDate={maxDate}
                            showIcon={false}
                            hideText={false}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: inputFieldText.dateIcon,
                                dateInput: inputFieldText.dateInput,
                                dateText: inputFieldText.dateText
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => props.setDate(date)}
                        />
                        :
                        <TextInput
                            editable={props.disabled}
                            value={props.value}
                            onChangeText={props.onChangeText}
                            keyboardType={props.keyboardType}
                            autoCapitalize='none'
                            onFocus={props.onFocus}
                            multiline={props.multiLine}
                            secureTextEntry={props.secureTextEntry}
                            placeholder={props.placeholderText}
                            placeholderTextColor={props.placeholderTextColor}
                            style={[inputFieldText.inputStyle, props.style]}
                        />
            }
            {
                props.isRightIcon ?
                    <Icon
                        name={props.iconName}
                        size={22}
                        color={props.iconColor}
                        onPress={props.onPress}
                        style={[inputFieldText.iconStyle, props.iconStyle]} />
                    : null
            }
        </View>
    );
}

const inputFieldText = StyleSheet.create({
    container: {
        height: WP('14'),
        width: WP(80),
        borderRadius: 3,
        borderWidth: 1.5,
        borderColor: colors.black,
        marginBottom: WP('5'),
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row'
    },
    inputStyle: {
        height: WP('13'),
        width: WP('70'),
        marginHorizontal: WP(1),
        color: colors.black,
        fontFamily: 'Roboto-Regular',
        fontSize: WP('3.8'),
        backgroundColor: colors.white
    },
    calender: {
        height: WP('11'),
        width: WP('70'),
        marginTop: WP(1),
        marginHorizontal: WP(1),
        fontFamily: 'Roboto-Regular',
        fontSize: WP('3.8'),
        alignSelf: 'center',
    },
    labelStyle: {
        left: 0,
        top: -12,
        zIndex: 2,
        fontSize: 12,
        paddingVertical: 2,
        position: 'absolute',
        paddingHorizontal: WP('1.5'),
        backgroundColor: '#fff',
        marginHorizontal: WP('2'),
        fontFamily: family.normalText,
    },
    iconStyle: {
        alignSelf: 'center'
    },
    dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
    },
    dateInput: {
        alignItems: 'flex-start',
        marginLeft: 0,
        borderWidth: 0,
        height: WP('12'),
        width: WP('70'),
    },
    dateText: {
        color: colors.black,
        fontSize: WP('3.8'),
        paddingHorizontal: 5
    }
});

