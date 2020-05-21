import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import { Header, Steps, Button, SmallTitle, SmallText, Loader } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { styleQuiz, styleQuizObj, saveSignupResponse } from '../../../../store/actions';
import { styles } from './styles';

const yml = data.member_settings_v7.en.style_profile_quiz;

class NoteOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStyle: false,
            isComfort: false,
            isBasic: false,
            isModerate: false,
            isExtreme: false,
            footer: [
                {
                    title: yml.adventurous.basic,
                    desc: yml.adventurous.basic_description+'.'
                },
                {
                    title: yml.adventurous.moderate,
                    desc:  yml.adventurous.moderate_description+'.'
                },
                {
                    title: yml.adventurous.extreme,
                    desc:  yml.adventurous.extreme_description+'.'
                }
            ]
        }
    }
    toggleComfortBtn = async(label) => {
        const { styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        if (label == 'style') {
            params.style_or_comfort = 'Style';
            await this.selectItem(params)
            this.setState({
                isStyle: true,
                isComfort: false
            })
        } else {
            params.style_or_comfort = 'Comfort';
            await this.selectItem(params)
            this.setState({
                isStyle: false,
                isComfort: true
            })
        }
    }
    togglefeedbackBtn = async(label) => {
        const { styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        switch (label) {
            case 'bas':
                params.adventurousness = 'Basic';
                await this.selectItem(params)
                this.setState({
                    isBasic: true,
                    isModerate: false,
                    isExtreme: false
                })
                break;
            case 'mod':
                params.adventurousness = 'Moderate';
                await this.selectItem(params)
                this.setState({
                    isBasic: false,
                    isModerate: true,
                    isExtreme: false
                })
                break;
            case 'ext':
                params.adventurousness = 'Extreme';
                await this.selectItem(params)
                this.setState({
                    isBasic: false,
                    isModerate: false,
                    isExtreme: true
                })
                break;
            default:
                break;
        }
    }
    componentWillReceiveProps = async (props) => {
        const { styleQuizObjAction, saveSignupResponseAction } = this.props;
        const { isSuccess, isFailure, loading, quizRes } = props.styleQuiz;
        if (isSuccess) {
            // props.userRes.userProfile = quizRes;
            // console.log('[Style Quiz.js] Style Quiz True', props.styleQuiz);
            // console.log('[Style Quiz.js] Style Quiz userRes', props);
            let params = {
                "shirts_fit": "",                                                        //"Slim Fit",
                "pants_fit": "",                                                         //"Skinny Fit",
                "colors": [],                                                            //["Basic Colors"],
                "patterns": [],                                                          //["Checkered"],
                "style_or_comfort": "",                                                  //"Comfort",
                "adventurousness": "",                                                   //"Moderate",
            }
            await styleQuizObjAction(params)
            await saveSignupResponseAction(quizRes)
            Toast.show(quizRes.message)
            this.props.navigation.push('NoteTwo')        
        } else {
            if (isFailure) {
                console.log('[Style Quiz.js] Style Quiz False', props.styleQuiz);
                // Toast.show(selectedPackage.message)
            }
        }
    }
    selectItem = async(item) => {
        const { isStyle, isComfort, isBasic, isModerate, isExtreme } = this.state;
        const { styleQuizObjAction, styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        console.log('===========================================================================================================')
        console.log('[PantsFit.js] PantsFit obj edited',params)
        await styleQuizObjAction(params)
        console.log('[PantsFit.js] PantsFit obj edited',styleQuiz.styleQuizObj)
        console.log('===========================================================================================================')
    }
    submitStyleQuiz = async() => {
        const { styleQuizAction, styleQuiz, signup } = this.props;
        var params = styleQuiz.styleQuizObj
        if (params.style_or_comfort == "" ) {
            Toast.show(`${yml.style_comfort.question} ?`)
        } else {
            if (params.adventurousness == "") {
                Toast.show(`${yml.adventurous.question}?`)
            } else {
                let param = {
                    user_id: signup.signupRes.result.user_id,
                    data: params,
                }
                await styleQuizAction(param)   
            }
        }
    }
    render() {
        const { isStyle, isComfort, isBasic, isModerate, isExtreme, footer } = this.state;
        const { styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={true}
                        // onPressLeft={() => this.props.navigation.navigate('PreferenceStack')}
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
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('75')} //83 total , per head= 6.9 , current =79.5
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={styles.subContainerPersonal}>
                            <SmallTitle
                                text={`${yml.style_comfort.question} ?`}
                                style={{ marginHorizontal: WP('5'), marginTop: WP('5'), alignSelf: 'flex-start' }}
                            />
                            <View style={styles.twoButtonsContainer}>
                                <Button
                                    title={yml.style_comfort.style}
                                    titleStyle={{ color: isStyle ? colors.white : colors.black }}
                                    style={[styles.buttonStyle, isStyle ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleComfortBtn('style')}
                                />
                                <Button
                                    title={yml.style_comfort.comfort}
                                    titleStyle={{ color: isComfort ? colors.white : colors.black }}
                                    style={[styles.buttonStyle, isComfort ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleComfortBtn('comfort')}
                                />
                            </View>
                            <View style={styles.divider} />
                            <SmallTitle
                                text={`${yml.adventurous.question}?`}
                                style={{ marginHorizontal: WP('5'), marginTop: WP('2'), alignSelf: 'flex-start' }}
                            />
                            <View style={styles.twoButtonsContainer}>
                                <Button
                                    title={yml.adventurous.basic}
                                    titleStyle={{ color: isBasic ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, isBasic ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.togglefeedbackBtn('bas')}
                                />
                                <Button
                                    title={yml.adventurous.moderate}
                                    titleStyle={{ color: isModerate ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, isModerate ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.togglefeedbackBtn('mod')}
                                />
                                <Button
                                    title={yml.adventurous.extreme}
                                    titleStyle={{ color: isExtreme ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, isExtreme ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.togglefeedbackBtn('ext')}
                                />
                            </View>
                            <View style={{ width: WP('80') }}>
                                {
                                    footer.map((item, key) => (
                                        <Text key={key} style={styles.title}>
                                            {item.title + ': '}
                                            <Text style={styles.simpleText}>
                                                {item.desc}
                                            </Text>
                                        </Text>
                                    ))
                                }
                                <Button
                                    // disabled={ params.style_or_comfort !== "" && params.adventurousness !== ""  ? false : true}
                                    title={'NEXT'}
                                    showLoader={styleQuiz.loading}
                                    onPress={()=> this.submitStyleQuiz()}
                                    style={{ width: WP('25'), alignSelf: 'flex-end', marginBottom: WP('6'), marginTop: WP('10') }}
                                />
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
        userRes: state.login,
        signup: state.signup,
        styleQuiz: state.styleQuiz,
    }
}
mapDispatchToProps = dispatch => {
    return {
        styleQuizAction: (params) => dispatch(styleQuiz(params)),
        styleQuizObjAction: (params) => dispatch(styleQuizObj(params)),
        saveSignupResponseAction: (value) => dispatch(saveSignupResponse(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteOne);
