import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation, ScrollView } from 'react-navigation';
import { WP, colors, family, appImages } from '../../../../services';
import { Header, MediumTitle, Button, MyPackagesCard, NormalText, SmallText, Loader } from '../../../../components';
import { myPackagesDetail } from '../../../../store/actions';
import { styles } from './styles';
import { connect } from 'react-redux';

class PackageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kept: 0,
            returned: 0,
        }
    }
    componentWillMount = async () => {
        let { params } = this.props.navigation.state;
        const { userRes, packageDetail, packagesList, packageDetailAction } = this.props;
        // console.log('[MyPackages.js] componentWillMount Porps:', params.item.id);
        let param = {
            user_id: userRes.userProfile.result.user_id,
            package_id: params.item.id.toString(),
        }
        await packageDetailAction(param);
    }
    componentWillReceiveProps = async (props) => {
        const { packageDetail } = props;
        const { returned, kept } = this.state;
        // console.log('[MyPackagesDetails.js] componentWillReceiveProps Porps: ', props);
        if (packageDetail.packageDetailRes && packageDetail.packageDetailRes.result.products) {
            packageDetail.packageDetailRes.result.products.forEach(item => {
                if (item.returned) {
                    this.setState({
                        returned: returned + 1
                    }, () => {
                        // console.log('return==========:', returned);
                    })
                } else {
                    this.setState({
                        kept: kept + 1
                    }, () => {
                        // console.log('kept==========:', kept);
                    })
                }
            });
        } else {

        }
    }
    render() {
        const { packageDetail } = this.props;
        const { returned, kept } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    onPressLeft={() => this.props.navigation.goBack()}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                />
                {
                    packageDetail.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Loader />
                        </View>
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <MediumTitle
                                text={'Package Details'}
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                            />
                            {
                                packageDetail.packageDetailRes ?
                                    <MyPackagesCard
                                        item={packageDetail.packageDetailRes.result.package}
                                        picked={true}
                                        title={packageDetail.packageDetailRes.result.package.package_id}
                                        date={packageDetail.packageDetailRes.result.package.date}
                                        items={packageDetail.packageDetailRes.result.package.total_qty} //kept_qty
                                        style={{ marginVertical: WP('5') }}
                                    />
                                    : null
                            }
                            <MediumTitle
                                text={'Package Contents'}
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                            />
                            <View style={{ width: WP('90'), backgroundColor: colors.white, alignSelf: 'center', borderRadius: 3, marginBottom: WP('10') }}>
                                <Text style={{ fontSize: WP('4'), fontFamily: family.boldText, marginHorizontal: WP('5'), marginTop: WP('5') }}>
                                    You
                                    <Text style={{ color: colors.buttonColor }}> kept {kept}
                                        <Text style={{ color: colors.black }}> products and
                                        <Text style={{ color: colors.orange }}> returned {returned}.</Text>
                                        </Text>
                                    </Text>
                                </Text>
                                <SmallText
                                    text={`Tap to see product details`}
                                    style={{ marginTop: WP('5'), marginBottom: WP('5'), marginHorizontal: WP('5'), color: colors.mediumGrey }}
                                />
                                {
                                    packageDetail.packageDetailRes &&
                                    packageDetail.packageDetailRes.result.products &&
                                    packageDetail.packageDetailRes.result.products.map((item, key) => {
                                        return (
                                            this.historyCard(item, key)
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                }
            </View>
        );
    }
    historyCard = (item, key) => {
        console.log('=======histiry card: ', item.image);
        const { packageDetail } = this.props;
        return (
            <View key={key} style={{ marginBottom: WP('5') }}>
                <View style={{ height: WP('20'), width: WP('80'), alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                    <Image
                        source={{ uri: item.image }}
                        // source={{ uri: `http://stagingwebsite.mrdraper.com${item.image}` }}
                        style={{ height: WP('15'), width: WP('15'), marginHorizontal: WP('2') }}
                    />
                    <View style={{ justifyContent: 'center', width: WP('40') }}>
                        <NormalText
                            text={`${item.brand}`}
                            style={{ fontFamily: family.boldText }}
                        />
                        <SmallText
                            text={`${item.category}`}
                            style={{ marginVertical: WP('1') }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <SmallText
                                text={`AED ${item.retail_price}`}
                                style={{ color: colors.orange, fontSize: WP('3'), textDecorationLine: 'line-through' }}
                            />
                            <SmallText
                                text={`AED ${item.sale_price}`}
                                style={{ fontSize: WP('3'), marginLeft: WP('2') }}
                            />
                        </View>
                    </View>
                    <View style={{ width: WP('20'), alignItems: 'flex-end' }}>
                        <NormalText
                            text={item.returned ? `Returned` : `Kept`}
                            style={{ fontFamily: family.boldText, color: item.returned ? colors.orange : colors.buttonColor }}
                        />
                    </View>
                </View>
                {
                    key < packageDetail.packageDetailRes.result.products.length - 1 ?
                        <View style={{ height: 0.5, width: WP('80'), backgroundColor: colors.lightGrey, alignSelf: 'center', marginTop: WP('3'), borderRadius: 3 }} />
                        :
                        null
                }
            </View>
        )
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        packagesList: state.myPackagesReducer,
        packageDetail: state.packageDetailReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        packageDetailAction: (params) => dispatch(myPackagesDetail(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetail);