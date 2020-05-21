import React, { useState, Component } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
// import { Header } from '../../../../components';
import { WP, colors } from '../../../../services';
import { styles } from './onBoardingStyles';
import { withNavigation } from 'react-navigation';

import CreateProfileDemo from './CreateProfile';
import ConnectAStylist from './ConnetAStylist';
import TryOnClothes from './TryOnClothes';
import KeepYouLike from './KeepYouLike';

const OnBoarding = props => {
    _controlSlider = (step) => {
        this._swiper.scrollBy(1, true);
        if (step === 4) {
            props.toggleModle(false)
            // props.navigation.push('StyleStack');
        }
    }
    return (
        <Modal
            animationInTiming={200}
            animationOutTiming={100}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            avoidKeyboard={true}
            transparent={true}
            isVisible={props.onBoarding}
            onBackdropPress={() => props.toggleModle(false)}
            style={{ flex: 1, justifyContent: 'flex-start' }}
        >
            <View style={{ height: WP('150'), width: '95%', alignSelf: 'center', marginTop: WP('14'), borderRadius: 5 }}>
                <Swiper
                    ref={(swiper) => { this._swiper = swiper; }}
                    index={0}
                    loop={false}
                    // autoplay={true}
                    dotColor={colors.bgColor}
                    activeDotColor={colors.black}
                    showsButtons={false}
                    style={styles.wrapper}
                >
                    <View style={styles.slideStyle}>
                        <CreateProfileDemo controlSlider={_controlSlider} />
                    </View>
                    <View style={styles.slideStyle}>
                        <ConnectAStylist controlSlider={_controlSlider} />
                    </View>
                    <View style={styles.slideStyle}>
                        <TryOnClothes controlSlider={_controlSlider} />
                    </View>
                    <View style={styles.slideStyle}>
                        <KeepYouLike controlSlider={_controlSlider} />
                    </View>
                </Swiper>
            </View>
        </Modal>
    );
}

export default withNavigation(OnBoarding);
