import React from 'react'
import { View, StyleSheet, ImageBackground, } from 'react-native';
import { LargeTitle } from '../text';
import { WP, colors } from '../../services';

export const ProfileHeader = props => {
    return (
        <View style={[headerStyles.container, props.containerStyle]}>
            <ImageBackground source={props.image} style={{ height: WP('40'), width: WP('100') }}>
                <View style={headerStyles.subContainer}>
                    <LargeTitle
                        text={props.title}
                        style={[headerStyles.titleStyle, props.titleStyle]}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}
const headerStyles = StyleSheet.create({
    container: {
        height: WP('40'),
        width: WP('100'),
    },
    subContainer: {
        height: WP('40'),
        width: WP('100'),
        justifyContent: 'center',
        backgroundColor: colors.blackTransparent
    },
    titleStyle: {
        color: colors.white,
        marginHorizontal: WP('5')
    }
});

