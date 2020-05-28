import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation, ScrollView } from 'react-navigation';
import { WP, colors, family } from '../../../../services';
import { Header, MediumTitle, Button, MyPackagesCard, NormalText, SmallText, Loader } from '../../../../components';
import { myPackagesList } from '../../../../store/actions';
import { styles } from './styles';
import { connect } from 'react-redux';

class MyPackages extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount = async () => {
        await this.getPackages()
    }
    componentDidMount = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", async() => {
          // The screen is focused
          // Call any action
          await this.getPackages()
        });
      }
    componentWillReceiveProps = async (props) => {
        const { packagesList, myPackagesListAction } = props;
        console.log('[MyPackages.js] componentWillReceiveProps Porps: ', props);
    }
    getPackages = async () => {
        const { userRes, packagesList, myPackagesListAction } = this.props;
        // console.log('[MyPackages.js] componentWillReceiveProps Porps: ', this.props);
        let params = {
            user_id: userRes.userProfile.result.user_id
        }
        await myPackagesListAction(params);
    }
    render() {
        const { packagesList } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                />
                {
                    packagesList.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Loader />
                        </View>
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <MediumTitle
                                text={'My Packages'}
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                            />
                            <Button
                                title={'Request a Package'}
                                style={{ alignSelf: 'center', width: WP('90'), marginBottom: WP('5') }}
                                onPress={() => this.props.navigation.push('PackageRequestStack') }
                            />
                            {
                                packagesList.myPackagesRes &&
                                packagesList.myPackagesRes.result.packages &&
                                packagesList.myPackagesRes.result.packages.map((item, key) => {
                                    return (
                                        item.completed == false ?
                                            <MyPackagesCard
                                                key={key}
                                                item={item}
                                                picked={true}
                                                title={item.package_id}
                                                date={item.date}
                                                items={item.total_qty} //kept_qty
                                                style={{ marginVertical: WP('2') }}
                                                // onPress={() => this.props.navigation.push('PackageRequestStack') }
                                                onPress={() => this.props.navigation.push('PickupRequestStack',{ item }) }
                                            />
                                            : null
                                    )
                                })
                            }
                            <MediumTitle
                                text={'History'}
                                style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                            />
                            {
                                packagesList.myPackagesRes &&
                                packagesList.myPackagesRes.result.packages &&
                                packagesList.myPackagesRes.result.packages.map((item, key) => {
                                    return (
                                        item.completed ?
                                            this.historyCard(item, key)
                                            : null
                                    )
                                })
                            }
                        </ScrollView>
                }
            </View>
        );
    }
    historyCard = (item, key) => {
        return (
            <View key={key} style={{ height: WP('20'), width: WP('90'), backgroundColor: colors.white, alignSelf: 'center', borderRadius: 4, marginBottom: WP('4'), flexDirection: 'row' }}>
                <View style={styles.textContainer}>
                    <NormalText
                        text={item.package_id}
                        style={styles.historyTitle}
                    />
                    <SmallText
                        text={item.date}
                        style={{ marginTop: WP('1.5') }}
                    />
                </View>
                <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={() => this.props.navigation.push('PackageDetail', { item: item })}>
                    <NormalText
                        text={'VIEW DETAILS'}
                        style={{ fontFamily: family.boldText, fontSize: WP('3.5'), color: colors.buttonColor }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        signup: state.signup,
        packagesList: state.myPackagesReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        myPackagesListAction: (params) => dispatch(myPackagesList(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPackages);