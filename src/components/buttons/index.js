import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { WP, colors, size, family } from '../../services';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Button = props => {
    return (
        <View>
            {props.showLoader ?
                <View style={[buttonStyles.container, props.style]}
                >
                    <ActivityIndicator color="#fff" animating size={WP('10')} />
                </View>
                :
                <TouchableOpacity style={[buttonStyles.container, props.style]}
                    disabled={props.disabled}
                    onPress={props.onPress}
                >
                    {props.isShowIcon ?
                        <View style={buttonStyles.iconStyle}>
                            <Icon name={'magic'} size={20} color={'grey'} />
                        </View>
                        : null}
                    <Text style={[buttonStyles.btnText, props.titleStyle]}>{props.title}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}
const buttonStyles = StyleSheet.create({
    container: {
        display: 'flex',
        width: WP('80'),
        height: WP('13'),
        backgroundColor: colors.buttonColor,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: "#fff",
        fontFamily: family.boldText,
        fontSize: size.buttonText,
    },
    iconStyle: {
        marginHorizontal: 10,
    }
})

