import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { Header, LargeTitle, SmallText, BrandCard, Button, Steps } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { signUpObj } from '../../../../store/actions';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';

var brands = Object.values(data.member_settings_v7.en.all_brands)

class Brands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandState: [],
            refresher: false
        }
    }
  
    componentDidMount = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "Brands")
    }
    componentWillMount() {
        const { signup } = this.props;
        if (signup.signUpObj.brands.length > 0) {
            signup.signUpObj.brands.forEach ( itemProp => {
                brands.forEach ( item => {
                    if ( itemProp === item.name ) {
                        item.checked = true;
                        this.state.brandState.push(item.name)
                    }
                })
            })
            // console.log('[Brands Customise array] true',brands, this.state.brandState);
            // console.log('[Brands.js] ReduxArrayBrands',signup.signUpObj.brands);
        } else {
            brands.forEach(item => {
                item.checked = false;
            })
            // console.log('[Brands Customise array] false', brands);
        }
    }
    selectBrands = async (brand) => {
        const { brandState } = this.state;
        if (brandState.includes(brand.name)) {
            var index = brandState.indexOf(brand.name);
            if (index > -1) {
                brandState.splice(index, 1);
            }
            await this.selectItem(brandState)
            // marked checked
            brands.forEach(item => {
                if (item.name === brand.name) {
                    item.checked = false;
                    this.setState({ refresher: false })
                }
            })
            // console.log('[Brands Customise array] remove', brands);
        } else {
            brandState.push(brand.name)
            await this.selectItem(brandState)
            // marked unchecked
            brands.forEach(item => {
                if (item.name === brand.name) {
                    item.checked = true;
                    this.setState({ refresher: false })
                }
            })
            // console.log('[Brands Customise array] add', brands);
        }
    }
    selectItem = async (brandsList) => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        params.brands = brandsList; // local state
        // console.log('===========================================================================================================')
        // console.log('[brands.js] signup obj edited', params)
        await signUpObjAction(params, 'Brands')
        // console.log('[brands.js] signup obj edited', signup.signUpObj)
        // console.log('===========================================================================================================')
    }
    validate = () => {
        const { signup } = this.props;
        var params = signup.signUpObj
        if (params.brands.length === 0) {
            Toast.show('Please select any brand.')
        } else {
            this.props.navigation.push('Price')
        }
    }
    render() {
        const { signup } = this.props;
        let title = data.member_settings_v7.en.labels.brands;
        // console.log('[brans]',brands);
        return (
            <View style={styles.container}>
                <Header
                    left={false}
                    onPressLeft={() => this.props.navigation.push('wearOnNightOut')}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Steps
                        isCheckStyle={true}
                        isStyleColored={true}
                        isPreferenceColored={true}
                        progress={WP('51.9')} //83 total , per head= 6.9 , current =34.5, fill = 45
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`${title.question}?`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={title.small}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('3') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {
                                    brands.map((item, key) => {
                                        return (
                                            <View key={key} style={{ width: '33.33%', padding: 8 }}>
                                                <BrandCard
                                                    key={key}
                                                    title={'Casual'}
                                                    isSelected={item.checked}
                                                    placeholder={false}
                                                    imageURI={item.image}
                                                    description={'I need to look and dress sharp for this role.'}
                                                    onPress={() => this.selectBrands(item)}
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
                <View style={{ height: WP('18'), width: WP('100'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors.white }}>
                    <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>
                        You've selected
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}> {signup.signUpObj.brands.length} </Text>
                        brand{signup.signUpObj.brands.length > 1 ? 's':null}.
                    </Text>
                    <Button
                        title='NEXT'
                        onPress={() => this.validate()}
                        style={{ height: WP('12'), width: WP('25'), marginHorizontal: WP('5') }}
                    />
                </View>
            </View>
        );
    }
}


mapStateToProps = (state) => {
    return {
        signup: state.signup,
    }
}
mapDispatchToProps = dispatch => {
    return {
        signUpObjAction: (params, screen) => dispatch(signUpObj(params,screen)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Brands));
