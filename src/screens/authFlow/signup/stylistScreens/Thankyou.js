import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, Button } from '../../../../components';
import { WP, colors } from '../../../../services';
import { styles } from './styles';
import { signUpObj } from '../../../../store/actions';

class Thankyou extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // componentDidMount = async() => {
    //     const { signUpObjAction, signup } = this.props;
    //     var params = signup.signUpObj
    //     await signUpObjAction(params, "Thankyou")
    // }
    render() {
        const { } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    left={false}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <View style={{ height: WP('10') }} />
                <View style={styles.subContainer}>
                    <LargeTitle
                        text={'Great! Thank you for adding your card.'}
                        style={styles.title}
                    />
                    <NormalText
                        text={
                            `We have notified your personal stylist, Pola, and she'll get in touch with you shortly. Perfect time to read our blog for inspiration or explore your Mr.Draper profile.`
                        }
                        style={styles.normalText}
                    />
                    <Button
                        title='READ THE BLOG'
                        style={{ width: WP('72'), alignSelf: 'center', marginBottom: WP('4') }}
                    />
                    <Button
                        title='EXPLORE YOUR PROFILE'
                        titleStyle={{ color: colors.mediumGrey }}
                        onPress={() => this.props.navigation.push('ThankyouCall')}
                        style={{ width: WP('72'), alignSelf: 'center', marginBottom: WP('8'), backgroundColor: colors.buttonColorLight }}
                    />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
