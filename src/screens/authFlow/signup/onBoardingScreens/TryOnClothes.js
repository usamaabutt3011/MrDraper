import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SmallTitle, LargeTitle, NormalText, Button } from '../../../../components';
import { WP, appImages, colors } from '../../../../services';
import { styles } from './onBoardingStyles';

export const TryOnClothes = props => {

    _onPressNext = () => {
        props.controlSlider(3)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LargeTitle
                text={`Here's How it Works`}
                style={styles.mainTitle}
            />
            <Image
                source={appImages.onBoardingImg3}
                style={styles.imgStyle}
            />
            <SmallTitle
                text={`Try on Clothes`}
                style={styles.subTitle}
            />
            <NormalText
                text={`Your stylist will send a box of clothes straight to your door.`}
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


export default TryOnClothes;
