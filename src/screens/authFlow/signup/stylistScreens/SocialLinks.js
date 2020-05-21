import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { CustomInputField, Header, Steps, Button, TinyTitle, SmallText } from '../../../../components';
import { WP, colors, appImages, family } from '../../../../services';
import { signUpObj, submitSocialLinks } from '../../../../store/actions';
import { styles } from './styles';
class SocailLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instaLink: '',
            facebookLink: '',
            LinkedInLink: ''
        }
    }
    componentDidMount = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "SocailLinks")
    }
    submitForm = async (value, label) => {
        const { instaLink, facebookLink, LinkedInLink } = this.state;
        switch (label) {
            case 'i_link':
                this.setState({ instaLink: value })
                break;
            case 'f_link':
                this.setState({ facebookLink: value })
                break;
            case 'l_link':
                this.setState({ LinkedInLink: value })
                break;
            default:
                break;
        }
        console.log('=======================================================================================================')
        console.log('[Personal.js] signup obj edited', instaLink, facebookLink, LinkedInLink)
        console.log('=======================================================================================================')
    }
    validate = async() => {
        const { submitSocialLinksAction, signup } = this.props;
        const { instaLink, facebookLink, LinkedInLink } = this.state;
        if ( instaLink == '') {
            Toast.show('Please enter your Instagram Link.')
        } else {
            if (facebookLink == '') {
                Toast.show('Please enter your Facebook Link.')
            } else {
                if (LinkedInLink == '') {
                    Toast.show('Please enter your LinkedIn Link.')
                } else {
                    let params = {
                        user_id: signup.signupRes.result.user_id, //  
                        facebook_profile_url: facebookLink, //"https://www.facebook.com/Mrdraperae/"
                        instagram_profile_url: instaLink, //"https://www.instagram.com/mrdraperae"
                        linkedin_profile_url: LinkedInLink, //"https://www.linkedin.com/mrdraperae"
                    }
                    await submitSocialLinksAction(params)
                }
            }
        }
    }
    componentWillReceiveProps = async (props) => {
        const { isSuccess, isFailure, loading, socialLinkRes } = props.socialLink;
        if (isSuccess) {
            props.socialLink.isSuccess = false;
            console.log('[socialLink.js] socialLink Information True', props.socialLinkRes);
            Toast.show(socialLinkRes.message)
            this.props.navigation.push('ItemsReceived')          
        } else {
            if (isFailure) {
                Toast.show(socialLinkRes.message)
            }
        }
    }
    render() {
        const { stylist, socialLink } = this.props;        
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={false}
                        onPressLeft={() => this.props.navigation.goBack()}
                    />
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Steps
                            isCheckStyle={true}
                            isCheckPreference={true}
                            isCheckStylist={false}
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                            style={{ alignSelf: 'center', marginTop: WP('5') }}
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, width: WP(90), overflow: 'hidden', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white }}>
                                <Avatar
                                    rounded
                                    size="large"
                                    containerStyle={{ marginVertical: WP('5') }}
                                    source={ stylist.isSuccess ? {uri: stylist.stylistInfo.result.stylist_pic }: appImages.loginBackground}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                />
                                <TinyTitle
                                    text={`Linked your social media profile, so your stylist can get to know you better.`}
                                    style={{ marginHorizontal: WP('10'), textAlign: 'center', fontFamily: family.boldText, marginBottom: WP('2') }}
                                />
                                <SmallText
                                    text={`Note: This step is optional and confidential.It will only be used for styling purposes.`}
                                    style={{ marginHorizontal: WP('10'), textAlign: 'center', marginBottom: WP('10') }}
                                />
                                <CustomInputField
                                    label={'Instagram'}
                                    placeholderText={'e.g. @username'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={true}
                                    iconName='instagram'
                                    iconColor={colors.lightGrey}
                                    onChangeText={(value) => this.submitForm(value, 'i_link')}
                                    containerStyle={{}}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <CustomInputField
                                    label={'Facebook'}
                                    placeholderText={'e.g. fb.com/username'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={true}
                                    iconName='facebook-square'
                                    iconColor={colors.lightGrey}
                                    onChangeText={(value) => this.submitForm(value, 'f_link')}
                                    containerStyle={{}}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <CustomInputField
                                    label={'LinkedIn'}
                                    placeholderText={'e.g. linkedIn.com/username'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={true}
                                    iconName='linkedin-square'
                                    iconColor={colors.lightGrey}
                                    onChangeText={(value) => this.submitForm(value, 'l_link')}
                                    containerStyle={{}}
                                    style={{ paddingHorizontal: WP(1) }}
                                />
                                <View style={{ width: WP('80'), marginVertical: WP('5'), justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Button
                                        title={'SKIP'}
                                        titleStyle={{ color: colors.lightGrey }}
                                        onPress={() => this.props.navigation.push('ItemsReceived')}
                                        style={{ width: WP('26'), height: WP('12'), backgroundColor: colors.buttonColorLight }}
                                    />
                                    <Button
                                        title={'NEXT'}
                                        showLoader={socialLink.loading}
                                        onPress={() => this.validate()}
                                        style={{ width: WP('26'), height: WP('12') }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}


mapStateToProps = (state) => {
    return {
        stylist: state.stylistInfo,
        signup: state.signup,
        socialLink: state.socialLinks,
    }
}

mapDispatchToProps = dispatch => {
    return {
        signUpObjAction: (params,screen) => dispatch(signUpObj(params, screen)),
        submitSocialLinksAction: (params) => dispatch(submitSocialLinks(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocailLinks);
