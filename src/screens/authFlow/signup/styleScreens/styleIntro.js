import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, SmallText, Steps, MediumTitle, Button } from '../../../../components';
import { WP, data, colors } from '../../../../services';
import { styles } from './styleScreenStyles';
import { signUpObj } from '../../../../store/actions';
import { withNavigation } from 'react-navigation'
import Modal from 'react-native-modal';
import OnBoarding from '../onBoardingScreens';

const welcome = data.member_settings_v7.en.labels.welcome;

class StyleIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onBoarding: false,
            resume: true
        }
    }
    componentWillMount = async () => {
        const { signUpObjAction, signup } = this.props;
        // console.log('[signup.js] componentWillMount Props', signup)
        // console.log('screen name', signup.screen);
        if (signup.screen && signup.screen !== '') {
            if (signup.screen == 'StyleIntro') {
                this.setState({ resume: false, onBoarding: false })                   
            } else {
                this.setState({ resume: true, onBoarding: false })
            }
        } else {
            this.setState({ resume: false, onBoarding: true })
        }
    }
    resumeScreens = () => {
        const { signup } = this.props;
        if (signup.screen !== '') {
            this.setState({ resume: false })
            this.props.navigation.navigate(signup.screen);
        } else {
            this.props.navigation.navigate('Login');
        }
    }
    endResume = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "StyleIntro")
        this.setState({ resume: false, onBoarding: true })
    }
    _modelToggle = (status) => this.setState({ onBoarding: status })
    componentDidMount = async () => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        if (signup.screen == '' || signup.screen == 'StyleIntro') {
            await signUpObjAction(params, "StyleIntro")
        }
    }
    componentWillReceiveProps(props) {
        // console.log('[wearOnWork.js] componentWillReceiveProps', props.signup)
    }
    render() {
        const { } = this.props;
        const { onBoarding, resume } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    left={true}
                    onPressLeft={() => this.props.navigation.push('Login')}
                />
                <Steps
                    style={{ alignSelf: 'center', marginTop: WP('5') }}
                    isStyleColored={true}
                    progress={WP('13.8')} //83 total , per head= 27.6666666667
                />
                <View style={{ height: WP('5') }} />
                <View style={styles.subContainer}>
                    <LargeTitle
                        text={welcome.p1}
                        style={styles.title}
                    />
                    <NormalText
                        text={`${welcome.p2}${welcome.p3}`}
                        style={styles.normalText}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.push('wearOnWork')}
                    >
                        <SmallText
                            text={welcome.cta.toUpperCase()}
                            style={styles.smallText}
                        />
                    </TouchableOpacity>
                </View>
                {
                    resume == false && onBoarding == true ?
                        <OnBoarding
                            onBoarding={onBoarding}
                            toggleModle={this._modelToggle}
                        />
                        :
                        <Modal
                            animationInTiming={200}
                            animationOutTiming={100}
                            animationIn="slideInLeft"
                            animationOut="slideOutRight"
                            avoidKeyboard={true}
                            transparent={true}
                            isVisible={resume}
                            onBackdropPress={() => this.endResume()}
                            style={{ flex: 1, justifyContent: 'center' }}
                        >
                            <View style={{ width: WP('90'), backgroundColor: colors.white, alignSelf: 'center', marginTop: WP('14'), borderRadius: 5 }}>
                                <MediumTitle
                                    text={`Continue from where you left?`}
                                    style={{ marginHorizontal: WP('5'), textAlign: 'center', marginTop: WP('5') }}
                                />
                                <NormalText
                                    text={`Finish setting up your profile. It’ll only take a minute.`}
                                    style={{ marginHorizontal: WP('5'), textAlign: 'center', marginVertical: WP('5') }}
                                />
                                <Button
                                    title={`CONTINUE`}
                                    onPress={() => this.resumeScreens()}
                                    style={{ alignSelf: 'center', marginBottom: WP('5'), width: WP('80') }}
                                />
                            </View>
                        </Modal>
                }
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
        signUpObjAction: (params, screen) => dispatch(signUpObj(params, screen)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(StyleIntro));
