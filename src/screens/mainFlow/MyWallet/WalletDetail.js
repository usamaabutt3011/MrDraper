import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { Header, Button, StylistCard, MediumTitle, LargeTitle, SmallText, CustomInputField } from '../../../components';
import { WP, colors, appImages, data, family } from '../../../services';
import { getStylistInfo, updateProfile, updateProfileObj, changePassword, updateProfilePic } from '../../../store/actions';
import { styles } from './styles';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
class WalletDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            profile_image: '',
            posts: [{}, {}, {}, {}]
        }
    }

    historyCard = (item, key) => {
        return (
            <View key={key} style={{ width: WP('90'), justifyContent: 'center' }}>
                <View style={{ marginVertical: WP('5') }}>
                    <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SmallText
                            text={`${item.source}`}
                            style={{ fontFamily: family.boldText, fontSize: WP('4.5') }}
                        />
                        <SmallText
                            text={`+AED ${item.value}`}
                            style={{ fontSize: WP('3.5'), color: colors.buttonColor }}
                        />
                    </View>
                    <SmallText
                        text={`${item.created_at}`}
                        style={{ marginHorizontal: WP('5'), fontSize: WP('3'), marginTop: WP('2'), color: colors.lightGrey }}
                    />
                </View>
                {
                    key < this.state.posts.length - 1 ?
                        <View style={{ height: WP('0.2'), width: WP('80'), backgroundColor: '#ccc', alignSelf: 'center' }} />
                        :
                        null
                }
            </View>
        )}

    render() {
        const { walletDetails } = this.props;
        const { posts } = this.state;
        return (
            <View
                style={{ flexGrow: 1 }}
            >
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />

                <View style={styles.container}>
                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ height: WP('5') }} />
                        <View style={styles.subContainerPersonal}>
                            <SmallText
                                text={`Current Balance`}
                                style={{ fontSize: WP('3.7'), marginTop: WP('5'), marginHorizontal: WP('5'), color: colors.mediumGrey }}
                            />
                            <LargeTitle
                                text={`AED ${walletDetails.walletDetailRes ? walletDetails.walletDetailRes.user.result.total : ''}`}
                                style={{ marginHorizontal: WP('5'), fontFamily: family.boldText, marginTop: WP('2'), marginBottom: WP('5') }}
                            />                           
                        </View>
                        <MediumTitle
                            text={`Balance History`}
                            style={{ marginHorizontal: WP('5'), marginBottom: WP('5') }}
                        />
                        <View style={{ borderRadius: 3, backgroundColor: colors.white, alignSelf: 'center', overflow: 'hidden', marginBottom: WP('5') }}>
                            {
                                walletDetails.walletDetailRes.user.result.wallet_entries && walletDetails.walletDetailRes.user.result.wallet_entries.map((item, key) => {
                                    return (
                                        this.historyCard(item, key)
                                    )
                                })
                            }
                            {
                                walletDetails.walletDetailRes.user.result.wallet_spends && walletDetails.walletDetailRes.user.result.wallet_spends.map((item, key) => {
                                    return (
                                        this.historyCard(item, key)
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        userInfo: state.login,
        stylist: state.stylistInfo,
        walletDetails: state.walletDetailReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        getStylistDetail: (params) => dispatch(getStylistInfo(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
