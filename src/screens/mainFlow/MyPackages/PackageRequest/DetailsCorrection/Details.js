import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, SmallText, TinyText, Button } from '../../../../../components';
import { WP, data, colors, family } from '../../../../../services';
import { styles } from '../styles';

class DetailCorrection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { userRes } = this.props;
        let userInfo = userRes.userProfile.result;
        console.log('[render.js] login details', userInfo);

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
                    <View style={styles.subContainer}>
                        <LargeTitle
                            text={`Are These Details Correct?`}
                            style={[styles.title, { marginRight: WP('10') }]}
                        />
                        <NormalText
                            text={`Please confirm your sizes and fits.`}
                            style={styles.normalText}
                        />
                        <View style={{ height: WP('10'), width: WP('78'), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                            <View style={{ justifyContent: 'space-between', width: WP('28') }}>
                                <SmallText
                                    text={`Shirt Size`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={userInfo.shirt_size}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                            <View style={{ justifyContent: 'space-between', width: WP('28') }}>
                                <SmallText
                                    text={`Shirt Fit`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={userInfo.shirts_fit}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                            <View style={{ justifyContent: 'space-between' }}>
                                <SmallText
                                    text={`Waist Size`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={userInfo.waist_size}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                        </View>
                        <View style={{ height: WP('10'), width: WP('78'), flexDirection: 'row', marginVertical: WP('7'), justifyContent: 'space-between', alignSelf: 'center' }}>
                            <View style={{ justifyContent: 'space-between', width: WP('28') }}>
                                <SmallText
                                    text={`Pants Fit`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={userInfo.pants_fit}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                            <View style={{ justifyContent: 'space-between', width: WP('28') }}>
                                <SmallText
                                    text={`Blazer Size`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={userInfo.blazer_size}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                            <View style={{ justifyContent: 'space-between' }}>
                                <SmallText
                                    text={`Shoe Size`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={userInfo.shoe_size}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                        </View>
                        <View style={{ height: WP('10'), width: WP('78'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'space-between', width: WP('28') }}>
                                <SmallText
                                    text={`Height`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={`${userInfo.height} cm`}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                            <View style={{ justifyContent: 'space-between', width: WP('45') }}>
                                <SmallText
                                    text={`Weight`}
                                    style={{ fontSize: WP('3') }}
                                />
                                <SmallText
                                    text={`${userInfo.weight} kg`}
                                    style={{ fontFamily: family.boldText, fontSize: WP('4.3') }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', width: WP('78'), marginTop: WP('10'), marginBottom: WP('2'), alignSelf: 'center', justifyContent: 'space-between' }}>
                            <Button
                                title={`EDIT DETAILS`}
                                style={[styles.button, { backgroundColor: colors.orange }]}
                                onPress={() => this.props.navigation.push('EditDetail')}
                            />
                            <Button
                                title={`THAT'S ME!`}
                                style={styles.button}
                                onPress={() => this.props.navigation.push('Confirmation')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
    }
}
mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailCorrection);
