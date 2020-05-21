import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SmallTitle, LargeTitle, NormalText, Button } from '../../../../components';
import { WP, appImages, colors } from '../../../../services';
import { styles } from './onBoardingStyles';

export const ConnectAStylist = props => {

    _onPressNext = () => {
        props.controlSlider(2)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LargeTitle
                text={`Here's How it Works`}
                style={styles.mainTitle}
            />
            <Image
                source={appImages.onBoardingImg2}
                style={styles.imgStyle}
            />
            <SmallTitle
                text={`Connect with a Stylist`}
                style={styles.subTitle}
            />
            <NormalText
                text={`Connect with a Stylist Identify the clothing and trends that match your lifestyle.`}
                style={styles.normalTextStyle}
            />
            <Button 
                title={'NEXT'}
                style={styles.buttonStyle}
                onPress={_onPressNext}
            />
        </View>
    );
}

export default ConnectAStylist;
