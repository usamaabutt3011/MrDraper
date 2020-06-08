import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { Header, LargeTitle, MediumTitle, SmallText, SelectItemCard, Button, Steps } from '../../../../../components';
import { WP, colors, data } from '../../../../../services';
import { PackageRequestObj } from '../../../../../store/actions';
import { styles } from '../styles';

var items = Object.values(data.package_request_flow.items)
var tops = Object.values(data.package_request_flow.items.tops)
var bottoms = Object.values(data.package_request_flow.items.bottoms)
var accessories = Object.values(data.package_request_flow.items.accessories)
var footwear = Object.values(data.package_request_flow.items.footwear)

class SelectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            needs: []
        }
    }
    componentDidMount() {
        tops.forEach(item => {
            item.checked = false;
        })
        bottoms.forEach(item => {
            item.checked = false;
        })
        footwear.forEach(item => {
            item.checked = false;
        })
        accessories.forEach(item => {
            item.checked = false;
        })
    }
    selectItems = async (value, label) => {
        const { needs } = this.state;
        switch (label) {
            case 'top':
                if (needs.includes(value.name)) {
                    var index = needs.indexOf(value.name);
                    if (index > -1) {
                        needs.splice(index, 1);
                    }
                    await this.selectItem(needs)
                    // marked checked
                    tops.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = false;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[tops Customise array] true', tops);
                } else {
                    needs.push(value.name)
                    await this.selectItem(needs)
                    // marked unchecked
                    tops.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = true;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[tops Customise array] false', tops);
                }
                break;
            case 'bottom':
                if (needs.includes(value.name)) {
                    var index = needs.indexOf(value.name);
                    if (index > -1) {
                        needs.splice(index, 1);
                    }
                    await this.selectItem(needs)
                    // marked checked
                    bottoms.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = false;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[itemBottom Customise array] true', tops);
                } else {
                    needs.push(value.name)
                    await this.selectItem(needs)
                    // marked unchecked
                    bottoms.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = true;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[itemBottom Customise array] false', tops);
                }
                break;
            case 'footwear':
                if (needs.includes(value.name)) {
                    var index = needs.indexOf(value.name);
                    if (index > -1) {
                        needs.splice(index, 1);
                    }
                    await this.selectItem(needs)
                    // marked checked
                    footwear.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = false;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[footwear Customise array] true', footwear);
                } else {
                    needs.push(value.name)
                    await this.selectItem(needs)
                    // marked unchecked
                    footwear.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = true;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[footwear Customise array] false', footwear);
                }
                break;
            case 'accessories':
                if (needs.includes(value.name)) {
                    var index = needs.indexOf(value.name);
                    if (index > -1) {
                        needs.splice(index, 1);
                    }
                    await this.selectItem(needs)
                    // marked checked
                    accessories.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = false;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[accessories Customise array] true', tops);
                } else {
                    needs.push(value.name)
                    await this.selectItem(needs)
                    // marked unchecked
                    accessories.forEach(item => {
                        if (item.name === value.name) {
                            item.checked = true;
                            this.setState({ refresher: false })
                        }
                    })
                    console.log('[accessories Customise array] false', tops);
                }
                break;

            default:
                break;
        }

    }
    selectItem = async (needs) => {
        const { PackageRequestObjAction, packageRequest } = this.props;
        var params = packageRequest.packageRequestObj
        params.needs = needs; // local state
        // console.log('===========================================================================================================')
        // console.log('[SelectItem.js] SelectItem obj edited', params)
        await PackageRequestObjAction(params)
        // console.log('[SelectItem.js] SelectItem obj edited', packageRequest.packageRequestObj)
        // console.log('===========================================================================================================')
    }
    componentWillUnmount = async() => {
        const { PackageRequestObjAction, packageRequest } = this.props;
        var params = packageRequest.packageRequestObj
        params.needs = []; // local state
        await PackageRequestObjAction(params)
    }
    next = async() => {
        const { needs } = this.state;
        const { packageRequestObj } = this.props.packageRequest;
        console.log('[SelectItem.js] SelectItem First', this.props.packageRequest);
        if (needs.length > 0) {
            packageRequestObj.package_name = "By Items"
            console.log('[SelectItem.js] SelectItem After', this.props.packageRequest);
            this.props.navigation.push('DetailCorrection')   
        } else {
            Toast.show('Please select any Item.')
        }
    }
    render() {
        const { packageRequest } = this.props;
        const { needs } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`Select Items`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={`Select multiple items or just one`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <MediumTitle
                            text={`Tops`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('3') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {
                                    tops.map((item, key) => {
                                        return (
                                            <View key={key} style={{ width: '33.33%', padding: 8 }}>
                                                <SelectItemCard
                                                    key={key}
                                                    title={item.name}
                                                    isSelected={item.checked}
                                                    placeholder={false}
                                                    imageURI={item.image}
                                                    description={'I need to look and dress sharp for this role.'}
                                                    onPress={() => this.selectItems(item, 'top')}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <MediumTitle
                            text={`Bottoms`}
                            style={{ marginHorizontal: WP('5'), marginTop: WP('15'), marginVertical: WP('5') }}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('3') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {
                                    bottoms.map((item, key) => {
                                        return (
                                            <View key={key} style={{ width: '33.33%', padding: 8 }}>
                                                <SelectItemCard
                                                    key={key}
                                                    title={item.name}
                                                    isSelected={item.checked}
                                                    placeholder={false}
                                                    imageURI={item.image}
                                                    description={'I need to look and dress sharp for this role.'}
                                                    onPress={() => this.selectItems(item, 'bottom')}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <MediumTitle
                            text={`Foot Wear`}
                            style={{ marginHorizontal: WP('5'), marginTop: WP('15'), marginVertical: WP('5') }}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('3') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {
                                    footwear.map((item, key) => {
                                        return (
                                            <View key={key} style={{ width: '33.33%', padding: 8 }}>
                                                <SelectItemCard
                                                    key={key}
                                                    title={item.name}
                                                    isSelected={item.checked}
                                                    placeholder={false}
                                                    imageURI={item.image}
                                                    description={'I need to look and dress sharp for this role.'}
                                                    onPress={() => this.selectItems(item, 'footwear')}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <MediumTitle
                            text={`Accessories`}
                            style={{ marginHorizontal: WP('5'), marginTop: WP('15'), marginVertical: WP('5') }}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('3') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {
                                    accessories.map((item, key) => {
                                        return (
                                            <View key={key} style={{ width: '33.33%', padding: 8 }}>
                                                <SelectItemCard
                                                    key={key}
                                                    title={item.name}
                                                    isSelected={item.checked}
                                                    placeholder={false}
                                                    imageURI={item.image}
                                                    description={'I need to look and dress sharp for this role.'}
                                                    onPress={() => this.selectItems(item, 'accessories')}
                                                //style={{}}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {
                    needs.length > 0 ?
                    <View style={{ height: WP('18'), width: WP('100'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors.white }}>
                    <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>
                        You've selected
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}> {packageRequest.packageRequestObj.needs.length} </Text>
                        items.
                    </Text>
                    <Button
                        title='NEXT'
                        onPress={() => this.next()}
                        style={{ height: WP('12'), width: WP('25'), marginHorizontal: WP('5') }}
                    />
                </View>
                :
                null
                }
            </View>
        );
    }
}

mapStateToProps = (state) => {
    return {
        packageRequest: state.packageRequestReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        PackageRequestObjAction: (params) => dispatch(PackageRequestObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectItem);
