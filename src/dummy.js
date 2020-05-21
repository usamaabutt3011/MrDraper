import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet ,Text} from 'react-native';
import { connect } from 'react-redux';
// import * as Util from './services/index';

class Dummy extends Component {
    constructor(props) {
        super(props);
        this.isLoggedIn();
    }

    isLoggedIn = async () => {
        // console.log('isLoggedIn', this.props.user);
        this.props.navigation.navigate(this.props.user.userProfile ? 'App' : 'AuthStack');
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
mapStateToProps = (state) => {
    return {
        user: state.login,
    }
}
export default connect(mapStateToProps, null)(Dummy);
