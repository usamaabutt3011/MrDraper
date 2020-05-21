import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { withNavigation } from 'react-navigation'
import { Header, ProfileHeader, ProfileHeaderTabs, DropDownCard, SmallText, Button, Steps } from '../../../../../components';
import { WP, colors, data, appImages } from '../../../../../services';
import { mySizesObj, updateSizes, saveSignupResponse } from '../../../../../store/actions';
import { styles } from './styles';
import { HeaderTitle } from 'react-navigation-stack';

const mySizesArr = [
    {
        tab: 'Shirt Size',
        checked: true,
    },
    {
        tab: 'Waist Size',
        checked: false
    },
    {
        tab: 'Blazer Size',
        checked: false
    },
    {
        tab: 'Shoe Size',
        checked: false
    },
    {
        tab: 'Weight',
        checked: false
    },
    {
        tab: 'Height',
        checked: false
    },
];

const HW = data.member_settings_v7.en.labels.height_weight;
// 
let lowWeight = 35;
let highWeight = 130;
var list = []; //
let weightListKg = [];
let weightListLbs = [];


//Height initial states
let lowHeight = 150
let highHeight = 220
var heightList = []
let heightListIn = []
let heightListCm = []

const heightFoot = [`No idea`, `4' 9''`, `5' 0''`, `5' 1''`, `5' 2''`, `5' 3''`, `5' 4''`, `5' 5''`, `5' 6''`, `5' 7''`, `5' 8''`, `5' 9''`, `6' 0''`, `6' 1''`, `6' 2''`, `6' 3''`, `6' 4''`, `6' 5''`, `6' 6''`, `6' 7''`, `6' 8''`, `6' 9''`, `7' 0''`, `7' 1''`, `7' 2''`]
//
const size = data.member_settings_v7.en.labels.sizes;

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

const blazer_sizes_EUR = [
    { label: 'No idea', value: 'No idea' },
    { label: '44', value: '44' },
    { label: '46', value: '46' },
    { label: '48', value: '48' },
    { label: '50', value: '50' },
    { label: '52', value: '52' },
    { label: '54', value: '54' },
    { label: '56', value: '56' },
    { label: '58', value: '58' }]
const blazer_sizes_UK = [
    { label: 'No idea', value: 'No idea' },
    { label: '34', value: '34' },
    { label: '36', value: '36' },
    { label: '38', value: '38' },
    { label: '40', value: '40' },
    { label: '42', value: '42' },
    { label: '44', value: '44' },
    { label: '46', value: '46' },
    { label: '48', value: '48' },]

const shoe_sizes_EUR = [
    { label: 'No idea', value: 'No idea' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
    { label: '42', value: '42' },
    { label: '43', value: '43' },
    { label: '44', value: '44' },
    { label: '45', value: '45' }]
const shoe_sizes_UK = [
    { label: 'No idea', value: 'No idea' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }]
const shoe_sizes_US = [
    { label: 'No idea', value: 'No idea' },
    { label: '7.5', value: '7.5' },
    { label: '8.5', value: '8.5' },
    { label: '9.5', value: '9.5' },
    { label: '10.5', value: '10.5' },
    { label: '11.5', value: '11.5' },
    { label: '12.5', value: '12.5' },]

const weight = [
    { label: HW.kg, value: "kg" },
    { label: HW.lbs, value: "lbs" },
];
const height = [
    { label: HW.cm, value: "cm" },
    { label: HW.in, value: "in" },
];

const sizes = [
    { label: "EUR", value: "eur" },
    { label: "UK/US", value: "uk" },
];
const shoeSizes = [
    { label: "EUR", value: "eur" },
    { label: "UK", value: "uk" },
    { label: "US", value: "us" },
];
class MySizes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            blazerEUR: true,
            blazerUK: false,
            shoeEUR: true,
            shoeUK: false,
            shoeUS: false,
            weightKg: true,
            weightLbs: false,
            heightIn: false,
            heightCm: true,
            shirtSize: 'Please select...',
            waistSize: 'Please select...',
            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,
            heightValues: {
                heightValueIn: 'Please select...',
                heightValueCm: 'Please select...',
            },
            weightValues: {
                weightValueKg: 'Please select...',
                weightValueLbs: 'Please select...',
            },
            blazerSizeValues: {
                blazerSizeEUR: 'Please select...',
                blazerSizeUK: 'Please select...',
            },
            shoeSizeValues: {
                shoeSizeEUR: 'Please select...',
                shoeSizeUK: 'Please select...',
                shoeSizeUS: 'Please select...',
            },
            changeDetacted: false
        }
    }

    convertCMtoIN(n) {
        // let footCal = (numCM / 12).toFixed('1')
        // let subString = footCal.split(".")
        // return subString[0] + "' " + subString[1] + "''";
        var realFeet = ((n * 0.393700) / 12);
        var feet = Math.floor(realFeet);
        var inches = Math.round((realFeet - feet) * 12);
        return feet + "' " + inches + "''";
    }

    componentWillMount = () => {
        console.log('[MySizes.js] componentWillMount props', this.props);
        // initially fill all the fields

        const { userRes, updateSize } = this.props;
        if (userRes.userProfile.isSuccess) {
            // Refresh the Details screen value
            updateSize.mySizesObj.shirt_size = userRes.userProfile.result.shirt_size;
            updateSize.mySizesObj.waist_size = userRes.userProfile.result.waist_size;
            updateSize.mySizesObj.blazer_size = userRes.userProfile.result.blazer_size;
            updateSize.mySizesObj.shoe_size = userRes.userProfile.result.shoe_size;
            updateSize.mySizesObj.height = userRes.userProfile.result.height;
            updateSize.mySizesObj.weight = userRes.userProfile.result.weight;

            let { heightValues, weightValues, blazerSizeValues, shoeSizeValues } = this.state;

            heightValues.heightValueCm = (userRes.userProfile.result.height).toString();
            heightValues.heightValueIn = this.convertCMtoIN(userRes.userProfile.result.height);
            console.log('value in Inhces===============:', heightValues.heightValueIn); 

            weightValues.weightValueKg = userRes.userProfile.result.weight.toString();
            weightValues.weightValueLbs = Math.round(userRes.userProfile.result.weight * 2.2046).toString();

            blazerSizeValues.blazerSizeEUR = userRes.userProfile.result.blazer_size.toString();
            blazerSizeValues.blazerSizeUK = userRes.userProfile.result.blazer_size !== "No idea" ? (JSON.parse(userRes.userProfile.result.blazer_size) - 10).toString() : "No idea";

            shoeSizeValues.shoeSizeEUR = userRes.userProfile.result.shoe_size == '' ? "No idea" : userRes.userProfile.result.shoe_size;
            shoeSizeValues.shoeSizeUK = userRes.userProfile.result.shoe_size == "No idea" ? "No idea" : (JSON.parse(userRes.userProfile.result.shoe_size) - 33).toString();
            shoeSizeValues.shoeSizeUS = userRes.userProfile.result.shoe_size == "No idea" ? "No idea" : (JSON.parse(userRes.userProfile.result.shoe_size) - 32.5).toString();

            this.setState({
                shirtSize: userRes.userProfile.result.shirt_size,
                waistSize: userRes.userProfile.result.waist_size,
                heightValues,
                weightValues,
                blazerSizeValues,
                shoeSizeValues
            })
            // console.log('userRes.userProfile.result: ', userRes.userProfile.result);
        }

        //==============================

        for (let i = lowWeight; i <= highWeight; i++) {
            // list.push(i.toString());
            weightListKg.push({ label: i.toString(), value: i.toString() })
            let convertedLbs = Math.round(i * 2.2046).toString();
            weightListLbs.push({ label: convertedLbs, value: convertedLbs })
        }

        for (let i = lowHeight; i <= highHeight; i++) {
            heightListCm.push({ label: i.toString(), value: i.toString() });
            // let footCal = (i / 12).toFixed('1')
            // let subString = footCal.split(".")
            // let foot = subString[0] + "' " + subString[1] + "''"
            // heightListIn.push({ label: foot, value: foot });
            if (heightListIn.findIndex(e => e.value === this.convertCMtoIN(i)) === -1) {
                heightListIn.push({ label: this.convertCMtoIN(i), value: this.convertCMtoIN(i) });
            }
        }
        // console.log('[wearOnNightOut.js] componentWillMount heightList', heightList)
    }
    componentWillReceiveProps = async (props) => {
        const { userRes, updateSize, saveSignupResponseAction } = props;
        // console.log('[MySizes.js] componentWillReceiveProps props', props);
        if (updateSize.isSuccess) {
            updateSize.isSuccess = false;
            if (userRes.isSuccess) {
                // Refresh the Details screen value
                userRes.userProfile.result.shirt_size = updateSize.mySizesObj.shirt_size;
                userRes.userProfile.result.waist_size = updateSize.mySizesObj.waist_size;
                userRes.userProfile.result.blazer_size = updateSize.mySizesObj.blazer_size;
                userRes.userProfile.result.shoe_size = updateSize.mySizesObj.shoe_size;
                userRes.userProfile.result.height = updateSize.mySizesObj.height;
                userRes.userProfile.result.weight = updateSize.mySizesObj.weight;
                // console.log('[render.js] login details', userRes);
            }
            await saveSignupResponseAction(userRes.userProfile)
            console.log('[Preference.js] componentWillReceiveProps Update userRes====:', userRes.userProfile);

            this.setState({ changeDetacted: false })
            Toast.show(updateSize.mySizesRes.message)
        } else {
            //isFalse case
        }

    }
    submitSizes = () => {
        this.props.navigation.push('StylistStack')
    }
    blazerSizeConverter = async (value) => {
        const { blazerEUR, blazerUK } = this.state;
        if (value === 'eur' && blazerUK) {
            await this.setState({
                blazerEUR: true,
                blazerUK: false,
            })
        } else {
            if (value === 'uk' && blazerEUR) {
                await this.setState({
                    blazerEUR: false,
                    blazerUK: true,
                })
            }
        }
    }
    shoeSizeConverter = async (value) => {
        const { shoeEUR, shoeUK, shoeUS, shoeSizeValues } = this.state;
        if (value === 'eur' && shoeEUR == false)
            await this.setState({
                shoeEUR: true,
                shoeUK: false,
                shoeUS: false,
            })
        else
            if (value === 'uk' && shoeUK == false)
                await this.setState({
                    shoeEUR: false,
                    shoeUK: true,
                    shoeUS: false
                })
            else
                if (value === 'us' && shoeUS == false)
                    await this.setState({
                        shoeEUR: false,
                        shoeUK: false,
                        shoeUS: true
                    })

        // console.log('shoeSizeValues.shoeSizeUK======:', shoeSizeValues.shoeSizeUK);
    }
    
    selectItem = async (index, value, label) => {
        const { blazerEUR, blazerUK, shoeEUR, shoeUK, shoeUS, blazerSizeValues, shoeSizeValues,
            weightKg, weightLbs, heightCm, heightIn, weightValues, heightValues } = this.state;
        const { mySizesObjAction, updateSize, userRes } = this.props;
        var params = updateSize.mySizesObj;
        switch (label) {
            case 'shirt':
                params.shirt_size = value
                this.setState({ shirtSize: value })
                break;
            case 'blazer':
                if (value === 'No idea') {
                    blazerSizeValues.blazerSizeEUR = value.toString();
                    blazerSizeValues.blazerSizeUK = value.toString();
                } else {
                    if (blazerEUR) {
                        blazerSizeValues.blazerSizeEUR = value;
                        blazerSizeValues.blazerSizeUK = (JSON.parse(value) - 10).toString();
                    }
                    else
                        if (blazerUK) {
                            blazerSizeValues.blazerSizeUK = value
                            blazerSizeValues.blazerSizeEUR = (JSON.parse(value) + 10).toString();
                        }
                }
                params.blazer_size = blazerSizeValues.blazerSizeEUR;
                this.setState({ blazerSizeValues })
                break;
            case 'waist':
                params.waist_size = value
                this.setState({ waistSize: value })
                break;
            case 'shoe':
                if (value === 'No idea') {
                    shoeSizeValues.shoeSizeEUR = value.toString();
                    shoeSizeValues.shoeSizeUK = value.toString();
                    shoeSizeValues.shoeSizeUS = value.toString();
                } else {
                    if (shoeEUR) {
                        shoeSizeValues.shoeSizeEUR = value.toString();
                        shoeSizeValues.shoeSizeUK = (JSON.parse(value) - 33).toString();
                        shoeSizeValues.shoeSizeUS = (JSON.parse(value) - 32.5).toString();
                    } else if (shoeUK) {
                        shoeSizeValues.shoeSizeEUR = (JSON.parse(value) + 33).toString();
                        shoeSizeValues.shoeSizeUK = value;
                        shoeSizeValues.shoeSizeUS = (JSON.parse(value) + 0.5).toString();
                    } else if (shoeUS) {
                        shoeSizeValues.shoeSizeEUR = (JSON.parse(value) + 32.5).toString();
                        shoeSizeValues.shoeSizeUK = (JSON.parse(value) - 0.5).toString();
                        shoeSizeValues.shoeSizeUS = value;
                    }
                }
                params.shoe_size = shoeSizeValues.shoeSizeEUR
                this.setState({ shoeSizeValues })
                break;
            case 'weight':
                if (weightKg) {
                    weightValues.weightValueKg = value;
                    weightValues.weightValueLbs = Math.round(value * 2.2046).toString();
                } else {
                    if (weightLbs) {
                        weightValues.weightValueKg = Math.round(value / 2.2046).toString();
                        weightValues.weightValueLbs = value;
                    }
                }
                params.weight = weightValues.weightValueKg;
                this.setState({ weightValues })
                break;
            case 'height':
                if (heightCm) {
                    // params.height = value;
                    heightValues.heightValueCm = value
                    heightValues.heightValueIn = this.convertCMtoIN(value);
                } else {
                    if (heightIn) {
                        let val = value.split(" ")
                        let val1 = val[0].split("'")
                        let val2 = val[1].split("''")
                        let feetTocm = Math.round(val1[0]/0.032808);
                        if (value == "7' 3''") {
                            let realCm = (val2[0]/0.39370).toString()
                            let splitedVal = realCm.split('.');
                            var InchTocm = parseInt(splitedVal[0])
                        } else {
                            var InchTocm = Math.round(val2[0]/0.39370)
                        }
                        let res = feetTocm + InchTocm
                        heightValues.heightValueIn = value
                        heightValues.heightValueCm = res.toString()
                    }
                }
                params.height = heightValues.heightValueCm;
                this.setState({ heightValues })
                break;
            default:
                break;
        }
        // console.log('===========================================================================================================')
        // console.log('[sizes.js] sizes obj edited', params)
        await mySizesObjAction(params)
        // console.log('[sizes.js] sizes obj edited', updateSize.mySizesObj)
        // console.log('===========================================================================================================')

        if (Object.keys(userRes.userProfile.result).length) {
            let detacted = false;
            Object.keys(userRes.userProfile.result).forEach(key => {
                if (params[key] && userRes.userProfile.result[key].toString() !== params[key].toString()) {
                    detacted = true
                }
            });
            this.setState({ changeDetacted: detacted })
        } else {
            this.setState({ changeDetacted: true })
        }
    }
    //====================Height and Weight=========================//
    //Function Call on Weight Switch Change
    wieghtConverter = async (value) => {
        const { weightKg, weightLbs } = this.state;
        if (value === 'kg' && weightLbs) {
            await this.setState({
                weightKg: true,
                weightLbs: false,
            })
        } else {
            if (value === 'lbs' && weightKg) {
                await this.setState({
                    weightKg: false,
                    weightLbs: true
                })
            }
        }
    }
    //Function Call on Height Switch Change
    heightConverter = async (value) => {
        const { heightIn, heightCm } = this.state;
        if (value === 'cm' && heightIn) {
            await this.setState({
                heightIn: false,
                heightCm: true,
            })
        } else {
            if (value === 'in' && heightCm) {
                await this.setState({
                    heightIn: true,
                    heightCm: false,
                })
            }
        }
    }
    //====================Height and Weight=========================//
    validate = async () => {
        const { updateSizesAction, updateSize, userRes } = this.props;
        var params = updateSize.mySizesObj
        params.user_id = userRes.userProfile.result.user_id;
        if (params.shirt_size == '') {
            Toast.show('Please give your shirts size.')
        } else {
            if (params.blazer_size == '') {
                Toast.show('Please give your blazer size.')
            } else {
                if (params.waist_size == '') {
                    Toast.show('Please give your waist size.')
                } else {
                    if (params.shoe_size == '') {
                        Toast.show('Please give your shoes size.')
                    } else {
                        if (params.weight == '') {
                            Toast.show('Please select your weight.')
                        } else {
                            if (params.height == '') {
                                Toast.show('Please select your height.')
                            } else {
                                await updateSizesAction(params)
                            }
                        }
                    }
                }
            }
        }
    }
    headerTabSelection = (item) => {
        mySizesArr.forEach(value => {
            if (item.tab == value.tab) {
                value.checked = true
                this.setState({ refresh: true })
            } else {
                value.checked = false
            }
        });
        switch (item.tab) {
            case 'Shirt Size':
                scrollYPos = this.state.screenHeight * 0;
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Waist Size':
                scrollYPos = WP('85');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Blazer Size':
                scrollYPos = WP('125');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Shoe Size':
                scrollYPos = WP('145');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Weight':
                scrollYPos = WP('146');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Height':
                scrollYPos = this.state.screenHeight * 1;
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;

            default:
                break;
        }
    }
    discard = () => {
        Toast.show('Your changes have been discarded.')
        // this.props.navigation.replace('MyPackages')
        this.setState({ changeDetacted: false })
        this.componentWillMount();
    }

    render() {
        const { updateSize } = this.props;
        const { blazerEUR, shoeEUR, shoeUK, shoeUS, shirtSize, waistSize,
            heightIn, heightValues, weightKg, weightValues, shoeSizeValues, blazerSizeValues } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('TabStack')}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    ref={(scroller) => { this.scroller = scroller }}
                    stickyHeaderIndices={[1]}
                >
                    <ProfileHeader
                        title={`My Sizes`}
                        image={appImages.mySizes}
                    />
                    <ProfileHeaderTabs
                        tabs={mySizesArr}
                        onPress={(item) => {
                            this.headerTabSelection(item)
                        }}
                    />
                    <View style={{ height: WP('10') }} />
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, overflow: 'hidden', alignSelf: 'center', backgroundColor: colors.white }}>
                            <DropDownCard
                                child={true}
                                title={size.shirt_size}
                                label={'Select Shirt Size'}
                                value={shirtSize}
                                headerEnable={true}
                                buttonEnabled={false}
                                dropDownOptions={shirt_sizes}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'shirt')}
                            />
                            <View style={{ width: WP('80'), alignSelf: 'center', borderWidth: 0.6, borderColor: colors.bgColor }} />
                            <DropDownCard
                                child={true}
                                title={size.waist_size}
                                label={'Select Waist Size'}
                                value={waistSize}
                                headerEnable={true}
                                buttonEnabled={false}
                                dropDownOptions={waist_sizes}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'waist')}
                            />
                            <View style={{ width: WP('80'), alignSelf: 'center', borderWidth: 0.6, borderColor: colors.bgColor }} />
                            <DropDownCard
                                child={true}
                                title={size.blazer_size}
                                label={'Select Blazer Size'}
                                value={blazerEUR ? blazerSizeValues.blazerSizeEUR : blazerSizeValues.blazerSizeUK}
                                buttons={2}
                                headerEnable={true}
                                buttonEnabled={true}
                                buttonOptions={sizes}
                                dropDownOptions={blazerEUR ? blazer_sizes_EUR : blazer_sizes_UK}
                                onPressSwitch={(value) => this.blazerSizeConverter(value)}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'blazer')}
                            />
                            <View style={{ width: WP('80'), alignSelf: 'center', borderWidth: 0.6, borderColor: colors.bgColor }} />
                            <DropDownCard
                                child={true}
                                title={size.shoe_size}
                                label={'Select Shoe Size'}
                                value={shoeEUR ? shoeSizeValues.shoeSizeEUR : shoeUK ? shoeSizeValues.shoeSizeUK : shoeSizeValues.shoeSizeUS}
                                buttons={3}
                                headerEnable={true}
                                buttonEnabled={true}
                                buttonOptions={shoeSizes}
                                dropDownOptions={
                                    shoeEUR ?
                                        shoe_sizes_EUR
                                        :
                                        shoeUK ?
                                            shoe_sizes_UK
                                            :
                                            shoeUS ?
                                                shoe_sizes_US
                                                : null
                                }
                                onPressSwitch={(value) => this.shoeSizeConverter(value)}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'shoe')}
                            />
                            <DropDownCard
                                child={true}
                                value={weightKg ? weightValues.weightValueKg : weightValues.weightValueLbs}
                                buttons={2}
                                title={HW.weight}
                                headerEnable={true}
                                buttonEnabled={true}
                                buttonOptions={weight}
                                dropDownOptions={weightKg ? weightListKg : weightListLbs}
                                label={'Select Weight'}
                                onPressSwitch={(value) => this.wieghtConverter(value)}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'weight')}
                            />
                            <View style={{ width: WP('80'), alignSelf: 'center', borderWidth: 0.6, borderColor: colors.bgColor }} />
                            <DropDownCard
                                child={true}
                                value={heightIn ? heightValues.heightValueIn : heightValues.heightValueCm}
                                buttons={2}
                                title={HW.height}
                                convertFoot={this.state.heightIn}
                                headerEnable={true}
                                buttonEnabled={true}
                                buttonOptions={height}
                                dropDownOptions={heightIn ? heightListIn : heightListCm} //heightListCm
                                label={'Please select...'}
                                onPressSwitch={(value) => this.heightConverter(value)}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'height')}
                            />
                        </View>
                    </View>
                </ScrollView>
                {this.state.changeDetacted ?
                    <View style={{ height: WP('28'), width: WP('100'), backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
                        <SmallText
                            text={`Do you want to save these changes?`}
                        />
                        <View style={{ width: WP('88'), justifyContent: 'space-between', flexDirection: 'row', marginTop: WP('5') }}>
                            <Button
                                title={`DISCARD`}
                                titleStyle={{ color: colors.mediumGrey }}
                                onPress={() => this.discard()}
                                style={{ height: WP('12'), width: WP('38'), backgroundColor: colors.bgColor }}
                            />
                            <Button
                                title={'SAVE'}
                                showLoader={updateSize.loading}
                                onPress={this.validate}
                                style={{ height: WP('12'), width: WP('38') }}
                            />
                        </View>
                    </View>
                    : null
                }
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        updateRes: state.updateRequestReducer,
        updateSize: state.updateSizesReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        mySizesObjAction: (params) => dispatch(mySizesObj(params)),
        updateSizesAction: (params) => dispatch(updateSizes(params)),
        saveSignupResponseAction: (value) => dispatch(saveSignupResponse(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MySizes));
