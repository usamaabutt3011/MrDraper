import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, MediumTitle, NormalText, SmallText, Loader } from '../../../../components';
import { WP, data, colors } from '../../../../services';
import { styles } from './styles';
import { myPackagesDetail } from '../../../../store/actions'
const welcome = data.member_settings_v7.en.labels.welcome;

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount = async () => {
        let { params } = this.props.navigation.state;
        const { userRes, packageDetail, packagesList, packageDetailAction } = this.props;
        console.log('[Intro.js] componentWillMount Porps:', params.item.id);
        let param = {
            user_id: userRes.userProfile.result.user_id,
            package_id: params.item.id.toString(),
        }
        await packageDetailAction(param);
    }
    componentWillReceiveProps = async (props) => {
        const { packageDetail } = props;
        console.log('[Intro.js] componentWillReceiveProps Porps: ', props);
        if (packageDetail.packageDetailRes && packageDetail.packageDetailRes.result.products) {

        } else {

        }
    }
    render() {
        const { userRes, packageDetail } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('MyPackages')}
                />
                {
                    packageDetail.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Loader />                            
                        </View>
                        :
                        <View style={{}}>
                            <View style={{ height: WP('5') }} />
                            <View style={styles.subContainer}>
                                <MediumTitle
                                    text={`Hi ${userRes.userProfile.result.name},`}
                                    style={styles.title}
                                />
                                <NormalText
                                    text={`Request your pick up here and give feedback to your stylist on the items to help them personalize your future boxes even more!`}
                                    style={styles.normalText}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.props.navigation.push('ItemsShowCase')}
                                >
                                    <SmallText
                                        text={welcome.cta.toUpperCase()}
                                        style={styles.smallText}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                }
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        packageDetail: state.packageDetailReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        packageDetailAction: (params) => dispatch(myPackagesDetail(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
