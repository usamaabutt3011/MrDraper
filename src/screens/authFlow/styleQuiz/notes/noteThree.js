import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import { Header, Steps, CustomInputField, DropDownCard, Button, MediumTitle, LargeTitle, SmallText, NormalText, AddressCard, Loader } from '../../../../components';
import { WP, colors, data, family } from '../../../../services';
import { addressList, scheduleQuiz, ScheduleQuizObj, areaList, addAddress } from '../../../../store/actions';
import { styles } from './styles';

const cities = [
    { label: "Dubai", value: 'Dubai' },
    { label: "Abu Dhabi", value: 'Abu Dhabi' },
    { label: "Sharjah", value: 'Sharjah' },
    { label: "Ajman", value: 'Ajman' },
    { label: "Al Ain", value: 'Al Ain' },
    { label: "Fujairah", value: 'Fujairah' },
    { label: "Ras Al Khaimah", value: 'Ras Al Khaimah' }]
const yml = data.member_settings_v7.en.style_profile_quiz.scheduling;

class NoteThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            areaList: [],
            selectedAddress: '',
            vilaNo: '',
            buildingNo: '',
            workArea: '',
            city: '',
            area: '',
            selectedAddObj: null,
            isModel: false
        }
    }
    toggleModle = async () => {
        this.setState({
            isModel: !this.state.isModel
        })
    }
    componentDidMount = async () => {
        const { addressListAction, signup } = this.props;
        console.log('[signup]', signup);

        let params = {
            user_id: signup.signupRes.result.user_id, //8
        }
        console.log('[signup]', params);
        await addressListAction(params)
    }
    componentWillReceiveProps = async (props) => {
        const { loading, isSuccess, isFailure, error, addressList } = props.addresses;
        const { signupRes } = props.signup;
        let { areaList } = this.state;

        //Schedule Quiz Section
        if (isSuccess) {
            let i = 1
            addressList && addressList.result.forEach(item => {
                item.address = 'Address ' + i++
                // item.name = signupRes.result.name
                item.checked = false
            })
            // console.log('[componentWillReceiveProps address screen]', props.addresses);
        } else {
            // console.log('[componentWillReceiveProps address screen]',error);
        }
        
        //Schedule Quiz Section
        // console.log('[componentWillReceiveProps schedule success]', props.scheduleQuiz);
        if (props.scheduleQuiz.isSuccess) {
            props.scheduleQuiz.isSuccess = false
            this.props.navigation.push('NoteFour', {
                delivery: `${props.scheduleQuiz.scheduleQuizObj.package_send_date}, ${props.scheduleQuiz.scheduleQuizObj.package_send_time}`,
                deliverTo: props.scheduleQuiz.selectedAddress
            })
        } else {
            // console.log('err===>>>',props.scheduleQuiz.error);
        }
        //Get Areas API Section
        console.log('[componentWillReceiveProps getArea success]', props.areaList);
        if (props.areaList.isSuccess) {
            props.areaList.areaList.result.forEach(element => {
                areaList.push({ label: element, value: element });
            })
            this.setState({ areaList })
        } else {
            // console.log('err===>>>',props.scheduleQuiz.error);
        }
        //Add new Address Section
        console.log('[componentWillReceiveProps newAddress success]', props.newAddress);
        if (props.newAddress.isSuccess && props.newAddress.newAddressList.isSuccess) {
            Toast.show(props.newAddress.newAddressList.message)
            let i = 1
            props.newAddress.newAddressList.result.forEach(item => {
                item.address = 'Address ' + i++
                // item.name = signupRes.result.name
                item.checked = false
            })
            addressList.result = props.newAddress.newAddressList.result;
            this.setState({
                isModel: false
            })
        } else {
            // console.log('err===>>>',props.scheduleQuiz.error);
        }
    }
    selectAddress = (value) => {
        const { addresses } = this.props;
        addresses.addressList.result.forEach(async item => {
            if (item.id == value.id) {
                item.checked = true;
                this.setState({ selectedAddress: item.area, selectedAddObj: item })
            } else {
                item.checked = false;
            }
        })
        this.setState({ refresh: false })
    }
    submitSchedule = async () => {
        const { selectedAddress, selectedAddObj } = this.state;
        const { signup, scheduleQuiz, ScheduleQuizObjAction, scheduleQuizAction } = this.props;
        var params = scheduleQuiz.scheduleQuizObj
        params.package_send_address = selectedAddress;
        scheduleQuiz.selectedAddress = selectedAddObj;
        params.user_id = signup.signupRes.result.user_id,
            await ScheduleQuizObjAction(params)
        if (params.package_send_address == "") {
            Toast.show('Please select any address.')
        } else {
            // console.log('[params scheduling]',params)
            await scheduleQuizAction(params)
            // console.log('[params scheduling]',scheduleQuiz);
        }
    }
    getArea = async (value) => {
        const { areaListAction } = this.props;
        this.setState({ city: value })
        let param = {
            city: value
        }
        await areaListAction(param)
    }
    addAddress = async () => {
        const { addAddressAction, signup } = this.props;
        const { vilaNo, buildingNo, city, area, workArea } = this.state;
        if (vilaNo == '') {
            Toast.show('Please enter Flat/Villa No.')
        } else {
            if (buildingNo == '') {
                Toast.show('Please enter Building or Street.')
            } else {
                if (city == '') {
                    Toast.show('Please enter city.')
                } else {
                    if (area == '') {
                        Toast.show('Please enter area.')
                    } else {
                        if (workArea == '') {
                            Toast.show('Please enter home or office.')
                        } else {
                            let params = {
                                user_id: signup.signupRes.result.user_id, //'8'
                                area: area,
                                line_1: vilaNo,
                                line_2: buildingNo,
                                home: workArea == 'Home' ? true : false,
                            }
                            await addAddressAction(params)
                        }
                    }
                }
            }
        }
    }
    render() {
        const { addresses, scheduleQuiz, newAddress, userRes } = this.props;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={true}
                        // onPressLeft={() => this.props.navigation.goBack()}
                        onPressLeft={() => this.props.navigation.navigate('ShirtsFit')}
                    />
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Steps
                            isCheckStyle={true}
                            isCheckPreference={true}
                            styleQuiz={true}  // chane the stepper text
                            isCheckStylist={false}
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={[styles.subContainerPersonal, { alignItems: "flex-start" }]}>
                            <MediumTitle
                                text={yml.q3}
                                style={{ marginHorizontal: WP('5'), marginTop: WP('5'), alignSelf: 'flex-start' }}
                            />
                            <SmallText
                                text='Select Address'
                                style={{ marginTop: WP('5'), marginBottom: WP('5'), color: colors.mediumGrey, marginHorizontal: WP('5') }}
                            />
                            {
                                addresses.loading ?
                                    <Loader
                                        style={{ alignSelf: 'center' }}
                                    />
                                    :
                                    addresses.isSuccess && addresses.addressList.result.length > 0 ?
                                        addresses.addressList.result.map((item, key) => {
                                            return (
                                                <AddressCard
                                                    key={key}
                                                    name={userRes.userProfile.result.name}
                                                    item={item}
                                                    onPress={() => this.selectAddress(item)}
                                                />
                                            )
                                        })
                                        :
                                        <SmallText
                                            text='You have not any address history! Please add your address first.'
                                            style={{ alignSelf: 'center', marginHorizontal: WP('5'), marginVertical: WP('5') }}
                                        />
                            }
                            <View style={{ width: WP('80'), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: WP('5') }}>
                                <Button
                                    title={'ADD NEW ADDRESS'}
                                    onPress={this.toggleModle}
                                    titleStyle={{ color: colors.mediumGrey }}
                                    style={{ width: WP('45'), marginBottom: WP('6'), backgroundColor: colors.buttonColorLight }}
                                />
                                <Button
                                    title={'NEXT'}
                                    showLoader={scheduleQuiz.loading}
                                    // disabled={this.state.selectedAddress !== "" ? false : true}
                                    onPress={() => {
                                        this.submitSchedule()
                                    }}
                                    style={{ width: WP('25'), alignSelf: 'flex-end', marginBottom: WP('6') }}
                                />
                            </View>
                        </View>
                        <Modal
                            animationInTiming={500}
                            animationOutTiming={500}
                            animationIn="slideInLeft"
                            animationOut="slideOutRight"
                            avoidKeyboard={true}
                            transparent={true}
                            isVisible={this.state.isModel}
                            // onBackdropPress={() => this.toggleModle()}
                            style={{ flex: 1, justifyContent: 'flex-start' }}
                        >
                            <View style={{ height: WP('160'), width: '95%', alignSelf: 'center', marginTop: WP('5'), borderRadius: 5, backgroundColor: colors.white }}>
                                <LargeTitle
                                    text={'Add New Address'}
                                    style={{ marginHorizontal: WP('5'), marginTop: WP('7'), marginBottom: WP('7'), alignSelf: 'flex-start' }}
                                />
                                <NormalText
                                    text='Address 1'
                                    style={{ marginBottom: WP('6'), marginHorizontal: WP('5'), fontFamily: family.boldText }}
                                />
                                <View style={styles.rowFieldsCon}>
                                    <CustomInputField
                                        label={'Flat/Villa No.'}
                                        isRightIcon={false}
                                        placeholderText={'502'}
                                        keyboardType={'number-pad'}
                                        placeholderTextColor={colors.lightGrey}
                                        onChangeText={(value) => this.setState({ vilaNo: value })}
                                        containerStyle={styles.fieldCon}
                                        style={styles.rowFields}
                                    />
                                    <CustomInputField
                                        label={'Building Street'}
                                        isRightIcon={false}
                                        placeholderText={'La Visa'}
                                        placeholderTextColor={colors.lightGrey}
                                        keyboardType={'default'}
                                        onChangeText={(value) => this.setState({ buildingNo: value })}
                                        containerStyle={styles.fieldCon}
                                        style={styles.rowFields}
                                    />
                                </View>
                                <DropDownCard
                                    child={false}
                                    // value={weightValue}
                                    headerEnable={false}
                                    dropDownOptions={cities}
                                    label={'City'}
                                    dropdwonStyle={{ height: WP('40'), width: WP('75') }}
                                    dropdownCon={{ width: WP('75'), marginLeft: 0, borderWidth: 1.5 }}
                                    style={{ height: WP('16'), width: WP('75'), alignSelf: 'center', marginBottom: WP('3') }}
                                    onSelectItem={(index, value) => this.getArea(value)}
                                />
                                <DropDownCard
                                    child={false}
                                    disabled={this.state.areaList.length > 0 ? false : true}
                                    // value={weightValue}
                                    headerEnable={false}
                                    dropDownOptions={this.state.areaList}
                                    label={'Area'}
                                    dropdwonStyle={{ height: WP('40'), width: WP('75') }}
                                    dropdownCon={{ width: WP('75'), marginLeft: 0, borderWidth: 1.5 }}
                                    style={{ height: WP('16'), width: WP('75'), alignSelf: 'center', marginBottom: WP('3') }}
                                    onSelectItem={(index, value) => this.setState({ area: value })}
                                />
                                <DropDownCard
                                    child={false}
                                    // value={weightValue}
                                    headerEnable={false}
                                    dropDownOptions={[{ label: "Home", value: "Home" }, { label: "Office", value: "Office" }]}
                                    label={'Home or Office?'}
                                    dropdwonStyle={{ height: WP('16'), width: WP('75') }}
                                    dropdownCon={{ width: WP('75'), marginLeft: 0, borderWidth: 1.5 }}
                                    style={{ height: WP('16'), width: WP('75'), alignSelf: 'center', marginBottom: WP('2') }}
                                    onSelectItem={(index, value) => this.setState({ workArea: value })}
                                />
                                {
                                    this.props.areaList.loading ?
                                        <Loader
                                            style={{ alignSelf: 'center', height: WP('28') }}
                                        />
                                        :
                                        <View style={{ height: WP('28'), alignSelf: 'center' }} />
                                }
                                <View style={{ width: WP('75'), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                                    <Button
                                        title={'CANCEL'}
                                        onPress={this.toggleModle}
                                        titleStyle={{ color: colors.mediumGrey }}
                                        style={{ width: WP('25'), marginBottom: WP('6'), backgroundColor: colors.buttonColorLight }}
                                    />
                                    <Button
                                        title={'ADD ADDRESS'}
                                        showLoader={newAddress.loading}
                                        disabled={false}
                                        onPress={() => {
                                            this.addAddress()
                                        }}
                                        style={{ width: WP('45'), alignSelf: 'flex-end', marginBottom: WP('6') }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

mapStateToProps = (state) => {
    return {
        signup: state.signup,
        areaList: state.areaListReducer,
        addresses: state.addressesList,
        scheduleQuiz: state.scheduleQuiz,
        newAddress: state.addAddressReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        areaListAction: (params) => dispatch(areaList(params)),
        addAddressAction: (params) => dispatch(addAddress(params)),
        addressListAction: (params) => dispatch(addressList(params)),
        scheduleQuizAction: (params) => dispatch(scheduleQuiz(params)),
        ScheduleQuizObjAction: (params) => dispatch(ScheduleQuizObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteThree);
