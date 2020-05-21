import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, MediumTitle, NormalText, Button } from '../../../components';
import { appImages, colors, WP } from '../../../services';
import { styles } from './styles';
import Modal from 'react-native-modal';
import OnBoarding from './onBoardingScreens';
import { signUpObj } from '../../../store/actions';
import { withNavigation } from 'react-navigation'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onBoarding: false,
            resume: true
        }
    }
    componentWillMount = async () => {
        const { signUpObjAction, signup } = this.props;
        console.log('[signup.js] componentWillMount Props', signup)
        console.log('screen name', signup.screen);
        if (signup.screen && signup.screen !== '') {
            this.setState({ resume: true, onBoarding: false })
        } else {
            this.setState({ resume: false, onBoarding: true })
        }
    }
    resumeScreens = () => {
        const { signup } = this.props;
        if (signup.screen && signup.screen !== '') {
            this.setState({ resume: false })
            this.props.navigation.navigate(signup.screen);
        } else {
            this.props.navigation.navigate('Login');
        }
    }
    _modelToggle = (status) => this.setState({ onBoarding: status })
    render() {
        const { onBoarding, resume } = this.state;
        const { signup } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    left={true}
                    right={true}
                    onPressLeft={() => this.props.navigation.push('Login')}
                />
                {
                    resume == false && onBoarding == true ?
                        null
                        :
                        <Modal
                            animationInTiming={200}
                            animationOutTiming={100}
                            animationIn="slideInLeft"
                            animationOut="slideOutRight"
                            avoidKeyboard={true}
                            transparent={true}
                            isVisible={resume}
                            onBackdropPress={() => this.setState({ resume: false, onBoarding: true })}
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SignUp));
