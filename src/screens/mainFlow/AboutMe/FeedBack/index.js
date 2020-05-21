import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { CustomInputField, Header, Button, SmallText, LargeTitle } from '../../../../components';
import { WP, colors, appImages, data } from '../../../../services';
import { submitFeedback } from '../../../../store/actions';
import { styles } from './styles';

class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylist: false,
            delivery: false,
            service: false,
            selectedReason: '',
            note: ''
        }
    }
    componentDidMount = async () => {
        console.log('[FeedBack.js] componendDidMount', this.props);
    }
    componentWillReceiveProps = async (props) => {
        const { isSuccess, isFailure, loading, feedBackRes, error } = props.feedbackResponse;
        if (isSuccess) {
            console.log('[feedback.js] True', props.feedbackResponse);
            props.feedbackResponse.isSuccess = false;
            this.setState({
                stylist: false,
                delivery: false,
                service: false,
                selectedReason: '',
                note: ''
            })
            Toast.show(feedBackRes.user.message)
            // this.props.navigation.push('SocailLinks')
        } else {
            console.log('[feedback.js] False', props.feedbackResponse);
            if (isFailure) {
                Toast.show(error.message)
            }
        }
    }

    toggleTimeSlot = (label, value) => {
        switch (label) {
            case 'first':
                this.setState({
                    selectedReason: value,
                    stylist: true,
                    delivery: false,
                    service: false
                })
                break;
            case 'second':
                this.setState({
                    selectedReason: value,
                    stylist: false,
                    delivery: true,
                    service: false
                })
                break;
            case 'third':
                this.setState({
                    selectedReason: value,
                    stylist: false,
                    delivery: false,
                    service: true
                })
                break;
            default:
                break;
        }
    }
    submitFeedback = async () => {
        const { submitFeedbackAction } = this.props;
        const { selectedReason, note } = this.state;
        if (selectedReason == '') {
            Toast.show('Please select a reason.')
        } else {
            if (note == '') {
                Toast.show('Please write a note.')
            } else {
                //submit feedback
                let params = {
                    "user_id": "8",
                    "reason": selectedReason,
                    "notes": note,
                }
                await submitFeedbackAction(params)
            }
        }
    }
    render() {
        const { feedbackResponse } = this.props;
        const { stylist, delivery, service, note } = this.state;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
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
                    >
                        <View style={{ height: WP('5') }} />
                        <View style={styles.subContainerPersonal}>
                            <LargeTitle
                                text="Give Feedback"
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('10') }}
                            />
                            <SmallText
                                text='I want to give feedback for..'
                                style={{ marginHorizontal: WP('5') }}
                            />
                            <View style={styles.twoButtonsContainer}>
                                <Button
                                    title={'My Stylist'}
                                    titleStyle={{ color: stylist ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, stylist ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleTimeSlot('first', 'stylist')}
                                />
                                <Button
                                    title={'Delivery'}
                                    titleStyle={{ color: delivery ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, delivery ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleTimeSlot('second', 'delivery')}
                                />
                                <Button
                                    title={'The Service'}
                                    titleStyle={{ color: service ? colors.white : colors.black }}
                                    style={[styles.smallButtonStyle, service ? { backgroundColor: colors.black } : { backgroundColor: 'white' }]}
                                    onPress={() => this.toggleTimeSlot('third', 'service')}
                                />
                            </View>
                            <CustomInputField
                                label={'Your Feedback'}
                                value={note}
                                isRightIcon={false}
                                placeholderText={'Write your feedback'}
                                placeholderTextColor={colors.lightGrey}
                                keyboardType={'email-address'}
                                onChangeText={(value) => this.setState({ note: value })}
                                containerStyle={this.state.isEmailValidate ? { borderColor: 'red' } : { height: WP('30'), marginHorizontal: WP('5') }}
                                style={styles.inputStylePersonal}
                                multiline={true}
                                isMaskedInput={false}
                            />
                            <SmallText
                                text={`Use this to tell us about your experience with our delivery service, and any suggestions on how we can make it better.`}
                                style={{ marginHorizontal: WP('5'), color: colors.darkGrey }}
                            />
                            <View style={styles.footerContainer}>
                                <Button
                                    title={'SUBMIT'}
                                    showLoader={feedbackResponse.loading}
                                    onPress={() => this.submitFeedback()}
                                    style={styles.buttonPersonal}
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
        feedbackResponse: state.feedbackReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        submitFeedbackAction: (params) => dispatch(submitFeedback(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
