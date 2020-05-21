import React, { Component } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements'
import { Header, Steps, Button, LargeTitle, MediumTitle, SmallText, QuizStaticCard } from '../../../../components';
import { WP, colors, data, appImages, family } from '../../../../services';
import { getStylistInfo, signUpObj, createSignUp } from '../../../../store/actions';
import { styles } from './styles';
const profile = data.member_settings_v7.en.labels.profile;
class NoteFive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            list: [
                {
                    number: 1,
                    desc: 'Your personal stylist curates your box.'
                },
                {
                    number: 2,
                    desc: 'We deliver your box on schedule date & time.'
                },
                {
                    number: 3,
                    desc: 'You have 5 days to try out items.'
                },
                {
                    number: 4,
                    desc: `Once you've decided what you're keeping, request a pick-up from your profile & leave feedback.`
                },
                {
                    number: 5,
                    desc: `We'll collect your box at your convenience.`
                },
            ]
        }
    }

    render() {
        const { } = this.props;
        const { list } = this.state;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <Header
                        left={false}
                        right={false}
                        // onPressLeft={() => this.props.navigation.goBack()}
                    />
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Steps
                            isCheckStyle={true}
                            isCheckPreference={true}
                            styleQuiz={true}  // chane the stepper text
                            isCheckStylist={true}
                            isStyleColored={true}
                            iStylistColored={true}
                            isPreferenceColored={true}
                            progress={WP('79.5')} //83 total , per head= 6.9 , current =79.5
                        />
                        <View style={{ height: WP('5') }} />
                        <View style={[styles.subContainerPersonal, { alignItems: "flex-start" }]}>
                            <ImageBackground
                                source={appImages.noteHeaderImage}
                                style={{ height: WP('40'), width: WP('90') }}
                            >
                                <View style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: colors.blackTransparent }}>
                                    <LargeTitle
                                        text={`It's Done!`}
                                        style={{ color: colors.white, marginHorizontal: WP('5') }}
                                    />
                                </View>
                            </ImageBackground>
                            <MediumTitle
                                text={`What's next?`}
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('5'), fontSize: WP('6') }}
                            />
                            {
                                list.map((item, key) => {
                                    return (
                                        <View key={key} style={{ width: WP('80'), alignSelf: 'center', flexDirection: 'row', marginBottom: WP('5'), }}>
                                            <Avatar
                                                rounded
                                                size="small"
                                                title={item.number.toString()}
                                                titleStyle={{ color: colors.white, fontFamily: family.boldTitle, fontSize: WP('6'), top: -5 }}
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
                        </View>
                        <QuizStaticCard
                            title={'Take Profile Tour'}
                            text={'Explore options'}
                            tour={true}
                            titleStyle={{  marginHorizontal: WP('7') }}
                            onPress={()=> this.props.navigation.push('TabStack')}
                            style={{ alignSelf: 'center', backgroundColor: '#D25053' }}     
                        />
                        <QuizStaticCard
                            contact={true}
                            title={'Contact Stylist'}
                            text={'Add more detail to your requests'}
                            titleStyle={{  marginHorizontal: WP('7') }}
                            onPress={()=> this.props.navigation.push('TabStack')}
                            style={{ alignSelf: 'center', backgroundColor: '#F48874' }}     
                        />
                        <QuizStaticCard
                            refer={true}
                            title={'Refer a Friend'}
                            text={'Get AED 100 OFF'}
                            titleStyle={{  marginHorizontal: WP('7') }}
                            onPress={()=> this.props.navigation.push('TabStack')}
                            style={{ alignSelf: 'center', backgroundColor: '#72BFBD' }}     
                        />
                        <QuizStaticCard
                            blog={true}
                            title={'Read Blog'}
                            text={'Learn about the latest style trends'}
                            titleStyle={{  marginHorizontal: WP('7') }}
                            onPress={()=> this.props.navigation.push('TabStack')}
                            style={{ alignSelf: 'center', backgroundColor: '#353534' }}     
                        />
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteFive);
