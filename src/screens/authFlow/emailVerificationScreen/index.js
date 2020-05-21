import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText } from '../../../components';
import { appImages, colors, WP } from '../../../services';
import { styles } from './styles'

class EmailVerificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { title, desc } = this.props.navigation.state.params;
        return (
            <ImageBackground
                source={appImages.emailVerificationBackground}
                style={styles.bgImgStyle}
            >
                <Header
                    left={true}
                    onPressLeft={() => this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)}
                />
                <View style={{ width: '88%', backgroundColor: colors.white, shadowOpacity: 0.2, marginTop: WP('40'), elevation: 1, alignSelf: 'center', borderRadius: 5 }}>
                    <LargeTitle
                        text={title}
                        style={{ marginHorizontal: 20, marginTop: WP('5'), marginBottom: WP('2') }}
                    />
                    <NormalText
                        text={desc}
                        style={{ marginHorizontal: 20, marginBottom: WP('8'), width: '70%' }}
                    />
                </View>
            </ImageBackground>
        );
    }
}


mapStateToProps = (state) => {
    return {
        // user: state.auth.user,
        // lumper: state.ui.isLoading
    }
}
mapDispatchToProps = dispatch => {
    return {
        // login: (params) => dispatch(TASKS.login(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationScreen);
