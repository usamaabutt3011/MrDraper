import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { withNavigation } from 'react-navigation'
import { Header, DropDownCard, LargeTitle, Button, Steps } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { signUpObj } from '../../../../store/actions';
import { styles } from './styles';
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

const sizes = [
    { label: "EUR", value: "eur" },
    { label: "UK/US", value: "uk" },
];
const shoeSizes = [
    { label: "EUR", value: "eur" },
    { label: "UK", value: "uk" },
    { label: "US", value: "us" },
];
class Size extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blazerEUR: true,
            blazerUK: false,
            shoeEUR: true,
            shoeUK: false,
            shoeUS: false,
            blazerSizeValues: {
                blazerSizeEUR: 'Please select...',
                blazerSizeUK: 'Please select...',
            },
            shoeSizeValues: {
                shoeSizeEUR: 'Please select...',
                shoeSizeUK: 'Please select...',
                shoeSizeUS: 'Please select...',
            }
        }
    }
    componentDidMount = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "Size")
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
        const { shoeEUR, shoeUK, shoeUS } = this.state;
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
    }
    selectItem = async (index, value, label) => {
        const { signUpObjAction, signup } = this.props;
        const { blazerEUR, blazerUK, shoeEUR, shoeUK, shoeUS, blazerSizeValues, shoeSizeValues } = this.state;
        var params = signup.signUpObj
        switch (label) {
            case 'shirt':
                params.shirt_size = value
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
            default:
                break;
        }
        console.log('===========================================================================================================')
        console.log('[size.js] signup obj edited', params)
        await signUpObjAction(params, "Size")
        console.log('[size.js] signup obj edited', signup.signUpObj)
        console.log('===========================================================================================================')
    }
    validate = () => {
        const { signup } = this.props;
        var params = signup.signUpObj
        console.log('param=========: ', params);
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
                        this.props.navigation.push('StylistStack')
                    }
                }
            }
        }
    }
    render() {
        const { } = this.props;
        const { blazerEUR, shoeEUR, shoeUK, shoeUS, blazerSizeValues, shoeSizeValues, } = this.state;
        return (
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
                        isStyleColored={true}
                        isPreferenceColored={true}
                        progress={WP('72.6')} //83 total , per head= 6.9 , current =72.6
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`${size.question}?`}
                            style={{ marginHorizontal: WP(5), marginBottom: WP('5') }}
                        />
                        <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, overflow: 'hidden', alignSelf: 'center', backgroundColor: colors.white }}>
                            <DropDownCard
                                title={size.shirt_size}
                                label={'Select Shirt Size'}
                                headerEnable={true}
                                buttonEnabled={false}
                                dropDownOptions={shirt_sizes}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'shirt')}
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
                                title={size.waist_size}
                                label={'Select Waist Size'}
                                headerEnable={true}
                                buttonEnabled={false}
                                dropDownOptions={waist_sizes}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'waist')}
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
                            <Button
                                title={'NEXT'}
                                onPress={this.validate}
                                style={{ width: WP('25'), alignSelf: 'flex-end', marginBottom: WP('6'), marginTop: WP('4'), marginRight: WP('5') }}
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
        signup: state.signup,
    }
}
mapDispatchToProps = dispatch => {
    return {
        signUpObjAction: (params,screen) => dispatch(signUpObj(params,screen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Size));
