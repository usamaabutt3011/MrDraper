import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, Button, DropDownCard } from '../../../../../components';
import { WP, data, colors, family } from '../../../../../services';
import { UpdateSizeFitObj, updateSizeFitRequest } from '../../../../../store/actions'
import { styles } from '../styles';

let lowWeight = 35;
let highWeight = 130;
var weightList = []; //

//Height initial states
let lowHeight = 150
let highHeight = 220
var heightList = []

const shirt_fit = [
    { label: 'No idea', value: 'No idea' },
    { label: 'Slim Fit', value: 'Slim Fit' },
    { label: 'Regular Fit', value: 'Regular Fit' }]

const pant_fit = [
    { label: 'No idea', value: 'No idea' },
    { label: 'Skinny Fit', value: 'Skinny Fit' },
    { label: 'Slim Fit', value: 'Slim Fit' },
    { label: 'Regular Fit', value: 'Regular Fit' }]

const shirt_sizes = [
    { label: 'No idea', value: 'No idea' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' }]

const waist_sizes = [
    { label: 'No idea', value: 'No idea' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
    { label: '32', value: '32' },
    { label: '33', value: '33' },
    { label: '34', value: '34' },
    { label: '35', value: '35' },
    { label: '36', value: '36' },
    { label: '37', value: '37' },
    { label: '38', value: '38' },
    { label: '39', value: '39' },
    { label: '40', value: '40' }]

const blazer_sizes = [
    { label: 'No idea', value: 'No idea' },
    { label: '44', value: '44' },
    { label: '46', value: '46' },
    { label: '48', value: '48' },
    { label: '50', value: '50' },
    { label: '52', value: '52' },
    { label: '54', value: '54' },
    { label: '56', value: '56' },
    { label: '58', value: '58' }]

const shoe_sizes = [
    { label: 'No idea', value: 'No idea' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
    { label: '42', value: '42' },
    { label: '43', value: '43' },
    { label: '44', value: '44' },
    { label: '45', value: '45' }]

class EditDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false
        }
    }
    componentWillReceiveProps = async (props) => {
        console.log('[EditDetails.js] componentWillReceiveProps Props', props);
        const { updateRes, userRes } = props
        if (updateRes.isSuccess) {
            updateRes.isSuccess = false;
            // Refresh the Details screen value
            userRes.userProfile.result.shirt_size = updateRes.updateSizeFitObj.shirt_size;
            userRes.userProfile.result.shirts_fit = updateRes.updateSizeFitObj.shirts_fit;
            userRes.userProfile.result.waist_size = updateRes.updateSizeFitObj.waist_size;
            userRes.userProfile.result.pants_fit = updateRes.updateSizeFitObj.pants_fit;
            userRes.userProfile.result.blazer_size = updateRes.updateSizeFitObj.blazer_size;
            userRes.userProfile.result.shoe_size = updateRes.updateSizeFitObj.shoe_size;
            userRes.userProfile.result.height = updateRes.updateSizeFitObj.height;
            userRes.userProfile.result.weight = updateRes.updateSizeFitObj.weight;
            console.log('[render.js] login details', userRes);
            props.navigation.push('DetailCorrection')
        }
    }
    componentWillMount = async () => {
        const { UpdateSizeFitObjAction, updateRes, userRes } = this.props;
        var params = updateRes.updateSizeFitObj
        params.user_id = userRes.userProfile.result.user_id;
        params.shirt_size = userRes.userProfile.result.shirt_size;
        params.shirts_fit = userRes.userProfile.result.shirts_fit;
        params.waist_size = userRes.userProfile.result.waist_size;
        params.pants_fit = userRes.userProfile.result.pants_fit;
        params.blazer_size = userRes.userProfile.result.blazer_size;
        params.shoe_size = userRes.userProfile.result.shoe_size;
        params.height = userRes.userProfile.result.height.toString();
        params.weight = userRes.userProfile.result.weight.toString();
        await UpdateSizeFitObjAction(params)
        //Initially set the arrays for height and weight
        for (var i = lowWeight; i <= highWeight; i++) {
            weightList.push({ label: i.toString(), value: i.toString() })
        }

        for (let i = lowHeight; i <= highHeight; i++) {
            heightList.push({ label: i.toString(), value: i.toString() });
        }
        this.setState({ refresh: true })
    }
    selectItem = async (index, value, label) => {
        const { updateRes, UpdateSizeFitObjAction } = this.props;
        var params = updateRes.updateSizeFitObj
        switch (label) {
            case 's_size':
                params.shirt_size = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 's_fit':
                params.shirts_fit = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 'w_size':
                params.waist_size = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 'p_fit':
                params.pants_fit = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 'b_size':
                params.blazer_size = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 'shoe_size':
                params.shoe_size = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 'height':
                params.height = value;
                await UpdateSizeFitObjAction(params)
                break;
            case 'weight':
                params.weight = value;
                await UpdateSizeFitObjAction(params)
                break;
            default:
                break;
        }
    }
    UpdateUserSizes = async () => {
        const { updateSizeFitRequestAction, updateRes } = this.props;
        var params = updateRes.updateSizeFitObj
        await updateSizeFitRequestAction(params)
    }
    render() {
        const { updateRes } = this.props;
        var params = updateRes.updateSizeFitObj
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ height: WP('7') }} />
                    <View style={styles.subContainer}>
                        <LargeTitle
                            text={`My Profile`}
                            style={[styles.title, { marginRight: WP('10') }]}
                        />
                        <NormalText
                            text={`Update Sizes and Fits`}
                            style={styles.normalText}
                        />
                        <View style={{ height: WP('4') }} />
                        <View style={styles.rowFieldsCon}>
                            <DropDownCard
                                child={true}
                                value={params.shirt_size}
                                headerEnable={false}
                                dropDownOptions={shirt_sizes}
                                label={'Shirt Size'}
                                hideIcon={true}
                                iconStyle={{ right: -5 }}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 's_size')}
                            />
                            <DropDownCard
                                child={true}
                                value={params.shirts_fit}
                                headerEnable={false}
                                dropDownOptions={shirt_fit}
                                label={'Shirts Fit'}
                                hideIcon={true}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 's_fit')}
                            />
                        </View>
                        <View style={styles.rowFieldsCon}>
                            <DropDownCard
                                child={true}
                                value={params.waist_size}
                                headerEnable={false}
                                dropDownOptions={waist_sizes}
                                label={'Waist Size'}
                                hideIcon={true}
                                iconStyle={{ right: -5 }}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'w_size')}
                            />
                            <DropDownCard
                                child={true}
                                value={params.pants_fit}
                                headerEnable={false}
                                dropDownOptions={pant_fit}
                                label={'Pants Fit'}
                                hideIcon={true}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'p_fit')}
                            />
                        </View>
                        <View style={styles.rowFieldsCon}>
                            <DropDownCard
                                child={true}
                                value={params.blazer_size}
                                headerEnable={false}
                                dropDownOptions={blazer_sizes}
                                label={'Blazer Size'}
                                hideIcon={true}
                                iconStyle={{ right: -5 }}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'b_size')}
                            />
                            <DropDownCard
                                child={true}
                                value={params.shoe_size}
                                headerEnable={false}
                                dropDownOptions={shoe_sizes}
                                label={'Shoe Size'}
                                hideIcon={true}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'shoe_size')}
                            />
                        </View>
                        <View style={styles.rowFieldsCon}>
                            <DropDownCard
                                child={true}
                                value={params.height}
                                headerEnable={false}
                                dropDownOptions={heightList}
                                label={'Height'}
                                hideIcon={true}
                                iconStyle={{ right: -5 }}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'height')}
                            />
                            <DropDownCard
                                child={true}
                                value={params.weight}
                                headerEnable={false}
                                dropDownOptions={weightList}
                                label={'Weight'}
                                hideIcon={true}
                                dropdwonStyle={{ height: WP('25'), width: WP('33') }}
                                dropdownCon={{ width: WP('36'), marginLeft: 0, borderWidth: 1.5 }}
                                style={{ height: WP('16'), width: WP('36'), alignSelf: 'center', marginBottom: WP('3') }}
                                dropdownConStyle={{ width: WP('36') }}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'weight')}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: WP('76'), marginTop: WP('3'), marginBottom: WP('2'), alignSelf: 'center', justifyContent: 'space-between' }}>
                            <Button
                                title={`GO BACK`}
                                titleStyle={{ color: colors.black }}
                                onPress={() => this.props.navigation.goBack()}
                                style={[styles.buttonUpdateScreen, { backgroundColor: colors.bgColor }]}
                            />
                            <Button
                                title={`UPDATE PROFILE`}
                                showLoader={updateRes.loading}
                                style={styles.buttonUpdateScreen}
                                onPress={() => this.UpdateUserSizes()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        updateRes: state.updateRequestReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        UpdateSizeFitObjAction: (params) => dispatch(UpdateSizeFitObj(params)),
        updateSizeFitRequestAction: (params) => dispatch(updateSizeFitRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDetail);
