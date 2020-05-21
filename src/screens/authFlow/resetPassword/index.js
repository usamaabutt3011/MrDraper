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
import { resetPassword } from '../../../store/actions';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', //ulugbek_u@hotmail.com         
        }
    }

    validationForm = async () => {
        let { email, password } = this.state;
        if (email.length === 0) {
            Toast.show('Please enter your email address');
        } else {
            await this.resetPassword()
        }
    }
    componentWillReceiveProps(props) {
        console.log('[ComponentWillReceiveProps- reset-password.js] Props ', props.resetRes)
        if (props.resetRes.isSuccess) {
            // Toast.show(props.resetRes.userProfile.message)
            this.props.navigation.navigate('EmailVerificationScreen', { title: 'Email Sent!', desc: `We've sent you a link to reset your password at "${this.state.email}" Please check your inbox.` })
    } else {
            if (props.resetRes.isFailure) {
                Toast.show(props.resetRes.error.message)
            }
        }
    }
    
    resetPassword = async () => {
        const { resetPasswordAction } = this.props;
        try {
            let params = {
                email: this.state.email,
            };
            await resetPasswordAction(params);
        } catch (error) {
            console.log('error=====>>>>>>>', error);
        }
    }

    resetCard = () => {
        const { resetRes } = this.props;
        return (
            <View style={{ width: '90%', backgroundColor: '#fff', shadowOpacity: 0.2, elevation: 1, alignSelf: 'center', borderRadius: 3 }}>
                <LargeTitle
                    style={{ marginHorizontal: 20, marginTop: Util.WP('10') }}
                    text={'Reset Password'}
                />
                <SmallText
                    text={'Enter the email you registered with and we will send you instructions to reset your password'}
                    style={{ marginHorizontal: 20, marginVertical: Util.WP('5'), color: colors.darkGrey }}
                />
                <CustomInputField
                    label={'Email Address'}
                    isRightIcon={false}
                    isMaskedInput={false}
                    secureTextEntry={false}
                    placeholderText="email@address.com"
                    placeholderTextColor={colors.lightGrey}
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.setState({ email: text })}
                    containerStyle={{ marginHorizontal: WP('5') }}
                    style={{ paddingHorizontal: WP(1) }}
                />
                <Button
                    isShowIcon={false}
                    showLoader={resetRes.loading}
                    title='NEXT'
                    style={{ alignSelf: 'center', marginBottom: Util.WP('10') }}
                    onPress={this.validationForm}
                />
            </View>
        )
    }
  
    render() {
        const { loading } = this.state;
        const {  } = this.props;
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
                        onPressLeft={()=> this.props.navigation.goBack()}
                        titleStyle={styles.headerTitle}
                    />
                    <View style={{ height: '15%' }} />
                    {
                        loading ?
                            <View style={{ height: Util.WP('90'), width: '90%', backgroundColor: '#fff', justifyContent: 'center', shadowOpacity: 0.2, elevation: 1, alignItems: 'center', alignSelf: 'center', borderRadius: 3 }}>
                                <Loader />
                            </View>    
                            :    
                            this.resetCard()
                    }   
                </ImageBackground>
            </KeyboardAwareScrollView>
        );
    }
}


mapStateToProps = (state) => {
    return {
        resetRes: state.resetPassword,
    }
}
mapDispatchToProps = dispatch => {
    return {
        resetPasswordAction: (params) => dispatch(resetPassword(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
