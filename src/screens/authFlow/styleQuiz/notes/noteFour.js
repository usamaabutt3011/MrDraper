import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';
import { Header, Steps, Button, MediumTitle, NormalText, SmallText, AddressCard } from '../../../../components';
import { WP, colors, data, family } from '../../../../services';
import { getStylistInfo, signUpObj, createSignUp } from '../../../../store/actions';
import { styles } from './styles';
const yml = data.member_settings_v7.en.style_profile_quiz.scheduling;
class NoteFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { scheduleQuiz, signup } = this.props;
        const {  } = this.state;
        const { delivery, deliverTo } = this.props.navigation.state.params;
        console.log('params: ', delivery,deliverTo);
        
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
                                text={yml.confirm_delivery_details+'.'}
                                style={{ marginHorizontal: WP('5'), marginTop: WP('5'), alignSelf: 'flex-start' }}
                            />
                            <View style={{ flexDirection: 'row', width: WP('80'), justifyContent: 'space-between', alignSelf: 'center' }}>
                                <SmallText
                                    text={`${yml.scheduled_delivery}:`}
                                    style={{ marginTop: WP('5'), marginBottom: WP('5'), color: colors.mediumGrey }}
                                />
                                <Button
                                    title={'CHANGE'}
                                    onPress={()=> this.props.navigation.navigate('NoteTwo')}
                                    titleStyle={{ color: colors.orange, fontFamily: family.boldText, fontSize: WP('3.6') }}
                                    style={{ width: WP('25'), backgroundColor: 'transparent' }}
                                />
                            </View>
                            <SmallText
                                    text={delivery}
                                    style={{ marginBottom: WP('5'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                            />
                            <View style={{ flexDirection: 'row', width: WP('80'), justifyContent: 'space-between', alignSelf: 'center' }}>
                                <SmallText
                                    text={`${yml.deliver_to}:`}
                                    style={{ marginTop: WP('5'), marginBottom: WP('5'), color: colors.mediumGrey }}
                                />
                                <Button
                                    title={'CHANGE'}
                                    onPress={()=> this.props.navigation.navigate('NoteThree')}
                                    titleStyle={{ color: colors.orange, fontFamily: family.boldText, fontSize: WP('3.6') }}
                                    style={{ width: WP('25'), backgroundColor: 'transparent' }}
                                />
                            </View>
                            <SmallText
                                    text={`${signup.signupRes.result.name}`}
                                    style={{ marginBottom: WP('1'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                            />
                            <SmallText
                                    text={`${deliverTo.line_1}, ${deliverTo.line_2}`}
                                    style={{ marginBottom: WP('1'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                            />
                            <SmallText
                                    text={`${deliverTo.area}, ${deliverTo.city}`}
                                    style={{ marginBottom: WP('1'), marginHorizontal: WP('5'), color: colors.drakBlack, fontFamily: family.boldText }}
                            />
                            <View style={{ width: WP('80'), alignSelf: 'center', marginTop: WP('7') }}>
                                <Button
                                    title={'YES, DETAILS ARE CORRECT'}
                                    onPress={()=> this.props.navigation.push('NoteFive')}
                                    style={{ width: WP('80'), alignSelf: 'center', marginBottom: WP('6') }}
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
        signup: state.signup,
        scheduleQuiz: state.scheduleQuiz,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
        signUpObjAction: (params) => dispatch(signUpObj(params)),
        createSignUp: (params) => dispatch(createSignUp(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteFour);
