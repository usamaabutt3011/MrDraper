import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';
import Modal from 'react-native-modal'
import DatePicker from 'react-native-datepicker'
import DropArrowIcon from 'react-native-vector-icons/AntDesign'
import PhoneInput from "react-native-phone-input";
import Toast from 'react-native-simple-toast';
import { CustomInputField, Header, Steps, Button, MediumTitle, TinyTitle, SmallText, Loader } from '../../../../components';
import { WP, colors, appImages, data } from '../../../../services';
import { getStylistInfo, signUpObj, createSignUp, saveSignupResponse } from '../../../../store/actions';
import { styles } from './styles';
const profile = data.member_settings_v7.en.labels.profile;
class PersonalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            first_name: '',
            last_name: '',
            email_address: '',
            country_code: '',
            phone_no: '',
            dob: '',
            profession: '',
            showTems: false,
            isEmailValidate: false,
            activeCalender: false,
            countries: [
                {
                    name: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
                    iso2: "sa",
                    dialCode: "966",
                    priority: 0,
                    areaCodes: null
                },
                {
                    name: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
                    iso2: "ae",
                    dialCode: "971",
                    priority: 0,
                    areaCodes: null
                }
            ]
        }
        this.resume()
        this.updateInfo = this.updateInfo.bind(this);
    }
    resume = async () => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "PersonalDetail")
    }
    componentWillMount = async () => {
        const { getStylistDetail } = this.props;
        try {
            let param = {
                "return_info": "stylist"
            }
            await getStylistDetail(param)
        } catch (error) {
            //error
        }
        // this.phone.getAllCountries()
    }
    componentWillReceiveProps = async (props) => {
        const { isSuccess, isFailure, loading, signupRes, error } = props.signup;
        const { signup, signUpObjAction, saveSignupResponseAction } = this.props;
        var params = signup.signUpObj

        if (isSuccess) {
            props.signup.isSuccess = false;
            // console.log('[Personal-detail.js] componentWillReceiveProps', props);
            // props.userRes.userProfile = signupRes;
            params = {
                "email": "",
                "first_name": "",
                "last_name": "",
                "phone": "",
                "shirts_budget": "",
                "jeans_budget": "",
                "shoes_budget": "",
                "blazers_budget": "",
                "shirt_size": "",
                "shoe_size": "",
                "waist_size": "",
                "blazer_size": "",
                "work_wear": "",
                "weekend_wear": "",
                "nightout_wear": "",
                "profession": "",
                "brands": [],
                "birthday": "",
                "height": "",
                "weight": "",
                "stylist_email": "",
            }
            await signUpObjAction(params, "PersonalDetail")
            await saveSignupResponseAction(signupRes)
            Toast.show(signupRes.message)
            this.setState({ loading: false })
            console.log('[==========] userRes', props.userRes);
            this.props.navigation.push('SocailLinks')
        } else {
            // console.log('[Personal-detail.js] Stylist Information True', props.signup);
            if (isFailure) {
                this.setState({ isEmailValidate: true })
                Toast.show(error.message)
            }
        }
    }
    _toggleTerms = () => this.setState({ showTems: !this.state.showTems })
    toggleModle = () => {
        this.setState({ activeCalender: !this.state.activeCalender })
    }
    submitForm = async (value, label) => {
        const { country_code, phone_no } = this.state;
        const { signUpObjAction, signup, stylist } = this.props;
        var params = signup.signUpObj

        switch (label) {
            case 'f_name':
                params.first_name = value
                this.setState({ first_name: value })
                break;
            case 'l_name':
                params.last_name = value
                this.setState({ last_name: value })
                break;
            case 'email':
                params.email = value
                this.setState({ email_address: value })
                // let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                // if (email.test(value)) {
                //     params.email = value
                //     this.setState({ email_address: value, isEmailValidate: false })
                // } else {
                //     Toast.show('Please enter correct email.')
                //     this.setState({ isEmailValidate: true })
                // }
                break;
            case 'phone':
                params.phone = phone_no
                this.setState({ phone_no: value })
                break;
            case 'dob':
                params.birthday = value
                this.setState({ dob: value })
                break;
            case 'profession':
                params.profession = value
                params.stylist_email = stylist.stylistInfo.result.stylist_email
                this.setState({ profession: value })
                break;
            default:
                break;
        }
        // console.log('=======================================================================================================')
        // console.log('[Personal.js] signup obj edited', params)
        await signUpObjAction(params, "PersonalDetail")
        // console.log('[Personal.js] signup obj edited', signup.signUpObj)
        // console.log('=======================================================================================================')
    }
    createSignUp = async () => {
        const { signup } = this.props;
        var params = signup.signUpObj
        if (params.first_name == '') {
            Toast.show('Please enter your first name.')
        } else {
            if (params.last_name == '') {
                Toast.show('Please enter your last name.')
            } else {
                if (params.email == '') {
                    Toast.show('Please enter your email address.')
                } else {
                    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    if (!email.test(params.email)) {
                        this.setState({ isEmailValidate: true })
                    } else {
                        this.setState({ isEmailValidate: false })
                        console.log('phone length===>>>', params.phone.length);
                        if (this.state.phone_no.length !== 13) {
                            Toast.show('Please enter valid phone number.')
                        } else {
                            if (params.birthday == '') {
                                Toast.show('Please enter your date of birth.')
                            } else {
                                await this.props.createSignUp(params)
                            }
                        }
                    }
                }
            }
        }
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    componentDidMount() {
        this.updateInfo()
    }
    selectCountry(country) {
        console.log('slectCountry:', this.phone.selectCountry(country), country);
        this.updateInfo()
    }
    updateInfo() {
        this.setState({
            country_code: this.phone.getValue()
        });
        console.log('valid: ', this.phone.isValidNumber());
        console.log('type: ', this.phone.getNumberType());
        console.log('value: ', this.phone.getValue());
        console.log('countries: ', this.phone.getAllCountries());
        // console.log('selectCountry: ', this.phone.selectCountry());
    }


    render() {
        const { stylist, signup } = this.props;
        const { country_code, phone_no } = this.state;
        var params = signup.signUpObj

        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={false}
                        onPressLeft={() => this.props.navigation.navigate('Size')}
                    />
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Steps
                            isCheckStyle={true}
                            isCheckPreference={true}
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={{ flex: 1 }}>
                            <View style={styles.subContainerPersonal}>
                                {
                                    stylist.loading ?
                                        <Loader
                                            style={{ marginVertical: WP('10') }}
                                        />
                                        :
                                        <Avatar
                                            rounded
                                            size="large"
                                            containerStyle={{ marginVertical: WP('5') }}
                                            source={stylist.isSuccess ? { uri: stylist.stylistInfo.result.stylist_pic } : appImages.loginBackground}
                                            onPress={() => console.log("Works!")}
                                            activeOpacity={0.7}
                                        />
                                }
                                <TinyTitle
                                    text={`${profile.p1} ${stylist.isSuccess ? stylist.stylistInfo.result.stylist_name : 'Paola'} - ${profile.p2}`}
                                    style={styles.titlePersonal}
                                />
                                <SmallText
                                    text={`${profile.p3}`}
                                    style={styles.subTitlePersonal}
                                />
                                <View style={styles.nameFieldsContainer}>
                                    <CustomInputField
                                        value={params.first_name}
                                        label={profile.first_name}
                                        isRightIcon={false}
                                        placeholderText={'Shumaim'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'default'}
                                        onChangeText={(value) => this.submitForm(value, 'f_name')}
                                        containerStyle={styles.nameInputContainer}
                                        style={styles.nameInput}
                                    />
                                    <CustomInputField
                                        value={params.last_name}
                                        label={profile.last_name}
                                        isRightIcon={false}
                                        placeholderText={'Awanzai'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'default'}
                                        onChangeText={(value) => this.submitForm(value, 'l_name')}
                                        containerStyle={styles.nameInputContainer}
                                        style={styles.nameInput}
                                    />
                                </View>
                                <CustomInputField
                                    value={params.email}
                                    label={profile.email}
                                    isRightIcon={false}
                                    placeholderText={'email@address.com'}
                                    placeholderTextColor={colors.lightGrey}
                                    keyboardType={'email-address'}
                                    onChangeText={(value) => this.submitForm(value, 'email')}
                                    labelStyle={this.state.isEmailValidate ? { color: 'red' } : null}
                                    containerStyle={this.state.isEmailValidate ? { borderColor: 'red' } : null}
                                    style={styles.inputStylePersonal}
                                />
                                <View style={styles.containerPhone}>
                                    <Text style={styles.labelStyle}>{profile.phone}</Text>
                                    <PhoneInput
                                        ref={ref => {
                                            this.phone = ref;
                                        }}
                                        initialCountry='ae'
                                        disabled={false}
                                        value={`${country_code}`}
                                        autoFormat={true}
                                        textProps={{ placeholder: '0513432342393', maxLength: 13 }}
                                        textStyle={{ color: 'black', fontSize: 16 }}
                                        offset={20}
                                        // textComponent={{ width: WP('78'), backgroundColor: 'red' }}
                                        flagStyle={{ marginLeft: 5 }}
                                        countriesList={this.state.countries}
                                        style={{ width: WP('78') }}
                                        allowZeroAfterCountryCode={true}
                                        onSelectCountry={(iso2) => this.selectCountry(iso2)}
                                        onChangePhoneNumber={(number) => this.submitForm(number, 'phone')}
                                    // onPressFlag={props.onPressFlag}
                                    />
                                    <DropArrowIcon name='caretdown' color={colors.black} size={8} style={{ left: WP('9.5'), zIndex: 10, position: 'absolute' }} />
                                </View>
                                {/* <CustomInputField
                                    ref={ref => {
                                        this.phone = ref;
                                    }}
                                    label={profile.phone}
                                    isRightIcon={false}
                                    isMaskedInput={true}
                                    PhoneInput={true}
                                    placeholderText={'+971 131 854 8486'}
                                    placeholderTextColor={colors.lightGrey}
                                    keyboardType={'phone-pad'}
                                    countriesList={this.state.countries}
                                    selectCountry={(country)=> this.selectCountry(country)}
                                    // onChangeText = {()=>this.onChangeText}
                                    // onChangeText={(formatted, value) =>{
                                    //     console.log('phone: ',formatted, value)
                                    //     this.submitForm(value, 'phone')}}
                                    containerStyle={{}}
                                    style={styles.inputStylePersonal}
                                /> */}
                                <CustomInputField
                                    label={'Select Date of Birth'} // birthday
                                    value={params.birthday}
                                    date={this.state.dob}
                                    isCalender={true}
                                    placeholderText={'1990/01/20'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={true}
                                    iconName='calendar'
                                    iconColor={colors.black}
                                    setDate={(date) => this.submitForm(date, 'dob')}
                                    style={styles.inputStylePersonal}
                                />
                                <CustomInputField
                                    label={`${profile.profession} (Optional)`}
                                    value={params.profession}
                                    placeholderText={'Designer'}
                                    placeholderTextColor={colors.lightGrey}
                                    isRightIcon={false}
                                    onChangeText={(value) => this.submitForm(value, 'profession')}
                                    containerStyle={{}}
                                    style={styles.inputStylePersonal}
                                />
                                <View style={styles.footerContainer}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={styles.footerText1}>{profile.terms_1}</Text>
                                        <Text
                                            onPress={() => this.setState({ showTems: true })}
                                            style={styles.footerText2}>
                                            {profile.terms_2}
                                        </Text>
                                    </View>
                                    <Button
                                        title={'NEXT'}
                                        showLoader={signup.loading}
                                        onPress={() => this.createSignUp()}
                                        style={styles.buttonPersonal}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <Modal
                    animationInTiming={500}
                    animationOutTiming={500}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    avoidKeyboard={true}
                    transparent={true}
                    isVisible={this.state.showTems}
                    onBackdropPress={() => this._toggleTerms()}
                    onBackButtonPress={() => this._toggleTerms()}
                    style={{ flex: 1, justifyContent: 'center' }}
                >
                    <View style={{ height: WP('170'), width: '98%', alignSelf: 'center', borderRadius: 5, backgroundColor: colors.white }}>
                        <ScrollView>
                            <View style={{ flex: 1, marginHorizontal: WP('3'), marginVertical: WP('2') }}>
                                <MediumTitle
                                    text={'Welcome'}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `Welcome to Mr. DRAPER. These are the terms and conditions of services governing your access to and use of the website www.mrdraper.com and its related sub-domains, sites, services and tools (the “Site”). By accepting these terms and conditions of services (including the linked information herein), and by using the Site, you represent that you agree to comply with these terms and conditions with Mr. DRAPER (“Mr. DRAPER , “Mr. Draper” “we,” “us,” “our”) in relation to your use of the Site (the “User Agreement”). This User Agreement is effective upon acceptance and/or use of the Service. If you do not agree to be bound by this User Agreement please do not access, register with or use this Site.

                                        Before you may become or continue as a member of the Site, you must read, agree with and accept this User Agreement and Mr. DRAPER’s Privacy Policy (the “Privacy Policy”). You should read this User Agreement and the Privacy Policy and access and read all further linked information referred to in this User Agreement, as such information contains further terms and conditions that apply to you as a user of mrdraper.com. Such linked information including but not limited to the Privacy Policy is hereby incorporated by reference into this User Agreement.
                                        
                                        Mr. DRAPER (“Mr. DRAPER , “Mr. Draper” “we,” “us,” “our”) provides its services (described below) through the “Site” and through its related services (collectively, such services, including any new features and applications, and the Site, the “Service(s)”), subject to the following Terms and Conditions of Service (as amended from time to time, the “Terms of Service”). We reserve the right, at our sole discretion, to change or modify portions of these Terms of Service at any time. If we do this, we will post the change(s) on this page and will indicate at the top of this page the date these terms were last revised. We will also notify you, through an email notification or through other reasonable means. Any such changes will become effective immediately with or without notice. Your continued use of the Service after the date any such changes become effective constitutes your acceptance of the new Terms of Service.
                                        
                                        In addition, when using certain services, you will be subject to any additional terms applicable to such services that may be posted on the Service from time to time, including, without limitation, the Privacy Policy located at (www.mrdraper.com/privacy-policy/). All such terms are hereby incorporated by reference into these Terms of Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`1. Services and Membership Description`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `The Service is designed to provide customers residing in Dubai with clothes (“items”) selected by our personal stylists from time to time (each shipment of items, a “Mr. DRAPER Package”, “package”). You may sign up online by creating a member profile for yourself (what you like to wear, what you currently wear, your hair, skin and eye color, where you like to shop, etc […]). Consequently, a stylist from Mr. DRAPER contacts you to ask additional questions. After you decide that you want to order a package, our stylist will pack the package. Prior to sending your package, we would ask that you submit your credit card details on your Mr. Draper profile. This would allow us to validate your credit card so that we ensure you undergo a smooth transaction process at the time of billing. Your card will be validated through a charge of 1 AED which will be voided and returned back to your account. As soon as we receive your package back (after your 5 day trial period) with the items in suitable condition as per our Returns Policy below, the items will be inspected and you will only be charged for those items you have decided to keep. Our partners, PCI DSS Level 1 Certified, Payfort, will handle all credit card transactions on their Secure Sockets Layer (SSL) software, which encrypts the order information you transmit. We, Mr. Draper does not store any of your credit card information. Mr. DRAPER will only be able to guarantee the availability of the items listed in the email and/or the set price of the items / package for (2) days from date of sending the referenced email. Once you input your credit card details, the stylist sends the package to you within 48 hours. You will receive a message and/or email stating that the package is on its way and you will have 5 (five) days starting from the date you receive the package, to try-on the items in the package and request a pick-up of the whole package or certain items in the package (“try-on period”). You will receive two reminders from Mr. DRAPER via your registered mobile phone number or registered email address, informing you of the days left to return the package and advising you to request the pickup of the package. If you do not request a pick-up of the package within the try-on period and as per provisions of the Delivery Conditions found below, you will be charged the full amount of the package. When the request for pick up is made, Mr. DRAPER will arrange the pick up of the package either on the same day or next day depending on the time the package has been requested for pickup. Once the package is received by Mr. DRAPER, the stylist will carry out a check of the items in the package. At this stage, Mr. DRAPER will charge you for all items not returned in accordance with the Return Policy below. We may bill you earlier in certain circumstances (for example, if you request us to in writing, if we have reason to believe that the order is fraudulent, if there has been a pattern of credit issues).

                                        In the event that the payment instrument used under you member profile can not be processed due to “Insufficient funds,” Mr. Draper reserves the right to charge a 50 AED per day penalty. This penalty will come in effect 7 days from the first attempt to process your payment.
                                        Mr. DRAPER is open to first attempting to resolve the dispute in an informal and amicable manner, but in the case that payment is unresolved within 21 days from the first payment processing date, Mr. Draper reserves the right to file a case in the exclusive jurisdiction of the Courts of the Dubai International Financial Centre (“the DIFC Courts”). All fees incurred with legal filing will be applied to the outstanding balance on your account.`
                                    }
                                />
                                <MediumTitle
                                    text={`2. Return Policy; Shipping`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You may return the Mr. DRAPER Package or any item from Mr. DRAPER Package you receive through the Service (in accordance with the instructions below and the “what to do” checklist provided with such Mr. DRAPER Package) within five (5) days after it is delivered. Our stylist will inspect the returned package / items and check for any wear and tear on the items such as stains, smells, removal of tag, barcode or stickers..etc. For free returns, items must be unworn (other than “tried-on”) and returned in their original condition and must include all original tags and packaging. You will be charged the price of any returned items that are not in compliance with the Return Policy and/or with the “what to do” checklist provided with the Mr. DRAPER Package and you will also be charged for the delivery of such items as detailed in the Delivery Conditions. It is your obligation to make sure that the package is available for pick up from you at the preferred location as specified in your Mr. DRAPER member profile starting the date you schedule a pickup and during the following five days. If you decide to have another person present at the preferred location to have the package picked up, then you should notify Mr. DRAPER in writing prior to the scheduled pick up date.  Mr. DRAPER reserves the right to charge you for all items should the package be not available for pickup after five days from the scheduled date.

                                        Mr. DRAPER provides its services to resident of Dubai. In case you reside in an area outside of Dubai, Mr. DRAPER may, at its own discretion, decide to provide you with the Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`3. Your Registration Obligations`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You are required to register with Mr. DRAPER  in order to access and use certain features of the Service. If you choose to register for the Service, you agree to provide and maintain true, accurate, current and complete information about yourself as prompted by the Service’s registration form. Registration data and certain other information about you are governed by our Privacy Policy. If you are under 13 years of age, you are not authorized to use the Service, with or without registering. In addition, if you are under 18 years old, you may use the Service, with or without registering, only with the approval of your parent or guardian.`
                                    }
                                />
                                <MediumTitle
                                    text={`4. Registered Account, Password and Security`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You are responsible for maintaining the confidentiality of your password and account, if any, and you are fully responsible for any and all activities that occur under your password or account. You agree to (a) immediately notify Mr. DRAPER of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session when accessing the Service. Mr. DRAPER will not be liable for any loss or damage arising from your failure to comply with this Section.`
                                    }
                                />
                                <MediumTitle
                                    text={`5. Cancellation and Refund Policy`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `The stylist will pack the package as detailed in the description of Services. The package will not be delivered if you do not provide your credit card details for verification within (7) days from requesting a package with your stylist on your initial call.

                                        We do not have any Refund Policy as we do not charge you for any package / items returned in accordance with the Return Policy, Delivery Conditions and “what to do” checklist provided with the Mr. DRAPER Package. We may decide at our own discretion to refund costs of an item / package on a case by case basis. In the wake of a refund, it will happen through the original mode of payment only.`
                                    }
                                />
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </KeyboardAwareScrollView>
        );
    }
}

const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return console.log(true)
    }
    return console.log(false)
}

mapStateToProps = (state) => {
    return {
        stylist: state.stylistInfo,
        signup: state.signup,
        userRes: state.login,
    }
}
mapDispatchToProps = dispatch => {
    return {
        createSignUp: (params) => dispatch(createSignUp(params)),
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
        saveSignupResponseAction: (value) => dispatch(saveSignupResponse(value)),
        signUpObjAction: (params, screen) => dispatch(signUpObj(params, screen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetail);
