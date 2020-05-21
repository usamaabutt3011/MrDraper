import React, { Component } from 'react';
import { View, ImageBackground, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import * as Util from '../../../services/index';
import { styles } from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast'
import { CustomInputField, Button, LargeTitle, SmallText, Header, Loader } from '../../../components';
import { colors, WP } from '../../../services';
import { megicLoginValidation } from '../../../store/actions';

class MegicLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', //ulugbek_u@hotmail.com
        }
    }

    showPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }
    validationForm = async () => {
        let { email } = this.state;
        if (email.length === 0) {
            Toast.show('Please enter your email address');
        } else {
            await this.submitEmail()
        }
    }
    componentWillReceiveProps(props) {
        console.log('[ComponentWillReceiveProps- megic-login.js] Props ', props.megicLoginRes)
        const {  } = this.state;
        if (props.megicLoginRes.isSuccess) {
            // Toast.show(props.megicLoginRes.userProfile.message)
            this.props.navigation.navigate('EmailVerificationScreen', { title: 'Email Sent!', desc: `We've sent you the magic link via email. Please use that to directly log in to your account.` })
        } else {
            if (props.megicLoginRes.isFailure) {
                Toast.show(props.megicLoginRes.error.message)
            }
        }

    }

    submitEmail = async () => {
        const { megicLoginAction } = this.props;
        try {
            let params = {
                email: this.state.email,
            };
            await megicLoginAction(params);
        } catch (error) {
            console.log('error=====>>>>>>>', error);
        }
    }

    loginCard = () => {
        const { megicLoginRes } = this.props;
        return (
            <View style={{ width: '90%', backgroundColor: '#fff', shadowOpacity: 0.2, elevation: 1, alignSelf: 'center', borderRadius: 3 }}>
                <LargeTitle
                    style={{ marginHorizontal: 20, marginTop: Util.WP('10') }}
                    text={'Tired of typing passwords?'}
                />
                <SmallText
                    text={`Get a magic link sent to your email that'll sign you in instantly!`}
                    style={{ marginHorizontal: 20, marginVertical: Util.WP('5'), color: colors.darkGrey }}
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
                    showLoader={megicLoginRes.loading}
                    title='NEXT'
                    style={{ alignSelf: 'center', marginBottom: Util.WP('10') }}
                    onPress={this.validationForm}
                />
            </View>
        )
    }

    render() {
        const { loading } = this.state;
        const { megicLoginRes } = this.props;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollView}
            >
                <ImageBackground
                    source={Util.appImages.loginBackground}
                    // resizeMode='contain'
                    style={styles.bgImgStyle}
                >
                    <Header
                        left={true}
                        onPressLeft={() => this.props.navigation.goBack()}
                        titleStyle={styles.headerTitle}
                    />
                    <View style={{ height: '15%' }} />
                    {
                        // megicLoginRes.loading ?
                        //     <View style={{ height: Util.WP('90'), width: '90%', backgroundColor: '#fff', justifyContent: 'center', shadowOpacity: 0.2, elevation: 1, alignItems: 'center', alignSelf: 'center', borderRadius: 3 }}>
                        //         <Loader />
                        //     </View>
                        //     :
                        this.loginCard()
                    }
                    <Text style={styles.footerText}>
                        Don't have an account?
                        <Text
                            style={styles.footerChild}
                            onPress={() => this.props.navigation.push('SignUp')}
                        > Get Started!
                        </Text>
                    </Text>
                </ImageBackground>
            </KeyboardAwareScrollView>
        );
    }
}


mapStateToProps = (state) => {
    return {
        megicLoginRes: state.megicLogin,
    }
}
mapDispatchToProps = dispatch => {
    return {
        megicLoginAction: (params) => dispatch(megicLoginValidation(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MegicLogin);
