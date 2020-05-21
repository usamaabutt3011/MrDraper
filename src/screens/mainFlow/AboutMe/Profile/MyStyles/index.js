import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, SmallText, DressCard, ProfileHeader, ProfileHeaderTabs, Button } from '../../../../../components';
import { WP, data, colors, appImages } from '../../../../../services';
import { styles } from './styles';
import Toast from 'react-native-simple-toast'
import { updateStyles } from '../../../../../store/actions';
import { Text } from 'react-native-elements';

const mySizesArr = [
    {
        tab: 'Work Wear',
        checked: true,
    },
    {
        tab: 'Weekend Wear',
        checked: false
    },
    {
        tab: 'Night Out Wear',
        checked: false
    },
];

const workWear = Object.values(data.member_settings_v7.en.work_wear)
const weekendWear = Object.values(data.member_settings_v7.en.weekend_wear)
const nightOutWear = Object.values(data.member_settings_v7.en.nightout_wear)

class MyStyles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workWearState: '',
            workWeekend: '',
            workNightOut: '',
            refresh: false,
            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,
            changeDetacted: false
        }
        workWear.forEach(item => {
            item.isSelect = false
        })
        weekendWear.forEach(item => {
            item.isSelect = false
        })
        nightOutWear.forEach(item => {
            item.isSelect = false
        })
    }

    componentWillMount() {
        const { userRes } = this.props;

        workWear.forEach(item => {
            if (item.name == userRes.userProfile.result.work_wear) {
                item.isSelect = true
                this.setState({ workWearState: item.name })
            } else {
                item.isSelect = false
            }
        })
        weekendWear.forEach(item => {
            if (item.name == userRes.userProfile.result.weekend_wear) {
                item.isSelect = true
                this.setState({ workWeekend: item.name })
            } else {
                item.isSelect = false
            }
        })
        nightOutWear.forEach(item => {
            if (item.name == userRes.userProfile.result.nightout_wear) {
                item.isSelect = true
                this.setState({ workNightOut: item.name })
            } else {
                item.isSelect = false
            }
        })

        this.setState({ refresh: false })
        // console.log('[MyStyles.js] Props are: ', userRes);
        // console.log('[wearOnWork.js] signup obj',weekendWear)
    }
    selectItem = async (value, label) => {
        const { userRes } = this.props;
        let { workWearState, workWeekend, workNightOut } = this.state;
        let work = workWearState;
        let weekend = workWeekend;
        let night = workNightOut;

        switch (label) {
            case 'work':
                workWear.forEach(item => {
                    if (item.name == value.name) {
                        item.isSelect = true
                        work = item.name;
                        this.setState({ workWearState: item.name, refresh: true })
                    } else {
                        item.isSelect = false
                    }
                })
                break;
            case 'weekend':
                weekendWear.forEach(item => {
                    if (item.name == value.name) {
                        item.isSelect = true
                        weekend = item.name;
                        this.setState({ workWeekend: item.name, refresh: true })
                    } else {
                        item.isSelect = false
                    }
                })
                break;
            case 'night':
                nightOutWear.forEach(item => {
                    if (item.name == value.name) {
                        item.isSelect = true
                        night = item.name;
                        this.setState({ workNightOut: item.name, refresh: true })
                    } else {
                        item.isSelect = false
                    }
                })
                break;

            default:
                break;
        }

        if (userRes.userProfile && userRes.userProfile.result.work_wear !== work ||
            userRes.userProfile.result.weekend_wear !== weekend ||
            userRes.userProfile.result.nightout_wear !== night) {
            this.setState({ changeDetacted: true });
        } else {
            this.setState({ changeDetacted: false });
        }
    }
    updateStyles = async () => {
        const { updateStylesAction, updateStyleRes, userRes } = this.props;
        const { workWearState, workWeekend, workNightOut } = this.state;
        let params = {
            "user_id": userRes.userProfile.result.user_id,//"8",
            "work_wear": workWearState,
            "weekend_wear": workWeekend,
            "nightout_wear": workNightOut
        }
        // console.log('[MyStyles.js] updateStyles Params', params);
        await updateStylesAction(params);
    }
    componentWillReceiveProps = async (props) => {
        // console.log('[MyStyles.js] componentWillReceiveProps', props);
        const { updateStyleRes, userRes } = props;
        const { workWearState, workWeekend, workNightOut } = this.state;
        if (updateStyleRes.isSuccess) {
            updateStyleRes.isSuccess = false;
            userRes.userProfile.result.work_wear = workWearState;
            userRes.userProfile.result.weekend_wear = workWeekend;
            userRes.userProfile.result.nightout_wear = workNightOut;
            this.setState({ refresh: false, changeDetacted: false })
            Toast.show(updateStyleRes.myStylesRes.message)
        } else {
            //isFalse Case
        }
    }
    headerTabSelection = (item) => {
        mySizesArr.forEach(value => {
            if (item.tab == value.tab) {
                value.checked = true
                this.setState({ refresh: true })
            } else {
                value.checked = false
            }
        });
        switch (item.tab) {
            case 'Work Wear':
                scrollYPos = this.state.screenHeight * 0;
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Weekend Wear':
                scrollYPos = WP('240');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Night Out Wear':
                scrollYPos = WP('440');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            default:
                break;
        }
    }
    discard = () => {
        Toast.show('Your changes have been discarded.')
        // this.props.navigation.replace('MyPackages')
        this.setState({ changeDetacted: false });
        this.componentWillMount();
    }
    render() {
        const { refresh } = this.state;
        const { updateStyleRes } = this.props;
        let title = data.member_settings_v7.en.labels.work_wear;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('TabStack')}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    ref={(scroller) => { this.scroller = scroller }}
                    stickyHeaderIndices={[1]}
                >
                    <ProfileHeader
                        title={`My Styles`}
                        image={appImages.myStyles}
                    />
                    <ProfileHeaderTabs
                        tabs={mySizesArr}
                        onPress={(item) => {
                            this.headerTabSelection(item)
                            // this.scrollToB()
                        }}
                        containerStyle={{ zIndex: 4 }}
                    />
                    <View style={{ height: WP('10') }} />

                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`Work Wear`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select what you wear for work.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', zIndex: 1, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                workWear.map((item, key) => {
                                    return (
                                        <DressCard
                                            key={key}
                                            isSelected={item.isSelect}
                                            placeholder={false}
                                            imageURI={item.image}
                                            title={item.name}
                                            description={item.description}
                                            //style={{}}
                                            onPress={() => this.selectItem(item, 'work')}
                                        />
                                    )
                                })
                            }
                        </View>
                        <View style={{ height: WP('25'), width: WP('80'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                            <Text style={{ fontSize: 14, color: colors.lightGrey, marginHorizontal: WP('3') }}>x</Text>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                        </View>
                        <LargeTitle
                            text={`Weekend Wear`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select what you wear on weekends.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), zIndex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                weekendWear.map((item, key) => {
                                    return (
                                        <DressCard
                                            key={key}
                                            isSelected={item.isSelect}
                                            placeholder={false}
                                            imageURI={item.image}
                                            title={item.name}
                                            description={item.description}
                                            //style={{}}
                                            onPress={() => this.selectItem(item, 'weekend')}
                                        />
                                    )
                                })
                            }
                        </View>
                        <View style={{ height: WP('25'), width: WP('80'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                            <Text style={{ fontSize: 14, color: colors.lightGrey, marginHorizontal: WP('3') }}>x</Text>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                        </View>
                        <LargeTitle
                            text={`Night Out Wear`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select what you wear on nights out.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), zIndex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                nightOutWear.map((item, key) => {
                                    return (
                                        <DressCard
                                            key={key}
                                            isSelected={item.isSelect}
                                            placeholder={false}
                                            imageURI={item.image}
                                            title={item.name}
                                            description={item.description}
                                            //style={{}}
                                            onPress={() => this.selectItem(item, 'night')}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                {this.state.changeDetacted ?
                    <View style={{ height: WP('28'), width: WP('100'), backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
                        <SmallText
                            text={`Do you want to save these changes?`}
                        />
                        <View style={{ width: WP('88'), justifyContent: 'space-between', flexDirection: 'row', marginTop: WP('5') }}>
                            <Button
                                title={`DISCARD`}
                                titleStyle={{ color: colors.mediumGrey }}
                                onPress={() => this.discard()}
                                style={{ height: WP('12'), width: WP('38'), backgroundColor: colors.bgColor }}
                            />
                            <Button
                                title={`SAVE`}
                                onPress={() => this.updateStyles()}
                                showLoader={updateStyleRes.loading}
                                style={{ height: WP('12'), width: WP('38') }}
                            />
                        </View>
                    </View>
                    : null
                }
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        updateStyleRes: state.updateStylesReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        updateStylesAction: (params) => dispatch(updateStyles(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStyles);
