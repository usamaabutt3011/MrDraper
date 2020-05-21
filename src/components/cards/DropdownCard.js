import React from 'react'
import { Platform, View, StyleSheet, Text } from 'react-native'
import { WP, colors, family } from '../../services'
import { SmallTitle } from '../../components'
import DropDownIcon from 'react-native-vector-icons/AntDesign'
import SwitchSelector from "react-native-switch-selector";
// import ModalDropdown from 'react-native-modal-dropdown';
import RNPickerSelect from 'react-native-picker-select';

export const DropDownCard = props => {
    return (
        <View style={[styles.container, props.style]}>
            {
                props.headerEnable ?
                    <View style={styles.switchContainer}>
                        <SmallTitle
                            text={props.title}
                        />
                        {
                            props.buttonEnabled ?
                                <SwitchSelector
                                    options={props.buttonOptions}
                                    initial={0}
                                    bold={false}
                                    buttonMargin={0}
                                    borderRadius={2}
                                    height={WP('7')}
                                    buttonColor={'#000'}
                                    backgroundColor={colors.bgColor}
                                    textStyle={{ fontSize: 10, color: 'grey' }}
                                    textContainerStyle={{ width: WP('10'), }}
                                    selectedTextContainerStyle={{ width: WP('10') }}
                                    selectedTextStyle={{ fontSize: 11, color: 'white', fontWeight: 'bold' }}
                                    style={{ height: WP('7'), width: WP(10 * props.buttons) }}
                                    onPress={value => props.onPressSwitch(value)}
                                />
                                :
                                null
                        }
                    </View>
                    :
                    null
            }
            <View style={[styles.dropdownContainer, props.dropdownCon]}>
                <Text style={[styles.labelStyle, props.labelStyle]}>{props.label}</Text>
                <View style={{ flex: 1, marginHorizontal: WP(2) }}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        value={props.value}
                        disabled={props.disabled}
                        onValueChange={(value, index) => props.onSelectItem(index, value)}
                        items={props.dropDownOptions}
                        style={pickerSelectStyles}
                    ></RNPickerSelect>
                </View>
                {/* <ModalDropdown
                    // defaultValue={props.value}
                    disabled={props.disabled}
                    renderRow={(option, index, isSelected) => {
                        if (props.convertFoot) {
                            var foot, subString, footCal;
                            footCal = (option / 12).toFixed('1')
                            subString = footCal.split(".")
                            foot = subString[0] + "' " + subString[1] + "''"
                        }
                        return (
                            <View style={{ height: WP('8'), width: '100%', justifyContent: 'center' }}>
                                <Text style={{ paddingHorizontal: 5, fontSize: WP('3.5'), fontWeight: isSelected ? 'bold' : 'normal' }}>
                                    {
                                        props.convertFoot ?
                                            foot
                                            :
                                            option
                                    }
                                </Text>
                            </View>
                        )
                    }}
                    renderButtonText={(text) => {
                        if (props.convertFoot) {
                            var foot, subString, footCal;
                            footCal = (text / 12).toFixed('1')
                            subString = footCal.split(".")
                            foot = subString[0] + "' " + subString[1] + "''"
                        }
                        return (
                            <Text style={{ paddingHorizontal: 5, fontSize: WP('3.5') }}>
                                {
                                    props.convertFoot ?
                                        foot
                                        :
                                        text
                                }
                            </Text>
                        )
                    }}
                    options={props.dropDownOptions}
                    dropdownStyle={[styles.dropdownStyle, props.dropdwonStyle]}
                    textStyle={styles.textStyle}
                    style={[styles.dropdownConStyle, props.dropdownConStyle]}
                    onSelect={(index, value) => props.onSelectItem(index, value)}
                >
                    {
                        props.child ?
                            <Text style={styles.textStyle}>{props.value}</Text>
                            : null
                    }
                </ModalDropdown> */}
                {
                    props.hideIcon ?
                        null
                        :
                        <DropDownIcon
                            name='caretdown'
                            size={10}
                            color='black'
                            style={[styles.iconStyle, props.iconStyle]}
                        />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: WP('90'),
        height: WP('38'),
        backgroundColor: colors.white
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: WP('5'),
        marginHorizontal: WP('5'),
        justifyContent: 'space-between'
    },
    dropdownContainer: {
        borderWidth: 1,
        width: WP('80'),
        height: WP('13'),
        borderRadius: 3,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        marginHorizontal: WP('5'),
    },
    labelStyle: {
        left: 0,
        top: -12,
        zIndex: 3,
        fontSize: 12,
        paddingVertical: 2,
        position: 'absolute',
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        marginHorizontal: WP('3'),
        fontFamily: family.normalText,
    },
    dropdownConStyle: {
        width: WP('79'),
        height: WP('12'),
        position: 'relative',
        zIndex: 2,
        justifyContent: 'center',
        paddingHorizontal: WP('3'),
        paddingLeft: 0,
        backgroundColor: 'transparent',
    },
    dropdownStyle: {
        height: WP('30'),
        width: WP('79'),
    },
    textStyle: {
        fontSize: 14,
        // height: WP('12'),
        width: WP('79'),
        color: colors.black,
        padding: 15,
        backgroundColor: 'transparent'
    },
    iconStyle: {
        marginHorizontal: WP('3'),
        zIndex: 1,
        position: 'absolute',
        right: 10
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        // fontSize: 16,
        color: colors.black,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        // fontSize: 16,
        color: colors.black,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
