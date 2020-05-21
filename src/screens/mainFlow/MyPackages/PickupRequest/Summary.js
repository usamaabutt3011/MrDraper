import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, CustomInputField, SmallText, NormalText, Button } from '../../../../components';
import { WP, data, colors, appImages, family } from '../../../../services';
import { pickUpRequest } from '../../../../store/actions';
import Toast from 'react-native-simple-toast';
import { styles } from './styles';
const welcome = data.member_settings_v7.en.labels.welcome;

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    componentWillMount = async() => {
        const { packageDetail } = this.props;
        let { params } = this.props.navigation.state;
        console.log('[Summary.js] componentWillMount Props: ', packageDetail.packageDetailRes.result.products, params.productFeedback);
        params.productFeedback.forEach(item => {
            packageDetail.packageDetailRes.result.products.forEach( obj => {
                if (item[1].product_id == obj.id) {
                    if (item[1].returning == "no") {
                        obj.return = false;
                        if (item[1].reason == "Need alteration") {
                            obj.reason = item[1].reason                            
                        }
                    } else {
                        obj.return = true;   
                        obj.reason = item[1].reason
                    }
                } 
            })
        });
        // console.log('[Summary.js] componentWillMount After modify: ', packageDetail.packageDetailRes.result.products);
    }
    submitPickup = async () => {
        const { packageDetail, pickUpRequestAction } = this.props;
        let { params } = this.props.navigation.state; 
        let param = {
            package_id: packageDetail.packageDetailRes.result.package.package_id,
            product_feedback: params.productFeedback,
            comments: this.state.comment,
        }
        console.log('[Summary.js] submitPickup: ', param);
        await pickUpRequestAction(param)
    }
    componentWillReceiveProps = async(props) => {
        const { pickUpRequest } = props;
        console.log('[Summary.js] componentWillReceiveProps props', pickUpRequest);
        if (pickUpRequest.isSuccess) {
            Toast.show(pickUpRequest.pickupRes.message)
            this.props.navigation.push('Confirmation')
        } else {
            if (pickUpRequest.isFailure) {
                // Toast.show('done')
            }     
        }
    }

    render() {
        const { packageDetail, pickUpRequest } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('MyPackages')}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{ height: WP('5') }} />
                    <View style={[styles.subContainer, { alignItems: 'flex-start', marginBottom: WP('10') }]}>
                        <LargeTitle
                            text={`Summary`}
                            style={styles.title}
                        />
                        <SmallText
                            text={`Here’s the summary of what you’re keeping, changing and returning.`}
                            style={{ marginHorizontal: WP('6') }}
                        />
                        <View style={{ marginVertical: WP('10'), alignSelf: 'center' }}>
                            {
                                packageDetail.packageDetailRes.result.products.map((item, key) => {
                                    return (
                                        this.card(item, key)
                                    )
                                })
                            }
                        </View>
                        <CustomInputField
                            label={`Label`}
                            isRightIcon={false}
                            isMaskedInput={false}
                            multiLine={true}
                            placeholderText={`e.g. I like cotton...`}
                            placeholderTextColor={colors.lightGrey}
                            keyboardType={'default'}
                            // onChangeText={(text) => this.setState({ password: text })}
                            containerStyle={{ height: WP('25'), width: WP('80'), alignSelf: 'center', marginHorizontal: WP('5'), borderWidth: 1 }}
                            style={{ height: WP('18'), paddingHorizontal: WP(1) }}
                        />
                        <View style={{ width: WP('80'), justifyContent: 'space-between', flexDirection: 'row', marginBottom: WP('5'), marginHorizontal: WP('5'), marginTop: WP('5') }}>
                            <Button
                                title={`REDO`}
                                titleStyle={{ color: colors.mediumGrey }}
                                onPress={()=> this.props.navigation.navigate('Intro')}
                                style={{ width: WP('20'), backgroundColor: colors.bgColor }}
                            />
                            <Button
                                title={`CONFIRM PICKUP`}
                                showLoader={pickUpRequest.loading}
                                onPress={()=> this.submitPickup()}
                                style={{ width: WP('45') }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    card = (item, key) => {
        const { packageDetail } = this.props;
        return (
            <View key={key} style={{ marginBottom: WP('5'), alignSelf: 'center' }}>
                <View style={{ height: WP('20'), width: WP('80'), alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                    <Image
                        source={{ uri: `https://mrdraper-inventory.s3.eu-central-1.amazonaws.com${item.image}`}}
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
                            text={item.return ? item.reason : `Keeping`}
                            text={
                                item.return ? 
                                    item.reason
                                    :
                                    item.reason == 'Need alteration' ?  
                                        'Alteration'
                                        : 
                                        `Keeping`
                                }
                            style={{ fontFamily: family.boldText, color: item.return ? colors.orange : colors.buttonColor, fontSize: WP('3'), textAlign: 'right' }}
                            // style={{ fontFamily: family.boldText, color: colors.buttonColor }}
                        />
                    </View>
                </View>
                <View style={{ height: 0.5, width: WP('80'), backgroundColor: colors.lightGrey, alignSelf: 'center', marginTop: WP('3'), borderRadius: 3 }} />
            </View>
        )
    }
}


mapStateToProps = (state) => {
    return {
        userRes: state.login,
        packageDetail: state.packageDetailReducer,
        pickUpRequest: state.pickUpRequestReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        pickUpRequestAction: (params) => dispatch(pickUpRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
