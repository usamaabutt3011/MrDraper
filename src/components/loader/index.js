import React from 'react'
import { Platform, StyleSheet, ActivityIndicator } from 'react-native'
import { WP, colors } from '../../services';
import { styles } from '../../screens/authFlow/signup/preferencesScreens/styles';

export const Loader = props => {
    return (
        <ActivityIndicator
            color={props.color ? props.colors : colors.black}
            size={'small'}
            animating={true}
            style={[styles.loaderStyle, props.style]}
        />
    );
}
const inputFieldText = StyleSheet.create({
    loaderStyle: {
        
    },
});

