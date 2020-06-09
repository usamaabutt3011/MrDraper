import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, Button, Loader } from '../../../../../components';
import { WP, data, colors, appImages } from '../../../../../services';
import { PackageRequestObj, getStylistInfo } from '../../../../../store/actions';
import { styles } from '../styles';

class SurpriseMe extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount = async () => {
        const { getStylistDetail, userInfo } = this.props;
        console.log('[MyStylist.js] userInfo====:', userInfo);
        try {
            let param = {
                "return_info": "stylist"
            }
            await getStylistDetail(param)
        } catch (error) {
            //error
        }
        // this.phone.getAllCountries()
    }
    selectPackage = async () => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = this.props.packageRequest;
        console.log('[Confirmation.js] SurpriseMe First', this.props.packageRequest);
        packageRequestObj.package_name = "Surprise Me"
        console.log('[Confirmation.js] SurpriseMe After', this.props.packageRequest);
        this.props.navigation.push('DetailCorrection')
    }
    render() {
        const { stylist, userInfo } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={{ height: WP('7') }} />
                    {
                        stylist.loading ?
                            <Loader
                                style={{ alignSelf: 'center' }}
                            />
                            :
                            <View style={styles.subContainer}>
                                <LargeTitle
                                    text={`Surprise Me!`}
                                    style={styles.title}
                                />
                                <NormalText
                                    text={`Here's how this works`}
                                    style={styles.normalText}
                                />
                                <Image
                                    source={appImages.surpriseMe}
                                    style={styles.image}
                                />
                                <NormalText
                                    text={`We know you’re a man who loves to look good when you’re out and about. That’s why you took the time to complete your style profile with us.

 This is what your stylist, ${stylist.isSuccess ? stylist.stylistInfo.result.stylist_name : ''}, will review to create your surprise box. All your purchases and feedback have been added to your profile and will guide ${stylist.isSuccess ? stylist.stylistInfo.result.stylist_name : ''} in creating an outfit that is certain to turn heads.`}
                                    style={styles.normalText}
                                />
                                <Button
                                    title={`LET'S DO THIS!`}
                                    onPress={() => this.selectPackage()}
                                    style={styles.surpriseButton}
                                />
                            </View>
                    }
                </ScrollView>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        stylist: state.stylistInfo,
        packageRequest: state.packageRequestReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
        PackageRequestObjAction: (params) => dispatch(PackageRequestObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurpriseMe);
