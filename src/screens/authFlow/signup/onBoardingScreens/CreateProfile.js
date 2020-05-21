import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SmallTitle, LargeTitle, NormalText, Button } from '../../../../components';
import { WP, appImages, colors } from '../../../../services';
import { styles } from './onBoardingStyles';

export const CreateProfileDemo = props => {

    _onPressNext = () => {
        props.controlSlider(1)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LargeTitle
                text={`Here's How it Works`}
                style={styles.mainTitle}
            />
            <Image
                source={appImages.onBoardingImg1}
                style={styles.imgStyle}
            />
            <SmallTitle
                text={`Create a Profile`}
                style={styles.subTitle}
            />
            <NormalText
                text={`We record your sizes and fit preferences.`}
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


export default CreateProfileDemo;
