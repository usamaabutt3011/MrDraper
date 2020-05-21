import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SmallTitle, LargeTitle, NormalText, Button } from '../../../../components';
import { WP, appImages, colors } from '../../../../services';
import { styles } from './onBoardingStyles';

export const KeepYouLike = props => {

    _onPressNext = () => {
        props.controlSlider(4)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LargeTitle
                text={`Here's How it Works`}
                style={styles.mainTitle}
            />
            <Image
                source={appImages.onBoardingImg4}
                style={styles.imgStyle}
            />
            <SmallTitle
                text={`Keep What You Like`}
                style={styles.subTitle}
            />
            <NormalText
                text={`Pay for the clothes you keep, we collect the rest.`}
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


export default KeepYouLike;
