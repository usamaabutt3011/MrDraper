import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { WP, colors, data, appImages } from '../../../services';
import { connect } from 'react-redux';
import { Header, SmallTitle, SmallText, LargeTitle, NormalText, Button } from '../../../components';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';
import { appSettings, faceIDSettings } from '../../../store/actions';
import TouchID from 'react-native-touch-id';
import Toast from 'react-native-simple-toast';

class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabledPromo: false,
      isEnabledMessage: false,
      isEnabledFace: false,
      isEnabledTouch: false,
      isFaceID: false,
      isTouchID: false
    }
  }

  toggleSwitch = async (button) => {
    switch (button) {
      case 'promotion':
        this.setState({ isEnabledPromo: !this.state.isEnabledPromo });
        break;
      case 'message':
        this.setState({ isEnabledMessage: !this.state.isEnabledMessage });
        break;
      case 'touchID':
        this.setState({
          isEnabledTouch: !this.state.isEnabledTouch
        }, () => {
          this.handleTouchID(this.state.isEnabledTouch)
        });
        break;
      case 'faceID':
        this.setState({
          isEnabledFace: !this.state.isEnabledFace
        }, () => {
          this.handleFaceID(this.state.isEnabledFace)
        });
        break;
      default:
        break;
    }
  }

  componentWillMount = () => {
    const { settings } = this.props;
    this.setState({
      isEnabledTouch: settings.isShow,
      isEnabledFace: settings.isShowFaceID
    })
    console.log('[appSettings.js] componentWillMount===:', this.props);
  }

  handleTouchID = async (isShow) => {
    const { appSettingsAction, faceIDSettingsAction } = this.props;
    if (isShow) {
      await appSettingsAction('show')
      Toast.show(`Touch Id is activated`)
    } else {
      await appSettingsAction('hide')
    }
  }
  handleFaceID = async (isShow) => {
    const { faceIDSettingsAction } = this.props;
    if (isShow) {
      await faceIDSettingsAction('show')
      Toast.show(`Face Id is activated`)
    } else {
      await faceIDSettingsAction('hide')
    }
    // faceIDSettingsAction
  }
  componentWillReceiveProps(nextProps) {
    const { settings } = nextProps;
    console.log('[appSettings.js] componentWillMount===:', nextProps);
    if (settings.isShow) {
      this.setState({
        isEnabledTouch: true,
        isEnabledFace: false
      })
    } else {
      if (settings.isShowFaceID) {
        this.setState({
          isEnabledTouch: false,
          isEnabledFace: true
        })
      }
    }
  }
  componentDidMount = () => {
    const { isFaceID, isTouchID } = this.state;

    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          this.setState({
            isFaceID: true,
            isTouchID: false
          })
          console.log('FaceID is supported.');
        } else {
          this.setState({
            isFaceID: false,
            isTouchID: true
          })
          console.log('TouchID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        console.log("error========:", error);
      });
  }
  render() {
    const { isEnabledPromo, isEnabledMessage, isEnabledFace, isFaceID, isTouchID } = this.state;
    const { settings } = this.props;
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
          <View style={{ marginHorizontal: WP('6') }}>
            <LargeTitle
              text={`App Settings`}
              style={{ alignSelf: 'flex-start', fontSize: WP('7'), marginVertical: WP('5') }}
            />
            {/* <SmallText
              text={`PUSH NOTIFICATIONS`}
              style={{ color: colors.mediumGrey, alignSelf: 'flex-start', marginVertical: WP('2') }}
            /> */}
          </View>
          {/* <View style={styles.rowContainer}>
            <SmallText
              text={`Promotions`}
              style={{ alignSelf: 'flex-start', marginVertical: WP('2') }}
            />
            <Switch
              trackColor={{ false: colors.lightGrey, true: colors.buttonColor }}
              // thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
              ios_backgroundColor={colors.lightGrey}
              onValueChange={() => this.toggleSwitch('promotion')}
              value={isEnabledPromo}
            />
          </View>
          <View style={styles.rowContainer}>
            <SmallText
              text={`Messages`}
              style={{ alignSelf: 'flex-start', marginVertical: WP('2') }}
            />
            <Switch
              trackColor={{ false: colors.lightGrey, true: colors.buttonColor }}
              // thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
              ios_backgroundColor={colors.lightGrey}
              onValueChange={() => this.toggleSwitch('message')}
              value={isEnabledMessage}
            />
          </View> */}
          {
            isTouchID || isFaceID ?
              <View>
                <View style={{ marginHorizontal: WP('6'), marginTop: WP('8'), marginBottom: WP('2') }}>
                  <SmallText
                    text={`SCREEN LOCK`}
                    style={{ color: colors.mediumGrey, alignSelf: 'flex-start', }}
                  />
                </View>
                {
                  isTouchID ?
                    <View style={styles.rowContainer}>
                      <SmallText
                        text={`Require Touch ID`}
                        style={{ alignSelf: 'flex-start', marginVertical: WP('2') }}
                      />
                      <Switch
                        trackColor={{ false: colors.lightGrey, true: colors.buttonColor }}
                        // thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor={colors.lightGrey}
                        onValueChange={() => this.toggleSwitch('touchID')}
                        // value={isEnabledFace}
                        value={settings.isShow}
                      />
                    </View>
                    :
                    null
                }
                {
                  isFaceID ?
                    <View style={styles.rowContainer}>
                      <SmallText
                        text={`Require Face ID`}
                        style={{ alignSelf: 'flex-start', marginVertical: WP('2') }}
                      />
                      <Switch
                        trackColor={{ false: colors.lightGrey, true: colors.buttonColor }}
                        // thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor={colors.lightGrey}
                        onValueChange={() => this.toggleSwitch('faceID')}
                        // value={isEnabledFace}
                        value={settings.isShowFaceID}
                      />
                    </View>
                    : null
                }
                <View style={{ marginHorizontal: WP('6'), marginVertical: WP('2') }}>
                  <SmallText
                    text={`require ${isTouchID ? 'Touch' : 'Face'} ID to unlock Mr.Draper everytime.`}
                    style={{ color: colors.mediumGrey, alignSelf: 'flex-start', }}
                  />
                </View>
              </View>
              :
              null
          }
          <View style={{ height: WP('90'), alignItems: 'center', justifyContent: 'center' }}>
            <SmallText
              text={`Version 1.0.0`}
              style={{ color: colors.mediumGrey, alignSelf: 'center', marginVertical: WP('2') }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    userRes: state.login,
    signup: state.signup,
    settings: state.settingReducer,
    emailRes: state.emailValidate,
  }
}
mapDispatchToProps = dispatch => {
  return {
    appSettingsAction: (params) => dispatch(appSettings(params)),
    faceIDSettingsAction: (params) => dispatch(faceIDSettings(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AppSettings));
