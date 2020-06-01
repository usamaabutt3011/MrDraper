import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar, Badge } from 'react-native-elements';
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-picker';
import PhoneInput from "react-native-phone-input";
import DropArrowIcon from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-simple-toast';
import { CustomInputField, Header, Steps, Button, MediumTitle, TinyTitle, SmallText, Loader, DropDownCard } from '../../../../../components';
import { WP, colors, appImages, data, HP } from '../../../../../services';
import { getStylistInfo, updateProfile, updateProfileObj, changePassword, updateProfilePic, saveSignupResponse } from '../../../../../store/actions';
import { styles } from './styles';
const profile = data.member_settings_v7.en.labels.profile;
const socialMedia = [
    { label: 'Email', value: 'Email' },
    { label: 'Phone', value: 'Phone' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'SMS', value: 'SMS' }]
const aboutUs = [
    { label: 'Radio', value: 'Radio' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Online magazine', value: 'Online magazine' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Search engine', value: 'Search engine' }]
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profile_image: '',
            first_name: '',
            last_name: '',
            email_address: '',
            country_code: '',
            phone_no: '',
            dob: '',
            old_pass: '',
            new_pass: '',
            confirm_pass: '',
            socalMedia: 'Preferred Contact Method',
            hearUs: 'How did you hear about us?',
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
        this.updateInfo = this.updateInfo.bind(this);
    }
    componentWillMount = async () => {
        const { getStylistDetail, userInfo } = this.props;
        try {
            let param = {
                "return_info": "stylist"
            }
            await getStylistDetail(param)
        } catch (error) {
            //error
        }
        const { updateProfileRes, updateProfileObjAction } = this.props;
        var params = updateProfileRes.updateProfileObj
        let name = userInfo.userProfile.result.name.split(' ')
        // Filling Params
        params.user_id = userInfo.userProfile.result.user_id
        params.first_name = name[0]
        params.last_name = name[1]
        params.email = userInfo.userProfile.result.email
        params.phone = userInfo.userProfile.result.phone
        params.contact_preference = userInfo.userProfile.result.contact_preference
        params.how_did_you_hear = userInfo.userProfile.result.how_did_you_hear
        // console.log('[UpdateProfile.js] componentWillMount name', name);
        await this.setState({
            profile_image: userInfo.userProfile.result.pic
        })
        //===============================
        await this.setState({
            first_name: name[0],
            last_name: name[1],
            email_address: userInfo.userProfile.result.email,
            phone_no: userInfo.userProfile.result.phone,
            socalMedia: userInfo.userProfile.result.contact_preference,
            hearUs: userInfo.userProfile.result.how_did_you_hear,
        })
    }
    componentWillReceiveProps = async (props) => {
        const { first_name, last_name } = this.state;
        const { saveSignupResponseAction, userInfo } = props;
        const { isSuccess, isFailure, loading, updateProfileRes, error } = props.updateProfileRes;
        if (isSuccess) {
            // console.log('[Personal-detail.js] Personal Information True', props);
            props.updateProfileRes.isSuccess = false;
            //updating data to store
            userInfo.userProfile.result.name = first_name + ' ' + last_name;
            userInfo.userProfile.result.email = updateProfileRes.result.email;
            userInfo.userProfile.result.phone = updateProfileRes.result.phone;
            userInfo.userProfile.result.contact_preference = updateProfileRes.result.contact_preference;
            userInfo.userProfile.result.how_did_you_hear = updateProfileRes.result.how_did_you_hear;
            await saveSignupResponseAction(userInfo.userProfile);
            // console.log('[Personal-detail.js] componentWillReceiveProps Update', userInfo.userProfile);
            Toast.show(updateProfileRes.message)
        } else {
            if (isFailure) {
                this.setState({ isEmailValidate: true })
                Toast.show(error.message)
            }
        }

        //ChangePassword Section======================================================
        if (props.changePasswordRes.isSuccess) {
            props.changePasswordRes.isSuccess = false;
            Toast.show(props.changePasswordRes.changePassRes.message)
            this._toggleTerms()
            console.log('[Change-profile-detail.js] Change Password True', props.changePasswordRes);
        } else {
            console.log('[Change-profile-detail.js] Change Password false', props.changePasswordRes);
            if (props.changePasswordRes.isFailure) {
                props.changePasswordRes.isFailure = false;
                Toast.show(props.changePasswordRes.error.errors)
            }
        }

        //UpdateProfilePic Section======================================================
        if (props.updateProfilePic.isSuccess) {
            props.updateProfilePic.isSuccess = false;
            //updating data to store
            userInfo.userProfile.result.pic = props.updateProfilePic.updateProfilePicRes.result.path;
            await saveSignupResponseAction(userInfo.userProfile);
            this.setState({
                profile_image: props.updateProfilePic.updateProfilePicRes.result.path
            }, () => {
                // console.log('[Change-profile-pic.js] Change pic True', props.updateProfilePic);
            })
            Toast.show(props.updateProfilePic.updateProfilePicRes.message)
        } else {
            if (props.updateProfilePic.isFailure) {
                // console.log('[Change-profile-pic.js] Change pic True', props.updateProfilePic);
                // Toast.show(props.updateProfilePic)
            }
        }
    }
    _toggleTerms = () => this.setState({ showTems: !this.state.showTems })
    toggleModle = () => {
        this.setState({ activeCalender: !this.state.activeCalender })
    }
    submitForm = async (value, label) => {
        const { country_code, phone_no } = this.state;
        const { updateProfileRes, updateProfileObjAction, userInfo } = this.props;
        var params = updateProfileRes.updateProfileObj
        params.user_id = userInfo.userProfile.result.user_id

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
                break;
            case 'phone':
                //params.phone = phone_no
                this.setState({ phone_no: value })
                break;
            case 'socialMethod':
                params.contact_preference = value
                this.setState({ socalMedia: value })
                break;
            case 'hearUs':
                params.how_did_you_hear = value
                this.setState({ hearUs: value })
                break;
            default:
                break;
        }
        // console.log('=======================================================================================================')
        // console.log('[Personal.js] signup obj edited', this.props)
        // await updateProfileObjAction(params) //creating issue replace the object of UpdateProfileDetails with SignUp object.
        // console.log('=======================================================================================================')
    }
    updateProfile = async () => {
        const { updateProfileRes } = this.props;
        var params = updateProfileRes.updateProfileObj
        //this.phone.isValidNumber())
        if (this.state.phone_no.length == 13) {
            params.phone = this.state.phone_no;
            await this.props.updateProfileAction(params)
        } else {
            Toast.show('Your phone number is not valid.')
        }
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    componentDidMount() {
        console.log('[UpdateProfile.js] =========:', this.props);
        this.updateInfo()
    }
    selectCountry(countryISO2) {
        const { countries } = this.state;

        let index = countries.findIndex(e => e.iso2 === countryISO2)
        if (index !== -1) {
            this.setState({ 
                country_code: `+${countries[index].dialCode}`
             },()=>{
                console.log('[country_code.js] =========:', this.state.country_code);
             })
        }
    }
    updateInfo() {
        // let phoneNo = this.props.userInfo.userProfile.result.phone.slice(4, 13);
        // console.log('phoneNo: ', phoneNo);
        this.setState({
            country_code: this.props.userInfo.userProfile.result.phone
            // country_code: this.phone.getValue(),
            // phone_no: phoneNo
        });
        console.log('valid: ', this.phone.isValidNumber());
        console.log('type: ', this.phone.getNumberType());
        console.log('value: ', this.phone.getValue());
        console.log('countries: ', this.phone.getAllCountries());
        // console.log('selectCountry: ', this.phone.selectCountry());
    }
    changePasswordFunc = async () => {
        const { changePasswordAction, userInfo } = this.props;
        const { old_pass, new_pass, confirm_pass } = this.state;
        if (old_pass == '') {
            Toast.show('Please enter your current password.')
        } else {
            if (new_pass == '') {
                Toast.show('Please enter your new password.')
            } else {
                if (confirm_pass == '') {
                    Toast.show('Please enter confirm password.')
                } else {
                    if (new_pass !== confirm_pass) {
                        Toast.show('Please confirm your password.')
                    } else {
                        let param = {
                            user_id: userInfo.userProfile.result.user_id,
                            old_password: old_pass,
                            new_password: new_pass,
                            confirm_new_password: confirm_pass,
                        }
                        await changePasswordAction(param)
                    }
                }
            }
        }
    }
    pickImage = async () => {
        const { updateProfilePicAction, userInfo } = this.props;
        const options = {
            title: 'Select Avatar',
            noData: false,
            quality: 0.1,
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {

                let params = {
                    user_id: userInfo.userProfile.result.user_id,
                    imgdata: `data:image/jpeg;base64,${response.data}`,
                }
                // console.log('Response = ', response, params);
                await updateProfilePicAction(params)

                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                //   this.setState({ avatarSource: source });
            }
        });
    }

    render() {
        const { stylist, updateProfileRes, changePasswordRes, updateProfilePic } = this.props;
        const { country_code, phone_no, first_name, last_name, email_address, socalMedia, hearUs, old_pass, new_pass, confirm_pass } = this.state;
        return (
            <View
                contentContainerStyle={{ flex: 1 }}
            >
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('TabStack')}
                />
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.container}>
                        <MediumTitle
                            text={'My Details'}
                            style={{ marginHorizontal: WP('7'), marginVertical: WP('5') }}
                        />
                        <ScrollView
                            style={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                        >

                            <View style={{ height: WP('5') }} />
                            <View style={{ flex: 1, marginBottom: WP('25') }}>
                                <View style={styles.subContainerPersonal}>
                                    {
                                        stylist.loading || updateProfilePic.loading ?
                                            <Loader
                                                style={{ marginVertical: WP('10') }}
                                            />
                                            :
                                            <Avatar
                                                rounded
                                                size="large"
                                                source={this.state.profile_image !== '' ? { uri: this.state.profile_image } : appImages.loginBackground}
                                                activeOpacity={0.7}
                                                onPress={() => this.pickImage()}
                                                showAccessory={true}
                                                accessory={{ name: 'camera', type: 'font-awesome', color: colors.lightBlack, underlayColor: '#fff', size: WP('5') }}
                                                onAccessoryPress={() => this.pickImage()}
                                                containerStyle={{ marginVertical: WP('10') }}
                                            >
                                            </Avatar>
                                    }

                                    <View style={styles.nameFieldsContainer}>
                                        <CustomInputField
                                            value={first_name}
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
                                            value={last_name}
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
                                        disabled={false}
                                        label={profile.email}
                                        value={email_address}
                                        isRightIcon={false}
                                        placeholderText={'email@address.com'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'email-address'}
                                        onChangeText={(value) => this.submitForm(value, 'email')}
                                        labelStyle={this.state.isEmailValidate ? { color: 'red' } : null}
                                        containerStyle={this.state.isEmailValidate ? { borderColor: 'red' } : null}
                                        style={[styles.inputStylePersonal, { color: colors.lightGrey }]}
                                    />
                                    <Button
                                        title={'Change Password'}
                                        style={{ alignSelf: 'center', width: WP('80'), backgroundColor: colors.bgColor, marginBottom: WP('5') }}
                                        titleStyle={{ color: colors.mediumGrey }}
                                        onPress={this._toggleTerms}
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
                                            textProps={{ placeholder: phone_no, maxLength: 13 }}
                                            textStyle={{ color: 'black', fontSize: 16 }}
                                            offset={20}
                                            // textComponent={() => { 
                                            //     return(
                                            //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            //         {
                                            //             country_code ?
                                            //                 <Text style={{ fontSize: WP('3.5'), color: colors.black }}>{country_code}</Text>
                                            //                 : null
                                            //         }
                                            //         <TextInput
                                            //             value={phone_no}
                                            //             keyboardType="phone-pad"
                                            //             placeholder={ country_code ? null : 'Phone number'}
                                            //             onChangeText={(value) => this.setState({ phone_no: value })}
                                            //             style={{ height: WP('8'), width: WP('50') }}
                                            //         />
                                            //     </View>
                                            //     )
                                            // }}
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
                                    <DropDownCard
                                        child={true}
                                        value={socalMedia}
                                        headerEnable={false}
                                        dropDownOptions={socialMedia}
                                        label={'Preferred Contact Method'}
                                        hideIcon={false}
                                        dropdwonStyle={{ height: WP('30'), width: WP('80') }}
                                        dropdownCon={{ width: WP('80'), marginLeft: 0, borderWidth: 1.5 }}
                                        style={{ height: WP('16'), width: WP('80'), alignSelf: 'center', marginBottom: WP('3') }}
                                        onSelectItem={(index, value) => { this.submitForm(value, 'socialMethod') }}
                                    />
                                    <DropDownCard
                                        child={true}
                                        value={hearUs}
                                        headerEnable={false}
                                        dropDownOptions={aboutUs}
                                        label={'How did you hear about us?'}
                                        hideIcon={false}
                                        dropdwonStyle={{ height: WP('30'), width: WP('80') }}
                                        dropdownCon={{ width: WP('80'), marginLeft: 0, borderWidth: 1.5 }}
                                        style={{ height: WP('16'), width: WP('80'), alignSelf: 'center', marginBottom: WP('3') }}
                                        onSelectItem={(index, value) => { this.submitForm(value, 'hearUs') }}
                                    />
                                    <View style={styles.footerContainer}>
                                        <Button
                                            title={'UPDATE PROFILE'}
                                            showLoader={updateProfileRes.loading}
                                            onPress={() => this.updateProfile()}
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
                        <View style={{ width: '98%', alignSelf: 'center', borderRadius: 5, backgroundColor: colors.white }}>
                            <ScrollView>
                                <View style={{ flex: 1, alignItems: 'center', marginVertical: WP('2') }}>
                                    <View style={styles.modalBtnClose}>
                                        <MediumTitle
                                            text={'Change Password'}
                                        />
                                        <Icon name="close" size={20} color={colors.lightGrey} onPress={this._toggleTerms} />
                                    </View>
                                    <CustomInputField
                                        label={'Current Password'}
                                        isRightIcon={false}
                                        secureTextEntry={true}
                                        placeholderText={'Current Password'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'email-address'}
                                        onChangeText={(value) => this.setState({ old_pass: value })}
                                        style={styles.inputStylePersonal}
                                    />
                                    <CustomInputField
                                        label={'New Password'}
                                        isRightIcon={false}
                                        secureTextEntry={true}
                                        placeholderText={'New Password'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'email-address'}
                                        onChangeText={(value) => this.setState({ new_pass: value })}
                                        labelStyle={this.state.isEmailValidate ? { color: 'red' } : null}
                                        style={styles.inputStylePersonal}
                                    />
                                    <CustomInputField
                                        label={'Re-enter New Password'}
                                        isRightIcon={false}
                                        secureTextEntry={true}
                                        placeholderText={'Re-enter New Password'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'email-address'}
                                        onChangeText={(value) => this.setState({ confirm_pass: value })}
                                        labelStyle={this.state.isEmailValidate ? { color: 'red' } : null}
                                        style={styles.inputStylePersonal}
                                    />
                                    <Button
                                        title={'Change Password'}
                                        showLoader={changePasswordRes.loading}
                                        // disabled={old_pass == '' || new_pass !== confirm_pass}
                                        style={{ alignSelf: 'center', width: WP('80'), backgroundColor: colors.black, marginBottom: WP('5') }}
                                        titleStyle={{ color: colors.white }}
                                        onPress={() => this.changePasswordFunc()}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        signup: state.signup,
        stylist: state.stylistInfo,
        updateProfileRes: state.updateProfileReducer,
        changePasswordRes: state.changePasswordReducer,
        updateProfilePic: state.updateProfilePicReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
        updateProfileAction: (params) => dispatch(updateProfile(params)),
        changePasswordAction: (params) => dispatch(changePassword(params)),
        updateProfilePicAction: (params) => dispatch(updateProfilePic(params)),
        updateProfileObjAction: (params) => dispatch(updateProfileObj(params)),
        saveSignupResponseAction: (value) => dispatch(saveSignupResponse(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
