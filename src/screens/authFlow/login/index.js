import React, { Component } from 'react';
import { Platform, View, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import TouchID from 'react-native-touch-id';
import * as Util from '../../../services/index';
import { loginStyles } from './loginStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast'
import { CustomInputField, Button, LargeTitle, NormalText, Header, Loader, SmallText } from '../../../components';
import { colors, WP } from '../../../services';
import { withNavigation, ScrollView } from 'react-navigation';
import { emailValidation, loginValidation, appSettings } from '../../../store/actions';
import FingerPrintIcon from 'react-native-vector-icons/MaterialIcons';
import firebase, { messaging } from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';

const optionalConfigObject = {
    title: 'Mr.Draper', // Android
    imageColor: colors.orange, // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Sensor enabled.', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'ulugbek_u@hotmail.com', //ulugbek_u@hotmail.com
            password: 'mrdraper19',//mrdraper19
            showPassword: true,
            isModalVisible: false,
            first_screen: true,
            second_screen: true,
            bioLogin: false,
            deviceID: '',
        }
    }
    componentDidMount = async () => {
        let uniqueId = DeviceInfo.getUniqueId();
        // iOS: "iPhone7,2"
        // Android: "goldfish"
        // Windows: ?
        // await this.setState({ deviceID: uniqueId })
        // console.log('deviceID====----------:', uniqueId);

        await firebase.messaging().getToken().then((res) => {
            // console.log('-------------*****', res);
            this.setState({
                deviceID: res
            })
            // return res;
        }).catch((error) => console.log(error));

        const optionalConfigObject = {
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
        }
        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    // console.log('FaceID is supported.');
                } else {
                    // console.log('TouchID is supported.');
                }
            })
            .catch(error => {
                // Failure code
            });
    }
    signup = async () => {
        const { signup } = this.props;
        this.props.navigation.push('SignUp')
        // this.props.navigation.push('SignUp')
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    showPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }
    validationForm = async () => {
        let { email, password } = this.state;
        if (email == '') {
            Toast.show('Please enter your email address');
        } else {
            await this.submitEmail()
        }
    }
    componentWillReceiveProps = async (props) => {
        const { first_screen, second_screen } = this.state;
        console.log('email response===-----:', props.emailRes);
        if (first_screen) {
            if (props.emailRes.isSuccess) {
                this.setState({
                    first_screen: false,
                    second_screen: true
                })
                Toast.show(props.emailRes.user.message)
            } else {
                if (props.emailRes.error) {
                    Toast.show(props.emailRes.error.message)
                    props.emailRes.error = null;
                }
            }
        } else {
            //Login Response
            if (props.userRes.isSuccess) {
                props.userRes.isSuccess = false;
                if (!this.state.bioLogin) {
                    await props.appSettingsAction('login', {
                        email: this.state.email,
                        password: this.state.password
                    })
                }
                Toast.show(props.userRes.userProfile.message)
                this.props.navigation.replace('TabStack') //Home
            } else {
                if (props.userRes.error)
                    Toast.show('Please enter correct password!')
                props.userRes.error = null;
            }
        }
    }
    submitEmail = async () => {
        const { emailValidate, emailRes } = this.props;
        try {
            let params = {
                email: this.state.email
            };
            await emailValidate(params);
        } catch (error) {
            // console.log('error=====>>>>>>>', error);
        }
    }
    login = async (param) => {
        const { loginAction, userRes, settings, emailRes } = this.props;
        let params = {};
        if (settings.isLoggedIn && param == 'bio') {
            params = {
                email: settings.credentials.email,
                password: settings.credentials.password,
                user_id: emailRes.user.result.user_id,
                device_id: this.state.deviceID,
                device_type: Platform.OS === 'ios' ? "ios" : "android"
            };
            this.setState({ bioLogin: true })
        } else { // manual
            params = {
                email: this.state.email,
                password: this.state.password,
                user_id: emailRes.user.result.user_id,
                device_id: this.state.deviceID,
                device_type: Platform.OS === 'ios' ? "ios" : "android"
            };
        }
        try {
            console.log('params====----------:', params);
            await loginAction(params);
        } catch (error) {
            //error
        }
    }
    resetPassword = () => {
        this.props.navigation.push('ResetPassword')
    }
    sendMegicLink = () => {
        this.props.navigation.push('MegicLogin')
    }

    authentication = async () => {
        const { settings } = this.props;
        let msg;
        if (settings.isShow) {
            msg = 'Please scan your finger print to login.'
        } else {
            msg = 'Please scan your Face ID to login.'
        }
        TouchID.authenticate(msg, optionalConfigObject)
            .then(async (success) => {
                // Success code
                this.setState({ first_screen: false })
                await this.login('bio')
            })
            .catch(error => {
                // Failure code
                Toast.show('Please try again')
            });
    }

    loginFirstScreen = () => {
        const { emailRes, userRes } = this.props;
        return (
            <View style={{ width: '90%', backgroundColor: '#fff', shadowOpacity: 0.2, elevation: 1, alignSelf: 'center', borderRadius: 3 }}>
                <LargeTitle
                    style={{ marginHorizontal: 20, marginVertical: Util.WP('10') }}
                    text={'Log In'}
                />
                <CustomInputField
                    label={'Email Address'}
                    isRightIcon={false}
                    isMaskedInput={false}
                    secureTextEntry={false}
                    placeholderText={'email@address.com'}
                    placeholderTextColor={colors.lightGrey}
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.setState({ email: text })}
                    containerStyle={{ marginHorizontal: WP('5') }}
                    style={{ paddingHorizontal: WP(1) }}
                />
                <Button
                    isShowIcon={false}
                    showLoader={emailRes.loading || userRes.loading}
                    title='NEXT'
                    style={{ alignSelf: 'center' }}
                    onPress={this.validationForm}
                />
                <Button
                    isShowIcon={true}
                    title='LOG IN VIA MAGIC LINK'
                    onPress={this.sendMegicLink}
                    titleStyle={{ color: Util.colors.darkGrey }}
                    style={{ alignSelf: 'center', marginTop: Util.WP('5'), backgroundColor: Util.colors.buttonColorLight, marginBottom: Util.WP('10') }}
                />
            </View>
        )
    }
    loginSecondScreen = () => {
        const { userRes, emailRes } = this.props;
        return (
            <View style={{ width: '90%', backgroundColor: '#fff', shadowOpacity: 0.2, elevation: 1, alignItems: 'center', alignSelf: 'center', borderRadius: 3 }}>
                <NormalText
                    text={'Welcome'}
                    style={{ marginTop: Util.WP('8') }}
                />
                {
                    emailRes.isSuccess ?
                        <Avatar
                            rounded
                            size="large"
                            containerStyle={{ marginVertical: 10 }}
                            source={{
                                uri: emailRes.user.result.pic
                            }}
                            // onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                        : null
                }
                <NormalText
                    text={emailRes.isSuccess ? emailRes.user.result.name : ''}
                    style={{ marginBottom: Util.WP('8'), fontFamily: 'Lato-Bold' }}
                />
                <CustomInputField
                    label={'Enter Password'}
                    isRightIcon={false}
                    isMaskedInput={false}
                    secureTextEntry={true}
                    placeholderText="*****"
                    placeholderTextColor={colors.lightGrey}
                    keyboardType={'default'}
                    onChangeText={(text) => this.setState({ password: text })}
                    containerStyle={{ marginHorizontal: WP('5') }}
                    style={{ paddingHorizontal: WP(1) }}
                />
                <Button
                    isShowIcon={false}
                    showLoader={userRes.loading}
                    title='NEXT'
                    style={{ alignSelf: 'center', marginBottom: Util.WP('5') }}
                    onPress={() => this.login('manual')}
                />
                <Text style={loginStyles.forgetCon}>
                    Forgot Password?
                    <Text style={loginStyles.forgetChild} onPress={this.resetPassword}> Reset</Text>
                </Text>
            </View>
        )
    }

    render() {
        const { first_screen, second_screen } = this.state;
        const { userRes, emailRes, settings } = this.props;

        return (
            <KeyboardAwareScrollView
                contentContainerStyle={loginStyles.scrollView}
            >
                <ImageBackground
                    source={Util.appImages.loginBackground}
                    // resizeMode='contain'
                    style={loginStyles.bgImgStyle}
                >
                    <Header
                        titleStyle={loginStyles.headerTitle}
                    />
                    <ScrollView>
                        <View style={{ height: WP('30') }} />
                        {
                            first_screen ?
                                this.loginFirstScreen()
                                :
                                second_screen && emailRes.isFailure == false ?
                                    this.loginSecondScreen()
                                    :
                                    <View style={{ height: Util.WP('90'), width: '90%', backgroundColor: '#fff', justifyContent: 'center', shadowOpacity: 0.2, elevation: 1, alignItems: 'center', alignSelf: 'center', borderRadius: 3 }}>
                                        <Loader />
                                    </View>
                        }
                        <Text style={loginStyles.footerText}>
                            Don't have an account?
                            <Text
                                style={loginStyles.footerChild}
                                onPress={() => this.signup()}
                            > Get Started!
                            </Text>
                        </Text>
                        {
                            settings.isShow || settings.isShowFaceID ?
                                <View>
                                    <TouchableOpacity
                                        style={{ alignSelf: 'center', alignItems: 'center', }}
                                        onPress={() => this.authentication()}>
                                        {
                                            settings.isShow ?
                                                <FingerPrintIcon
                                                    name={'fingerprint'}
                                                    color={colors.buttonColor}
                                                    size={WP('15')}
                                                    style={{ marginHorizontal: 2, marginVertical: 5 }}
                                                />
                                                :
                                                settings.isShowFaceID ?
                                                    <Image
                                                        source={Util.appImages.facerecognition}
                                                        style={{ height: WP('14'), width: WP('14'), resizeMode: 'contain' }}
                                                    />
                                                    : null
                                        }
                                    </TouchableOpacity>
                                    <SmallText
                                        text={'Biometric'}
                                        style={{ fontSize: WP('3'), alignSelf: 'center', marginTop: WP('2'), marginBottom: WP('5') }}
                                    />
                                </View>
                                :
                                null
                        }

                    </ScrollView>
                </ImageBackground>
            </KeyboardAwareScrollView>
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
        emailValidate: (params) => dispatch(emailValidation(params)),
        loginAction: (params) => dispatch(loginValidation(params)),
        appSettingsAction: (params, data) => dispatch(appSettings(params, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Login));
