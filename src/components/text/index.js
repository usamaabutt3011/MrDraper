import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { WP } from '../../services';
import { size, family, colors } from '../../services';

// Title Texts
export const LargeTitle = props => {
    return (
        <Text 
            style={[styles.largeTitleStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const MediumTitle = props => {
    return (
        <Text 
            style={[styles.mediumTitleStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const SmallTitle = props => {
    return (
        <Text 
            style={[styles.smallTitleStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const TinyTitle = props => {
    return (
        <Text 
            style={[styles.tinyTitleStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
// Normal Texts
export const LargeText = props => {
    return (
        <Text 
            style={[styles.largeTextStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const MediumText = props => {
    return (
        <Text 
            style={[styles.mediumTextStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const NormalText = props => {
    return (
        <Text 
            style={[styles.normalTextStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const SmallText = props => {
    return (
        <Text 
            style={[styles.smallTextStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}
export const TinyText = props => {
    return (
        <Text 
            style={[styles.tinyTextStyle, props.style]}
            >
            {props.text}
        </Text>
    );
}

const styles = StyleSheet.create({
    largeTitleStyle: {
        fontSize: size.largeTitle,
        fontFamily: family.boldTitle,
        color: colors.drakBlack,
    },
    mediumTitleStyle: {
        fontSize: size.mediumTitle,
        fontFamily: family.boldTitle,
        color: colors.drakBlack,
    },
    smallTitleStyle: {
        fontSize: size.smallTitle,
        fontFamily: family.boldTitle,
        color: colors.drakBlack,
    },
    tinyTitleStyle: {
        fontSize: size.tinyTitle,
        fontFamily: family.boldTitle,
        color: colors.drakBlack,
    },
    largeTextStyle: {
        fontSize: size.largeText,
        fontFamily: family.normalText,
        color: colors.drakBlack,
    },
    mediumTextStyle: {
        fontSize: size.mediumText,
        fontFamily: family.normalText,
        color: colors.drakBlack,
    },
    normalTextStyle: {
        fontSize: size.normalText,
        fontFamily: family.normalText,
        color: colors.drakBlack,
        lineHeight: WP('6')
    },
    smallTextStyle: {
        fontSize: size.smallText,
        fontFamily: family.normalText,
        color: colors.drakBlack,
    },
    tinyTextStyle: {
        fontSize: size.tinyText,
        fontFamily: family.normalText,
        color: colors.drakBlack,
    }

});

