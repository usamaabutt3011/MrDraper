import React, { Component } from 'react';
import { Platform, View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';
import Modal from 'react-native-modal'
import DatePicker from 'react-native-datepicker'
import DropArrowIcon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/AntDesign';
import PhoneInput from "react-native-phone-input";
import Toast from 'react-native-simple-toast';
import { CustomInputField, Header, Steps, Button, MediumTitle, TinyTitle, SmallText, Loader } from '../../../../components';
import { WP, colors, appImages, data } from '../../../../services';
import { getStylistInfo, signUpObj, createSignUp, saveSignupResponse } from '../../../../store/actions';
import { styles } from './styles';
import firebase, { messaging } from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';

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
            deviceID: '',
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
                            // params.user_id= "",
                            params.device_id = this.state.deviceID,
                                params.device_type = Platform.OS === 'ios' ? "ios" : "android"
                            console.log('notifications params====-------:', params);
                            await this.props.createSignUp(params)
                        }
                    }
                }
            }
        }
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    componentDidMount = async () => {
        let uniqueId = DeviceInfo.getUniqueId();
        // iOS: "iPhone7,2"
        // Android: "goldfish"
        // Windows: ?
        // await this.setState({ deviceID: uniqueId })
        // console.log('deviceID====----------:', uniqueId);
        await firebase.messaging().getToken().then((res) => {
            console.log('-------------*****', res);
            this.setState({
                deviceID: res
            })
            // return res;
        }).catch((error) => console.log(error));

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
        console.log('deviceID signup====----------:', this.state.deviceID);
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
                                <MediumTitle
                                    text={`6. Delivery Conditions`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `The package will be dispatched after credit card information has been received and verified. The delivery of package will be made at the “Preferred Location” as specified on your Mr. DRAPER member profile. You will be notified by email that the package is on its way. You will be informed of the expected delivery date and approximate time of delivery through phone, message, email or any other reasonable means of communication chosen by Mr. DRAPER.

                                        You agree that you will receive the package on the scheduled date and time. We require that the package is received by you in person. If you decide to have another person present at the preferred location to receive the package, then you should notify Mr. DRAPER in writing prior to the scheduled delivery. On receipt of the package, you should immediately inspect the items in the package and notify Mr. DRAPER of any damages items. The items would be considered as received in perfect condition should you not notify Mr. DRAPER of any damages to the items.  Should you decide not to keep the package, you must schedule a pick-up by clicking on the relevant link on our website and or sending an email to info@mrdraper.ae no later than 4:00 pm (UAE time) of the fourth day from date of delivery. The package will be picked up from the preferred location as specified in your Mr. DRAPER member profile. Package delivery and pick-up is free of charge unless you were charged for a returned item in accordance to the Return Policy. In this regard, should you decide to receive the item you were charged for, a delivery charge of AED 20 will apply.
                                        
                                        You acknowledge that any package(s) ordered and scheduled through the Mr. Draper website (www.mrdraper.com) or App (both IOS and/or Android) or through communication with their stylist which are rejected by the customer at delivery are subject to an AED 50 cancellation charge to cover the cost of shipping and return. You confirm that such a charge is acceptable and will be charged immediately by Mr. DRAPER at its sole discretion.`
                                    }
                                />
                                <MediumTitle
                                    text={`7. Modifications to Service`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `Mr. DRAPER reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Mr. DRAPER will not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`8. General Practices Regarding Use and Storage`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You acknowledge that Mr. DRAPER may establish general practices and limits concerning use of the Service, including without limitation the maximum period of time that data or other content will be retained by the Service and the maximum storage space that will be allotted on Mr. DRAPER ’s servers on your behalf. You agree that Mr. DRAPER  has no responsibility or liability for the deletion or failure to store any data or other content maintained or uploaded by the Service. You acknowledge that Mr. DRAPER reserves the right to terminate accounts that are inactive for an extended period of time. You further acknowledge that Mr. DRAPER  reserves the right to change these general practices and limits at any time, in its sole discretion, with or without notice.`
                                    }
                                />
                                <MediumTitle
                                    text={`9. Conditions of Use`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `User Conduct: You are solely responsible for all photographs, video, images, information, data, text, software, music, sound, graphics, messages or other materials (“content”) that you upload, post, publish or display (hereinafter, “upload”) or email or otherwise use via the Service. The following are examples of the kind of content and/or use that is illegal or prohibited by Mr. DRAPER. Mr. DRAPER reserves the right to investigate and take appropriate legal action against anyone who, in Mr. DRAPER ’s sole discretion, violates this provision, including without limitation, removing the offending content from the Service, suspending or terminating the account of such violators and reporting you to the law enforcement authorities. You agree to not use the Service to:

                                        a-      email or otherwise upload any content that (i) infringes any intellectual property or other proprietary rights of any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person; (v) constitutes unsolicited or unauthorized advertising, promotional materials, commercial activities and/or sales, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” “contests,” “sweepstakes,” or any other form of solicitation; (vi) is unlawful, harmful, threatening, abusive, harassing, tortuous, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of another’s privacy, hateful racially, ethnically or otherwise objectionable; or (vii) in the sole judgment of Mr. DRAPER , is objectionable or which restricts or inhibits any other person from using or enjoying the Service, or which may expose Mr. DRAPER  or its users to any harm or liability of any type;
                                        
                                        b-      interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service; or
                                        
                                        c-      violate any applicable local,  national or international law, or any regulations having the force of law;
                                        
                                        d-     impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;
                                        
                                        e-      harvest or collect email addresses or other contact information of other users from the Service by electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications;
                                        
                                        f-       advertise or offer to sell or buy any goods or services for any business purpose that is not specifically authorized;
                                        
                                        g-      further or promote any criminal activity or enterprise or provide instructional information about illegal activities; or
                                        
                                        h-      obtain or attempt to access or otherwise obtain any materials or information through any means not intentionally made available or provided for through the Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`10. Privacy`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You agree that Mr. DRAPER may process your personal information that you provide to it for the purposes of providing the services on mrdraper.com and for sending marketing communications to you, and that the Privacy Policy of this Site governs our collection, processing, use and any transfer of your personally identifiable information. The Privacy Policy is hereby incorporated by reference into these Terms of Services.`
                                    }
                                />
                                <MediumTitle
                                    text={`11. Prices, Fees and Billing`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `More information on charges, fees and payments are provided above. To receive a Mr. DRAPER Package, you may be required to provide Mr. DRAPER  with information regarding your credit card or other payment instrument. You represent and warrant to Mr. DRAPER  that such information is true and that you are authorized to use the payment instrument. You will promptly update your account information with any changes that may occur. You agree to pay Mr. DRAPER  the charges incurred in accordance with this Terms of Service. You hereby authorize Mr. DRAPER  to bill your payment instrument in accordance with this Terms of Service until you terminate your account, and you further agree to pay any charges so incurred. If you dispute any charges you must let Mr. DRAPER know within thirty (30) days after the date that Mr. DRAPER bills you. The current price for each item will appear on the packing list along with the Mr. DRAPER Package, when shipped to you. We may change the price we charge for a particular item (although the price of an item shipped to you will not change before the applicable try-on period is over). We reserve the right to institute fees for any portion of the Service, but if we do, we will provide notice of the change before your next Mr. DRAPER Package is shipped. Your continued use of the Service after the fee change becomes effective constitutes your agreement to pay the changed amount. You shall be responsible for all taxes associated with the Services.`
                                    }
                                />
                                <MediumTitle
                                    text={`12. Commercial Use`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `Unless otherwise expressly authorized herein or in the Service, you agree not to display, distribute, license, perform, publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, exploit, transfer or upload for any commercial purposes, any portion of the Service, use of the Service, or access to the Service. The Service is for your personal use.`
                                    }
                                />
                                <MediumTitle
                                    text={`13. Intellectual Property Rights`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `Service Content, Software and Trademarks: You acknowledge and agree that the Service may contain content or features (“Service Content”) that are protected by copyright, patent, trademark, trade secret or other proprietary rights and laws. Except as expressly authorized by Mr. DRAPER , you agree not to modify, copy, frame, scrape, rent, lease, loan, sell, distribute or create derivative works based on the Service or the Service Content, in whole or in part, except that the foregoing does not apply to your own User Content (as defined below) that you legally upload to the Service. In connection with your use of the Service you will not engage in or use any data mining, robots, scraping or similar data gathering or extraction methods. Any use of the Service or the Service Content other than as specifically authorized herein is strictly prohibited. The technology and software underlying the Service or distributed in connection therewith is the property of Mr. DRAPER, our affiliates and our partners (the “Software”). You agree not to copy, modify, create a derivative work of, reverse engineer, reverse assemble or otherwise attempt to discover any source code, sell, assign, sublicense, or otherwise transfer any right in the Software. Any rights not expressly granted herein are reserved by Mr. DRAPER.

                                        The MR. DRAPER name and logos are trademarks of Mr. DRAPER (collectively the “Mr. DRAPER Trademarks”). Other Mr. DRAPER, product, and service names and logos used and displayed via the Service may be trademarks or service marks of their respective owners who may or may not endorse or be affiliated with or connected to Mr. DRAPER. Nothing in this Terms of Service or the Service should be construed as granting, by implication, or otherwise, any license or right to use any of Mr. DRAPER Trademarks displayed on the Service, without our prior written permission in each instance. All goodwill generated from the use of Mr. DRAPER Trademarks will inure to our exclusive benefit.`
                                    }
                                />
                                <MediumTitle
                                    text={`14. Third Party Material`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `Under no circumstances will Mr. DRAPER  be liable in any way for any content or materials of any third parties (including users), including, but not limited to, for any errors or omissions in any content, or for any loss or damage of any kind incurred as a result of the use of any such content. You acknowledge that Mr. DRAPER does not pre-screen content, but that Mr. DRAPER and its designees will have the right (but not the obligation) in their sole discretion to refuse or remove any content that is available via the Service. Without limiting the foregoing, Mr. DRAPER and its designees will have the right to remove any content that violates these Terms of Service or is deemed by Mr. DRAPER, in its sole discretion, to be otherwise objectionable. You agree that you must evaluate, and bear all risks associated with, the use of any content, including any reliance on the accuracy, completeness, or usefulness of such content.`
                                    }
                                />
                                <MediumTitle
                                    text={`15. User Content Transmitted Through the Service`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `With respect to the content or other materials you upload through the Service or share with other users or recipients (collectively, “User Content”), you represent and warrant that you own all right, title and interest in and to such User Content, including, without limitation, all copyright and rights of publicity contained therein. By uploading any User Content you hereby grant and will grant Mr. DRAPER and its affiliated companies a nonexclusive, worldwide, royalty free, fully paid up, transferable, sublicensable, perpetual, irrevocable license to copy, display, upload, perform, distribute, store, modify and otherwise use your User Content in connection with the operation of the Service or the promotion, advertising or marketing thereof, in any form, medium or technology now known or later developed.

                                        You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information about the Service (“Submissions”) provided by you to Mr. DRAPER  are non-confidential and Mr. DRAPER  will be entitled to the unrestricted use and dissemination of these Submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.
                                        
                                        You acknowledge and agree that Mr. DRAPER  may preserve content and may also disclose content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process, applicable laws or government requests; (b) enforce these Terms of Service; (c) respond to claims that any content violates the rights of third parties; or (d) protect the rights, property, or personal safety of Mr. DRAPER , its users and the public. You understand that the technical processing and transmission of the Service, including your content, may involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.`
                                    }
                                />
                                <MediumTitle
                                    text={`16. Procedure for Claims of Intellectual Property Infringement`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `Mr. DRAPER respects the intellectual property of others, and we ask our users to do the same. Mr. DRAPER may, in appropriate circumstances and at its discretion, disable and/or terminate the accounts of users who may be infringing the intellectual property of a third party. If you believe that your work has been copied in a way that constitutes copyright infringement, or your intellectual property rights have been otherwise violated, please provide Mr. DRAPER’s Service Agent the following formation:

                                        An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest.
                                        A description of the copyrighted work or other intellectual property that you claim has been infringed.
                                        A description of where the material that you claim is infringing is located on the Site your address, telephone number, and email address.
                                        A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.
                                        A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner’s behalf.
                                        Mr. DRAPER’s agent for notice of claims of copyright or other intellectual property infringement can be reached via e-mail at info@mrdraper.ae with the subject line “intellectual property”. Mr. DRAPER may update this mailing address from time to time. You agree that changes to this mailing address shall not constitute a modification to this Terms of Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`17. Third Party Websites`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `The Service may provide, or third parties may provide, links or other access to other sites and resources on the Internet. Mr. DRAPER has no control over such sites and resources and Mr. DRAPER is not responsible for and does not endorse such sites and resources. You further acknowledge and agree that Mr. DRAPER will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any content, events, goods or services available on or through any such site or resource. Any dealings you have with third parties found while using the Service are between you and the third party, and you agree that Mr. DRAPER is not liable for any loss or claim that you may have against any such third party.`
                                    }
                                />
                                <MediumTitle
                                    text={`18. Social Networking Services`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You may be able to enable or log in to the Service via various online third party services, such as social media and social networking services like Facebook (“Social Networking Services”). By logging in or directly integrating these Social Networking Services into the Service, we make your online experiences richer and more personalized. To take advantage of this feature and capabilities, we may ask you to authenticate, register for or log into Social Networking Services on the websites of their respective providers. As part of such integration, the Social Networking Services would provide us with access to certain information that you have provided to such Social Networking Services, and we would use, store and disclose such information in accordance with the Privacy Policy.

                                        In addition, Mr. DRAPER is not responsible for the accuracy, availability or reliability of any information, content, goods, data, opinions, advice or statements made available in connection with Social Networking Services. As such, Mr. DRAPER is not liable for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such Social Networking Services. Mr. DRAPER enables these features merely as a convenience and the integration or inclusion of such features does not imply an endorsement or recommendation.`
                                    }
                                />
                                <MediumTitle
                                    text={`19. Indemnity and Release`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You agree to release, indemnify and hold Mr. DRAPER and its affiliates and their officers, employees, directors and agent harmless from any from any and all losses, damages, expenses, including reasonable attorneys’ fees, rights, claims, actions of any kind and injury arising out of or relating to your use of the Service, any User Content, your connection to the Service, your violation of these Terms of Service or your violation of any rights of another.`
                                    }
                                />
                                <MediumTitle
                                    text={`20. Disclaimer of Warranties`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. MR. DRAPER EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.

                                        MR. DRAPER MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY CLOTHES, PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.`
                                    }
                                />
                                <MediumTitle
                                    text={`21. Limitation of Liability`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `YOU EXPRESSLY UNDERSTAND AND AGREE THAT MR. DRAPER  WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF GOODWILL, USE, DATA OR OTHER INTANGIBLE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, RESULTING FROM: (I) THE USE OR THE INABILITY TO USE THE SERVICE; (II) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICE; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (IV) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE; OR (V) ANY OTHER MATTER RELATING TO THE SERVICE`
                                    }
                                />
                                <MediumTitle
                                    text={`22. Governing Law & Dispute Resolution`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `These terms are governed by UAE laws. In the event of any disputes between you and Mr. DRAPER, the applicable law will be that of UAE governing laws. Mr. DRAPER is open to first attempting to resolve the dispute in an informal and amicable manner.

                                        However, if either party believes that the dispute cannot be resolved in such a manner, then the parties agree that any dispute, difference, controversy or claim arising out of or in connection with this contract, including (but not limited to) any question regarding its existence, validity, interpretation, performance, discharge and applicable remedies, shall be subject to the exclusive jurisdiction of the Courts of the Dubai International Financial Centre (“the DIFC Courts”).
                                        
                                        The seat of arbitration shall be the Dubai International Financial Centre in Dubai, UAE. The arbitration shall be conducted in the English language. The arbitration award shall be final and binding on the parties. The arbitral tribunal may award reasonable attorneys’ fees and the cost of the arbitration to the prevailing party.
                                        
                                        Judgment upon the award rendered by the arbitrator(s) may be entered by any court having jurisdiction thereof or having jurisdiction over the relevant party or its assets.
                                        
                                        Any party may seek interim relief from any court having jurisdiction thereof or having jurisdiction over the relevant party or its assets, to which both you and Mr. DRAPER hereto do hereby submit for this limited purpose.
                                        
                                        This clause shall survive any expiry or termination of this Terms of Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`23. Termination and Deregistration`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You agree that Mr. DRAPER, in its sole discretion, may suspend or terminate your account (or any part thereof) or use of the Service and remove and discard any content within the Service, for any reason, including, without limitation, for lack of use or if Mr. DRAPER believes that you have violated or acted inconsistently with the letter or spirit of these Terms of Service. Any suspected fraudulent, abusive or illegal activity that may be grounds for termination of your use of Service, may be referred to appropriate law enforcement authorities. Mr. DRAPER may also in its sole discretion and at any time discontinue providing the Service, or any part thereof, with or without notice. You agree that any termination of your access to the Service under any provision of this Terms of Service may be effected without prior notice, and acknowledge and agree that Mr. DRAPER may immediately deactivate or delete your account and all related information and files in your account and/or bar any further access to such files or the Service. Further, you agree that Mr. DRAPER will not be liable to you or any third-party for any termination of your access to the Service.

                                        You may deregister from the Site at any time by following the instructions in your member profile. If you deregister from the Site while a Mr. Draper package is in your possession, we, Mr. DRAPER have the right to charge for the full amount in the package to the credit card verified on your Mr. Draper profile.
                                        
                                        Part or all of your Personal Information as defined in the Privacy Policy may be used by Mr. DRAPER for internal analysis purposes. This clause will survive the termination or deregistration of your account / member profile from the Site.`
                                    }
                                />
                                <MediumTitle
                                    text={`24. User Disputes`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `You agree that you are solely responsible for your interactions with any other user in connection with the Service and Mr. DRAPER will have no liability or responsibility with respect thereto. Mr. DRAPER reserves the right, but has no obligation, to become involved in any way with disputes between you and any other user of the Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`25. General`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `These Terms of Service constitute the entire agreement between you and Mr. DRAPER and govern your use of the Service, superseding any prior agreements between you and Mr. DRAPER with respect to the Service. You also may be subject to additional terms and conditions that may apply when you use affiliate or third-party services, third-party content or third-party software. The failure of Mr. DRAPER to exercise or enforce any right or provision of these Terms of Service will not constitute a waiver of such right or provision. If any provision of these Terms of Service is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of these Terms of Service remain in full force and effect. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Service or these Terms of Service must be filed within one (1) year after such claim or cause of action arose or be forever barred. A printed version of this agreement and of any notice given in electronic form will be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. The section titles in these Terms of Service are for convenience only and have no legal or contractual effect. Notices to you may be made via either email or regular mail. The Service may also provide notices to you of changes to these Terms of Service or other matters by displaying notices or links to notices generally on the Service.`
                                    }
                                />
                                <MediumTitle
                                    text={`26. Your Privacy`}
                                />
                                <SmallText
                                    style={{ marginHorizontal: WP('1') }}
                                    text={
                                        `At Mr. DRAPER, we respect the privacy of our users. For details please see our Privacy Policy located at (www.mrdraper.com/privacy-policy/). By using the Service, you consent to our collection and use of personal data as outlined therein.



                                        Questions?  Concerns?  Suggestions?
                                        Please contact us at info@mrdraper.ae to report any violations of these Terms of Service or to pose any questions regarding this Terms of Service or the Service.
                                        
                                        `
                                    }
                                />
                            </View>
                        </ScrollView>
                        <View style={{ width: WP('88'), alignItems: 'flex-end', position: 'absolute' }}>
                            <View style={{ height: WP('10'), width: WP('10'), right: -10,top: -15, backgroundColor: colors.lightGrey, borderRadius: WP('20'), justifyContent: 'center', alignItems: 'center' }}>
                                <Icon
                                    name={'close'}
                                    color={colors.white}
                                    size={WP(6)}
                                    onPress={() => this._toggleTerms()}
                                />
                            </View>
                        </View>
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
