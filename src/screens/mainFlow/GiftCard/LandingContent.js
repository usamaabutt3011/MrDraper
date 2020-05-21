import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { WP, colors, data, appImages } from '../../../services';
import { connect } from 'react-redux';
import { Header, SmallTitle, SmallText, LargeTitle, NormalText, Button } from '../../../components';
// import { packageRequest } from '../../../../../store/actions';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign'

class LandingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { } = this.state;
    // const { packageRequestObj } = this.props.packageRequest;
    return (
      <View style={styles.container}>
        <Header
          drawerLeft={true}
          right={true}
          titleStyle={{ color: colors.white }}
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onPressLeft={() => this.props.navigation.navigate('TabStack')}
        />
        <ScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.styleContainer}>
            <ImageBackground
              source={require('../../../assets/images/styles-bg.png')}
              style={{ height: WP('125'), width: WP('85'), resizeMode: 'contain' }}
            >
              <LargeTitle
                text={"Give The Gift \n of Style"}
                style={styles.title}
              />
              <NormalText
                text={`When they pick it themselves with the expert help of our stylists they're certain to get a gift they love.`}
                style={styles.normalText}
              />
              <NormalText
                text={`A Gift Card can be redeemed on handpicked items from a Mr.Draper box or an in-person appointment with one of our stylists. The stylists service comes free of charge, along with the delivery and returns!`}
                style={styles.normalText}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.push('EnterValueStep1')}
              >
                <SmallText
                  text={"send a gift card".toUpperCase()}
                  style={styles.smallText}
                />
                <Icon
                  name={'arrowright'}
                  color={colors.white}
                  size={WP(5)}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={{ alignItems: 'center' }}>
            <LargeTitle
              text={"How it works"}
              style={{ marginHorizontal: WP('6'), marginTop: WP('8'), marginBottom: WP('4') }}
            />
          </View>

          <View style={styles.onboardingContainer}>
            <Image
              source={appImages.onBoardingImg1}
              style={styles.imgStyle}
            />
            <SmallTitle
              text={`Send a Gift Card`}
              style={styles.subTitle}
            />
            <NormalText
              text={`Purchase a gift card and have it scheduled to be sent. The amount will automatically be added to their Mr.Drapper Wallet.`}
              style={styles.normalTextStyle}
            />
          </View>

          <View style={styles.onboardingContainer}>
            <Image
              source={appImages.onBoardingImg2}
              style={styles.imgStyle}
            />
            <SmallTitle
              text={`Connect with a Stylist`}
              style={styles.subTitle}
            />
            <NormalText
              text={`The recipient of your Gift Card will need to share a few details like prefrences, sizes and budget so their stylist can better personalize their outfits.`}
              style={styles.normalTextStyle}
            />
          </View>

          <View style={styles.onboardingContainer}>
            <Image
              source={appImages.onBoardingImg3}
              style={styles.imgStyle}
            />
            <SmallTitle
              text={`Try on Clothes`}
              style={styles.subTitle}
            />
            <NormalText
              text={`They will receive a personalize package to their front door and have 5 days to try everthing on.`}
              style={styles.normalTextStyle}
            />
          </View>

          <View style={styles.onboardingContainer}>
            <Image
              source={appImages.onBoardingImg4}
              style={styles.imgStyle}
            />
            <SmallTitle
              text={`Keep What You Like`}
              style={styles.subTitle}
            />
            <NormalText
              text={`They can keep what they love and we'll send someone to pick up the rest, free of charge`}
              style={styles.normalTextStyle}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    // packageRequest: state.packageRequestReducer,
  }
}
mapDispatchToProps = dispatch => {
  return {
    // packageRequestAction: (params) => dispatch(packageRequest(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContent);
