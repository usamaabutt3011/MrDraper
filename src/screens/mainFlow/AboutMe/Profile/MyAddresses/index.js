import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import { Header, CustomInputField, DropDownCard, Button, MediumTitle, LargeTitle, SmallText, NormalText, AddressCard, Loader } from '../../../../../components';
import { WP, colors, data, family } from '../../../../../services';
import { addressList, scheduleQuiz, ScheduleQuizObj, areaList, addAddress, removeAddress, editAddress } from '../../../../../store/actions';
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

class MyAddresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            isEditAdd: false,
            areaList: [],
            selectedAddress: '',
            address_id: '',
            vilaNo: '',
            buildingNo: '',
            workArea: 'Please Select..',
            city: 'Please Select..',
            area: 'Please Select..',
            selectedAddObj: null,
            isModel: false
        }
    }
    toggleModle = async () => {
        this.setState({
            isEditAdd: false,
            vilaNo: '',
            buildingNo: '',
            workArea: 'Please Select..',
            city: 'Please Select..',
            area: 'Please Select..',
            isModel: !this.state.isModel
        })
    }
    componentDidMount = async () => {
        const { addressListAction, userRes } = this.props;
        let params = {
            user_id: userRes.userProfile.result.user_id,
        }
        await addressListAction(params)
    }
    componentWillReceiveProps = async (props) => {
        const { loading, isSuccess, isFailure, error, addressList } = props.addresses;
        let { areaList } = this.state;
        console.log('[componentWillReceiveProps props]', props);
        //Schedule Quiz Section
        if (isSuccess) {
            props.addresses.isSuccess = false;
            let i = 1;
            addressList.result.forEach(item => {
                item.address = 'Address ' + i++
                item.checked = false
            })
            console.log('[componentWillReceiveProps address screen]', props.addresses);
            // console.log('[componentWillReceiveProps address screen]', props.signup);
        } else {
            // console.log('[componentWillReceiveProps address screen]',error);
        }
        //=========================================================================================
        //Schedule Quiz Section
        if (props.scheduleQuiz.isSuccess) {
            props.scheduleQuiz.isSuccess = false
            console.log('[componentWillReceiveProps schedule success]', props.scheduleQuiz);
            this.props.navigation.push('DeliveryDetails', {
                delivery: `${props.scheduleQuiz.scheduleQuizObj.package_send_date}, ${props.scheduleQuiz.scheduleQuizObj.package_send_time}`,
                deliverTo: props.scheduleQuiz.selectedAddress,
            })
        } else {
            // console.log('err===>>>',props.scheduleQuiz.error);
        }
        //=========================================================================================
        //Get Areas API Section
        if (props.areaList.isSuccess) {
            props.areaList.isSuccess = false;
            areaList.length = 0
            props.areaList.areaList.result.forEach(element => {
                areaList.push({ label: element, value: element });
            })
            this.setState({ areaList })
            console.log('[componentWillReceiveProps getArea success]', props.areaList, areaList);
        } else {
            // console.log('err===>>>',props.scheduleQuiz.error);
        }
        //=========================================================================================
        //Add new Address Section
        if (props.newAddress.isSuccess && props.newAddress.newAddressList.isSuccess) {
            console.log('[componentWillReceiveProps newAddress success]', props.newAddress);
            props.newAddress.isSuccess = false;
            Toast.show(props.newAddress.newAddressList.message)
            let i = 1
            props.newAddress.newAddressList.result && props.newAddress.newAddressList.result.forEach(item => {
                item.address = 'Address ' + i++
                item.checked = false
            })
            if (addressList) {
                addressList.result = props.newAddress.newAddressList.result;
            } else {
                props.addresses.addressList = { result:  props.newAddress.newAddressList.result}
            }
            console.log('[componentWillReceiveProps newAddress addressList]', addressList);
            this.setState({
                isModel: false
            })
        } else {
            console.log('err===>>>',props.scheduleQuiz.error);
        }

        //=========================================================================================
        //remove Address Section deleteAddress
        if (props.deleteAddress.isSuccess && props.deleteAddress.deleteAddressRes.isSuccess) {
            props.deleteAddress.isSuccess = false;
            Toast.show(props.deleteAddress.deleteAddressRes.message)
            let i = 1
            props.deleteAddress.deleteAddressRes.result.forEach(item => {
                item.address = 'Address ' + i++
                item.checked = false
            })
            addressList.result = props.deleteAddress.deleteAddressRes.result;
            this.setState({
                isModel: false
            })
        } else {
            // console.log('err===>>>',props.scheduleQuiz.error);
        }
        //=========================================================================================
        //edit Address Section deleteAddress
        if (props.editAddress.isSuccess && props.editAddress.editAddressRes.isSuccess) {
            props.editAddress.isSuccess = false;
            Toast.show(props.editAddress.editAddressRes.message)
            let i = 1
            props.editAddress.editAddressRes.result && props.editAddress.editAddressRes.result.forEach(item => {
                item.address = 'Address ' + i++
                item.checked = false
            })
            addressList.result = props.editAddress.editAddressRes.result;
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
        const { userRes, scheduleQuiz, ScheduleQuizObjAction, scheduleQuizAction } = this.props;
        var params = scheduleQuiz.scheduleQuizObj;
        params.package_send_address = selectedAddress;
        scheduleQuiz.selectedAddress = selectedAddObj;
        params.user_id = userRes.userProfile.result.user_id,
            await ScheduleQuizObjAction(params)
        if (params.package_send_address == "") {
            Toast.show('Please select any address.')
        } else {
            console.log('[params scheduling]', params)
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
        const { addAddressAction, editAddressAction, userRes } = this.props;
        const { vilaNo, buildingNo, city, area, workArea, address_id } = this.state;
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
                            if (this.state.isEditAdd) {
                                let params = {
                                    user_id: userRes.userProfile.result.user_id,
                                    address_id: address_id,
                                    area: area,
                                    line_1: vilaNo,
                                    line_2: buildingNo,
                                    home: workArea == 'Home' ? true : false,
                                }
                                console.log('[MyAddress.js] isEdited', params);
                                await editAddressAction(params)
                            } else {
                                let params = {
                                    user_id: userRes.userProfile.result.user_id,
                                    area: area,
                                    line_1: vilaNo,
                                    line_2: buildingNo,
                                    home: workArea == 'Home' ? true : false,
                                }
                                console.log('[MyAddress.js] isCreated', params);
                                await addAddressAction(params)
                            }
                        }
                    }
                }
            }
        }
    }
    removeAddress = async (item) => {
        const { removeAddressAction, userRes } = this.props;
        let params = {
            user_id: userRes.userProfile.result.user_id,
            address_id: item.id,
        }
        console.log('[MyAddressess.js] Params', params);
        await removeAddressAction(params);
    }
    fillAllFields = async (item) => {
        const { userRes } = this.props;
        // console.log('[MyAddress.js] fillAllFields item', item);
        this.setState({
            address_id: item.id,
            isEditAdd: true,
            vilaNo: item.line_1,
            buildingNo: item.line_2,
            city: item.city,
            area: item.area,
            workArea: item.home ? 'Home' : 'Office',
            isModel: true
        }, async () => {
            console.log('[MyAddressess.js] select', item);
            await this.getArea(item.city)
        })
    }
    render() {
        const { isEditAdd, vilaNo, buildingNo, city, area, workArea } = this.state;
        const { addresses, deleteAddress, newAddress, editAddress, userRes } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('TabStack')}
                />
                {
                    deleteAddress.loading ?
                        <Loader
                            style={{ marginTop: WP('30') }}
                        />
                        :
                        <ScrollView
                            style={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ height: WP('7') }} />
                            <MediumTitle
                                text={`Address Book`}
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('5'), alignSelf: 'flex-start' }}
                            />
                            {
                                addresses.loading ?
                                    <Loader
                                        style={{ alignSelf: 'center' }}
                                    />
                                    :
                                    addresses.addressList && addresses.addressList.result.length > 0 ?
                                        addresses.addressList.result.map((item, key) => {
                                            return (
                                                <AddressCard
                                                    key={key}
                                                    name={userRes.userProfile.result.name}
                                                    item={item}
                                                    disabled={true}
                                                    showLoaderRemover={deleteAddress.loading}
                                                    onEditPress={() => this.fillAllFields(item)}
                                                    onRemovePress={() => this.removeAddress(item)}
                                                />
                                            )
                                        })
                                        : 
                                        <SmallText
                                            text={`Please add an address by clicking Add Address button.`}
                                            // text={`${addresses.addressList.message}`}
                                            style={{ alignSelf: 'center', marginVertical: WP('10'), marginHorizontal: WP('8'), textAlign: 'center', color: colors.mediumGrey }}
                                        />
                            }
                            <View style={{ width: WP('90'), flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', marginTop: WP('5') }}>
                                <Button
                                    title={'ADD ADDRESS'}
                                    onPress={() => this.toggleModle()}
                                    style={{ width: WP('40'), alignSelf: 'flex-end', marginBottom: WP('6'), backgroundColor: colors.black }}
                                />
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
                                            value={vilaNo}
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
                                            value={buildingNo}
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
                                        child={true}
                                        value={city}
                                        headerEnable={false}
                                        dropDownOptions={cities}
                                        label={'City'}
                                        dropdwonStyle={{ height: WP('40'), width: WP('75') }}
                                        dropdownCon={{ width: WP('75'), marginLeft: 0, borderWidth: 1.5 }}
                                        style={{ height: WP('16'), width: WP('75'), alignSelf: 'center', marginBottom: WP('3') }}
                                        onSelectItem={(index, value) => this.getArea(value)}
                                    />
                                    <DropDownCard
                                        child={true}
                                        disabled={this.state.areaList.length > 0 ? false : true}
                                        value={area}
                                        headerEnable={false}
                                        dropDownOptions={this.state.areaList}
                                        label={'Area'}
                                        dropdwonStyle={{ height: WP('40'), width: WP('75') }}
                                        dropdownCon={{ width: WP('75'), marginLeft: 0, borderWidth: 1.5 }}
                                        style={{ height: WP('16'), width: WP('75'), alignSelf: 'center', marginBottom: WP('3') }}
                                        onSelectItem={(index, value) => this.setState({ area: value })}
                                    />
                                    <DropDownCard
                                        child={true}
                                        value={workArea}
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
                                            title={isEditAdd ? 'UPDATE ADDRESS' : 'ADD ADDRESS'}
                                            showLoader={newAddress.loading || editAddress.loading}
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
                }
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userRes: state.login,
        areaList: state.areaListReducer,
        addresses: state.addressesList,
        scheduleQuiz: state.scheduleQuiz,
        newAddress: state.addAddressReducer,
        deleteAddress: state.removeAddressReducer,
        editAddress: state.editAddressReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        areaListAction: (params) => dispatch(areaList(params)),
        addAddressAction: (params) => dispatch(addAddress(params)),
        editAddressAction: (params) => dispatch(editAddress(params)),
        addressListAction: (params) => dispatch(addressList(params)),
        scheduleQuizAction: (params) => dispatch(scheduleQuiz(params)),
        removeAddressAction: (params) => dispatch(removeAddress(params)),
        ScheduleQuizObjAction: (params) => dispatch(ScheduleQuizObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddresses);
