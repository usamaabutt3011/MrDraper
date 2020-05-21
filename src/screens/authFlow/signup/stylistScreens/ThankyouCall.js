import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, Button } from '../../../../components';
import { WP, colors } from '../../../../services';
import { styles } from './styles';
import { signUpObj } from '../../../../store/actions';

class ThankyouCall extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // componentDidMount = async() => {
    //     const { signUpObjAction, signup } = this.props;
    //     var params = signup.signUpObj
    //     // await signUpObjAction(params, "ThankyouCall")
    //     await signUpObjAction(params, "")
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
                        text={'Great! Thank you for the selection.'}
                        style={styles.title}
                    />
                    <NormalText
                        text={
                            `We need a few other details to get your package just right. Complete our two minute Style Quiz and we'll take care of the rest.`
                        }
                        style={styles.normalText}
                    />
                    <Button
                        title='GO TO STYLE QUIZ'
                        style={{ width: WP('72'), alignSelf: 'center', marginBottom: WP('4') }}
                        onPress={() => this.props.navigation.push('StyleQuiz')}
                    />
                    <Button
                        title='HAVE PAOLA GIVE ME A CALL'
                        titleStyle={{ color: colors.mediumGrey }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThankyouCall);
