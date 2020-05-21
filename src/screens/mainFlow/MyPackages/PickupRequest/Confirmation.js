import React, { Component } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements'
import { Header, Steps, Button, LargeTitle, MediumTitle, SmallText, QuizStaticCard } from '../../../../components';
import { WP, colors, data, appImages, family } from '../../../../services';
import { getStylistInfo, signUpObj, createSignUp } from '../../../../store/actions';
import { styles } from './styles';
const profile = data.member_settings_v7.en.labels.profile;
class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            list: [
                {
                    number: 1,
                    desc: `Your stylist, Kate, will review your request and create a personalized package for you. She will reach out if she's got any questions or you can contact her here.`
                },
                {
                    number: 2,
                    desc: `Once your box is ready, our courier will contact you to schedule a date/time for delivery.`
                },
                {
                    number: 3,
                    desc: 'After receiving the package, you get to try out the outfit. You pay for what you keep and send the rest back.'
                },
            ]
        }
    }
    openUrl = () => {
        Linking.canOpenURL(`https://www.mrdraper.com/contact-us`)
            .then((supported) => {
                if (!supported) {
                    return Linking.openURL(`https://www.mrdraper.com/contact-us`);
                } else {
                    return Linking.openURL(`https://www.mrdraper.com/contact-us`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }
    render() {
        const { } = this.props;
        const { list } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    // drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ height: WP('7') }} />
                    <View style={[styles.subContainerSchdule, { alignItems: "flex-start" }]}>
                        <LargeTitle
                            text={`All Done!`}
                            style={{ marginHorizontal: WP('5'), marginTop: WP('5') }}
                        />
                        <SmallText
                            text={`Hey John, thank you for confirming your order. Here's what will happen next:`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5'), lineHeight: 20 }}
                        />
                        {
                            list.map((item, key) => {
                                return (
                                    <View key={key} style={{ width: WP('80'), alignSelf: 'center', flexDirection: 'row', marginBottom: WP('5'), }}>
                                        <Avatar
                                            rounded
                                            size="small"
                                            title={item.number.toString()}
                                            titleStyle={{ color: colors.white, fontFamily: family.boldTitle, fontSize: WP('6'), marginBottom: 5 }}
                                            overlayContainerStyle={{ backgroundColor: colors.black, justifyContent: 'center' }}
                                        />
                                        <SmallText
                                            text={item.desc}
                                            style={{ marginHorizontal: WP('3'), marginTop: WP('1.2'), lineHeight: 20, marginRight: WP('20') }}
                                        />
                                    </View>
                                )
                            })
                        }
                        <View style={{ height: WP('0.1'), width: WP('80'), alignSelf: 'center', marginVertical: WP('5'), backgroundColor: colors.lightGrey }} />
                        <View style={{ flexDirection: 'row', marginHorizontal: WP('5') }}>
                            <SmallText
                                text={`Need help?`}
                                style={{ fontSize: WP('4') }}
                            />
                            <TouchableOpacity
                                onPress={()=> this.openUrl()}
                            >
                                <SmallText
                                    text={` Contact Support`}
                                    style={{ fontSize: WP('4'), color: colors.buttonColor, fontFamily: family.boldText }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: WP('0.1'), width: WP('80'), alignSelf: 'center', marginVertical: WP('5'), backgroundColor: colors.lightGrey, marginBottom: WP('20') }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        stylist: state.stylistInfo,
        signup: state.signup,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
        signUpObjAction: (params) => dispatch(signUpObj(params)),
        createSignUp: (params) => dispatch(createSignUp(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
