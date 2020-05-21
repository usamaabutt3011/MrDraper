import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import { WP, colors } from '../../services';

export const MaterialInputField = props => {
    return (
        <TextInput
            mode='outlined'
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            label={props.label}
            theme={{
                roundness: 5,
                colors: {
                    primary: '#000',
                    underlineColor: 'transparent',
                },
                borderWidth: 0.6
            }}
            style={[inputFieldText.inputStyle, props.style]}
            placeholder={props.placeholderText}
            placeholderTextColor={props.placeholderTextColor}
            value={props.value}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
        />
    );
}

const inputFieldText = StyleSheet.create({
    inputStyle: {
        height: WP('13'),
        width: "88%",
        fontFamily: 'Roboto-Regular',
        fontSize: WP('3.8'),
        paddingVertical: 0,
        backgroundColor: colors.white
    },
});

                {/* <MaterialInputField
                    secureTextEntry={false}
                    keyboardType={'email-address'}
                    label='Email Address'
                    placeholderText="email@address.com"
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={{ marginHorizontal: 20, marginBottom: Util.WP('10') }}
                /> */}