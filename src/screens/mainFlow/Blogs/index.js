import React, { Component } from 'react';
import { View, Linking, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../../../components';
import { WP, colors } from '../../../services';
import { getStylistInfo } from '../../../store/actions';
import { styles } from './styles';
import { WebView } from 'react-native-webview';

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webviewURL: "https://www.mrdraper.com/blog"
        }
    }

    render() {
        return (
            <View
                style={{ flexGrow: 1 }}
            >
                <StatusBar backgroundColor="rgb(0,0,0)" barStyle='dark-content' />
                <Header
                    // drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2 }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                {/* <View style={styles.container}> */}
                        <WebView
                            ref={(ref) => { this.webview = ref; }}
                            source={{ uri: this.state.webviewURL }}
                            renderLoading={() => (
                                <View style={{ flex: 1, alignItems: 'center', backgroundColor:'#fff' }}>
                                    <ActivityIndicator size='small' color={colors.black} animating={true} />
                                </View>
                            )}
                            style={{ height: WP('100'), top: WP(0) }}
                            scalesPageToFit={true}
                            startInLoadingState={true}
                        />
                {/* </View> */}
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        stylist: state.stylistInfo,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
