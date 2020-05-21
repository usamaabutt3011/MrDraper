import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { Header, DropDownCard, LargeTitle, Button, Steps } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { signUpObj } from '../../../../store/actions';
import { styles } from './styles';
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

const weight = [
    { label: HW.kg, value: "kg" },
    { label: HW.lbs, value: "lbs" },
];
const height = [
    { label: HW.cm, value: "cm" },
    { label: HW.in, value: "in" },
];
class HeightWeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weightKg: true,
            weightLbs: false,
            heightIn: false,
            heightCm: true,
            heightValue: 'Please select...',
            weightValue: 'Please select...',
            convertedWeight: '',
            heightValues: {
                heightValueIn: 'Please select...',
                heightValueCm: 'Please select...',
            },
            weightValues: {
                weightValueKg: 'Please select...',
                weightValueLbs: 'Please select...',
            }
        }
    }
    componentDidMount = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "Height")
    }
    componentWillMount = () => {
        const { signUpObjAction, signup } = this.props;
        const { weightKg, weightLbs, heightCm, heightIn, heightValues, weightValues } = this.state;
        var params = signup.signUpObj
        heightValues.heightValueCm = params.height;
        weightValues.weightValueKg = params.weight;
        this.setState({
            weightKg: true,
            heightCm: true
        })
        
        for (let i = lowWeight; i <= highWeight; i++) {
            // list.push(i.toString());
            weightListKg.push({ label: i.toString(), value: i.toString() })
            let convertedLbs = Math.round(i * 2.2046).toString();
            weightListLbs.push({ label: convertedLbs, value: convertedLbs })
        }

        for (let i = lowHeight; i <= highHeight; i++) {
            heightListCm.push({ label: i.toString(), value: i.toString() });
            // var foot, subString, footCal;
            // footCal = (i / 12).toFixed('1')
            // subString = footCal.split(".")
            // foot = subString[0] + "' " + subString[1] + "''"
            if (heightListIn.findIndex(e => e.value === this.convertCMtoIN(i)) === -1) {
                heightListIn.push({ label: this.convertCMtoIN(i), value: this.convertCMtoIN(i) });
            }
        }
        console.log('[wearOnNightOut.js] componentWillMount heightList', heightListCm, heightListIn)
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
    selectItem = async (index, value, label) => {
        const { signUpObjAction, signup } = this.props;
        const { weightKg, weightLbs, heightCm, heightIn, heightValues, weightValues } = this.state;

        var params = signup.signUpObj
        if (label == 'weight') {
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
        } else {
            if (label === 'height') {
                if (heightCm) {
                    // params.height = value;
                    // var foot, subString, footCal;
                    // heightValues.heightValueCm = value
                    // footCal = (value / 12).toFixed('1')
                    // subString = footCal.split(".")
                    // foot = subString[0] + "' " + subString[1] + "''";
                    // heightValues.heightValueIn = foot;

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

                        // let val = value.split(" ")
                        // let val1 = val[0].split("'")
                        // let val2 = val[1].split("''")

                        // let res = val1[0] + "." + val2[0]

                        // heightValues.heightValueIn = value
                        // heightValues.heightValueCm = Math.round(res * 12).toString();

                    }
                }
                params.height = heightValues.heightValueCm;
                this.setState({ heightValues })
            }
        }
        // console.log('===========================================================================================================')
        // console.log('[wearOnNightOut.js] signup obj edited', params)
        await signUpObjAction(params)
        // console.log('[wearOnNightOut.js] signup obj edited', signup.signUpObj)
        // console.log('===========================================================================================================')
    }
    validate = () => {
        const { signup } = this.props;
        var params = signup.signUpObj
        if (params.weight == '') {
            Toast.show('Please select your weight.')
        } else {
            if (params.height == '') {
                Toast.show('Please select your height.')
            } else {
                this.props.navigation.navigate('Size')
            }
        }
    }
    render() {
        const { } = this.props;
        const { heightCm, heightIn, heightValues, weightKg, weightValues } = this.state;

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
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                        progress={WP('65.7')} //83 total , per head= 6.9 , current =65.7
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={HW.question+'?'}
                            style={{ marginHorizontal: WP(5), marginBottom: WP('5') }}
                        />
                        <View style={{ marginVertical: 2, marginBottom: WP('5'), borderRadius: 5, overflow: 'hidden', alignSelf: 'center', backgroundColor: colors.white }}>
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
                                value={heightCm ? heightValues.heightValueCm : heightValues.heightValueIn}
                                buttons={2}
                                title={HW.height}
                                convertFoot={this.state.heightIn}
                                headerEnable={true}
                                buttonEnabled={true}
                                buttonOptions={height}
                                dropDownOptions={heightIn ? heightListIn : heightListCm} //heightListCm
                                label={'Select Height'}
                                onPressSwitch={(value) => this.heightConverter(value)}
                                onSelectItem={(index, value) => this.selectItem(index, value, 'height')}
                            />
                            <Button
                                title={'NEXT'}
                                style={{ width: WP('25'), alignSelf: 'flex-end', marginBottom: WP('6'), marginTop: WP('4'), marginRight: WP('5') }}
                                onPress={() => this.validate()}
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
        signUpObjAction: (params, screen) => dispatch(signUpObj(params,screen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeightWeight);

//Conversions of Height Feet'Inches to CM & CM to Feet'Inches
// function toFeet(n) {
//     var realFeet = ((n * 0.393700) / 12);
//     console.log(realFeet);
//     var feet = Math.floor(realFeet);
//     console.log(feet);
//     var inches = Math.round((realFeet - feet) * 12);
//     console.log(inches);
//     return feet + "' " + inches + `''`;
// }
// function toInch(value) {
//     console.log(value);
//     let val = value.split(" ")
//     let val1 = val[0].split("'")
//     let val2 = val[1].split("''")
//     let realCm = (val2[0]/0.39370).toString()
//     console.log(realCm);
//     var InchTocm = realCm.split(".");
//     console.log(parseInt(InchTocm[0]));

//     console.log(val1[0],val2[0]);
//     console.log(val1[0]/0.032808,val2[0]/0.39370);
//     console.log(Math.round(val1[0]/0.032808),Math.round(val2[0]/0.39370));
//     console.log(Math.round(val1[0]/0.032808),parseInt(InchTocm[0]));
//     let res = Math.round(val1[0]/0.032808)+Math.round(val2[0]/0.39370)
//     return res
// }
// console.log(toFeet(220));
// console.log(toInch("7' 3''"));