import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { Header, ProfileHeader, ProfileHeaderTabs, LargeTitle, MediumTitle, SmallText, BrandCard, QuizCard, PriceCard, DressCard, Button } from '../../../../../components';
import { WP, colors, data, appImages } from '../../../../../services';
import { myPreferencesObj, updatePreferences, saveSignupResponse } from '../../../../../store/actions';
import { styles } from './styles';

const yml = data.member_settings_v7.en.style_profile_quiz;

const brands = Object.values(data.member_settings_v7.en.all_brands);
const pricing = data.member_settings_v7.en.labels.budgets;
const colorsList = Object.values(data.member_settings_v7.en.style_profile_quiz.colors);
const patternsList = Object.values(data.member_settings_v7.en.style_profile_quiz.patterns)
const pantsFit = Object.values(data.member_settings_v7.en.style_profile_quiz.pants_fit)
const shirtsFit = Object.values(data.member_settings_v7.en.style_profile_quiz.shirts_fit)

const myPreferencesArr = [
    {
        tab: 'Brands',
        checked: true,
    },
    {
        tab: 'Budgets',
        checked: false
    },
    {
        tab: 'Colors',
        checked: false
    },
    {
        tab: 'Patterns',
        checked: false
    },
    {
        tab: 'Pants Fit',
        checked: false
    },
    {
        tab: 'Shirts Fit',
        checked: false
    }
];

class MyPreferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaved: true,
            //Brands
            brandState: [],
            refresher: false,
            //Colours
            colorState: [],
            //Patterns
            patternState: [],
            //isStyle/Comfort
            isStyle: false,
            isComfort: true,
            //Prices
            isPricyShirt: false,
            isGoodShirt: false,
            isPricyBlazer: false,
            isGoodBlazer: false,
            isPricyPant: false,
            isGoodPant: false,
            isPricyShoe: false,
            isGoodShoe: false,
            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,
            counter: 0,
        }

        //Initial setUp Brands
        brands.forEach(item => {
            item.checked = false;
        })
        //Initial SetUp Colors
        colorsList.forEach(item => {
            item.checked = false
        })
        //Initial SetUp Patterns
        patternsList.forEach(item => {
            item.checked = false
        })
        //Initial SetUp PantsFit
        pantsFit.forEach(item => {
            item.isSelect = false
        })
        //Initial SetUp ShirtsFit
        shirtsFit.forEach(item => {
            item.isSelect = false
        })
    }
    componentWillMount = async () => {
        const { userRes, myPreferencesObjAction, updatePreferenceRes } = this.props;
        let { brandState, colorState, patternState } = this.state;

        // console.log('[MyPreferences.js] componentWillMount Props are: ', this.props);
        var params = updatePreferenceRes.myPreferencesObj

        //Brands Section==============================================
        brands.forEach(item => {
            item.checked = false;
        })
        if (userRes.userProfile.result.brands.length > 0) {
            brandState.length = 0;
            userRes.userProfile.result.brands.forEach(itemProp => {
                brands.forEach(item => {
                    if (itemProp === item.name) {
                        item.checked = true;
                        brandState.push(item.name)
                    }
                })
            })
            this.setState({ brandState });
            await this.selectItem(brandState)
            // console.log('[Brands Customise array] true', brands);
        }

        //Prices Section==============================================
        if (userRes.userProfile.result.shirts_budget == "expensive") {
            this.setState({
                isPricyShirt: true, isGoodShirt: false
            }, () => {
                params.shirts_budget = 'expensive';
            })
        } else {
            this.setState({
                isPricyShirt: false, isGoodShirt: true
            }, () => {
                params.shirts_budget = userRes.userProfile.result.shirts_budget
            })
        }
        if (userRes.userProfile.result.blazers_budget == "expensive") {
            this.setState({
                isPricyBlazer: true, isGoodBlazer: false
            }, () => {
                params.blazers_budget = 'expensive'
            })
        } else {
            this.setState({
                isPricyBlazer: false, isGoodBlazer: true
            }, () => {
                params.blazers_budget = userRes.userProfile.result.blazers_budget
            })
        }
        if (userRes.userProfile.result.jeans_budget == "expensive") {
            this.setState({
                isPricyPant: true, isGoodPant: false
            }, () => {
                params.jeans_budget = 'expensive';
            })
        } else {
            this.setState({
                isPricyPant: false, isGoodPant: true
            }, () => {
                params.jeans_budget = userRes.userProfile.result.jeans_budget;
            })
        }
        if (userRes.userProfile.result.shoes_budget == "expensive") {
            this.setState({
                isPricyShoe: true, isGoodShoe: false
            }, () => {
                params.shoes_budget = 'expensive';
            })
        } else {
            this.setState({
                isPricyShoe: false, isGoodShoe: true
            }, () => {
                params.shoes_budget = userRes.userProfile.result.shoes_budget;
            })
        }

        //Colors Section==============================================
        let colours = userRes.userProfile.result.liked_colors;
        colorsList.forEach(item => {
            item.checked = false;
        })
        if (colours.length > 0) {
            colorState.length = 0;
            colours.forEach(itemProp => {
                colorsList.forEach(item => {
                    if (itemProp === item.name) {
                        item.checked = true;
                        colorState.push(item.name)
                    }
                })
            })
            this.setState({ colorState });
            await this.selectColorItem(colorState)
        }
        //Patterns Section==============================================
        let patterns = userRes.userProfile.result.liked_patterns;
        patternsList.forEach(item => {
            item.checked = false;
        })
        if (patterns.length > 0) {
            patternState.length = 0;
            patterns.forEach(itemProp => {
                patternsList.forEach(item => {
                    if (itemProp === item.name) {
                        item.checked = true;
                        patternState.push(item.name)
                    }
                })
            })
            this.setState({ patternState })
            await this.selectPatternsItem(patternState)
        }
        // PantsFit Section=============================================
        pantsFit.forEach(item => {
            if (item.name == userRes.userProfile.result.pants_fit) {
                item.isSelect = true
                this.setState({
                    refresh: false
                }, () => {
                    params.pants_fit = userRes.userProfile.result.pants_fit;
                })
            } else {
                item.isSelect = false
            }
        })
        // ShirtsFit Section=============================================
        shirtsFit.forEach(item => {
            if (item.name == userRes.userProfile.result.shirts_fit) {
                item.isSelect = true
                this.setState({
                    refresh: false
                }, () => {
                    params.shirts_fit = userRes.userProfile.result.shirts_fit;
                })
            } else {
                item.isSelect = false
            }
        })
        //Style/Comfort==================================================
        if (userRes.userProfile.result.style_or_comfort == "Comfort") {
            this.setState({
                isComfort: true,
                isStyle: false
            }, () => {
                params.style_or_comfort = 'Comfort';
            })
        } else {
            this.setState({
                isComfort: false,
                isStyle: true
            }, () => {
                params.style_or_comfort = 'Style';
            })
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
                    this.setState({ refresher: true })
                }
            })
        } else {
            brandState.push(brand.name)
            await this.selectItem(brandState)
            // marked unchecked
            brands.forEach(item => {
                if (item.name === brand.name) {
                    item.checked = true;
                    this.setState({ refresher: true })
                }
            })
        }
    }
    selectItem = async (brandsList) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        var params = updatePreferenceRes.myPreferencesObj
        params.brands = brandsList; // local state
        await myPreferencesObjAction(params)
    }
    //Prices Section===================================================================
    _toggleShirt = async (label, budget) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        if (label == 'pricy') {
            await this.setState({ isPricyShirt: true, isGoodShirt: false })
        } else {
            if (label === 'good')
                await this.setState({ isPricyShirt: false, isGoodShirt: true })
        }
        var params = updatePreferenceRes.myPreferencesObj
        params.shirts_budget = label == 'pricy' ? 'expensive' : budget;
        await myPreferencesObjAction(params)
    }
    _toggleBlazer = async (label, budget) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        if (label == 'pricy') {
            this.setState({ isPricyBlazer: true, isGoodBlazer: false })
        } else {
            if (label === 'good')
                this.setState({ isPricyBlazer: false, isGoodBlazer: true })
        }
        var params = updatePreferenceRes.myPreferencesObj
        params.blazers_budget = label == 'pricy' ? 'expensive' : budget;
        await myPreferencesObjAction(params)
    }
    _togglePant = async (label, budget) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        if (label == 'pricy') {
            this.setState({ isPricyPant: true, isGoodPant: false })
        } else {
            if (label === 'good')
                this.setState({ isPricyPant: false, isGoodPant: true })
        }
        var params = updatePreferenceRes.myPreferencesObj
        params.jeans_budget = label == 'pricy' ? 'expensive' : budget;
        await myPreferencesObjAction(params)
    }
    _toggleShoe = async (label, budget) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        if (label == 'pricy') {
            this.setState({ isPricyShoe: true, isGoodShoe: false })
        } else {
            if (label === 'good')
                this.setState({ isPricyShoe: false, isGoodShoe: true })
        }
        var params = updatePreferenceRes.myPreferencesObj
        params.shoes_budget = label == 'pricy' ? 'expensive' : budget;
        await myPreferencesObjAction(params)
    }
    //Colors Section====================================================================
    selectColors = async (color) => {
        const { colorState } = this.state;
        if (colorState.includes(color.name)) {
            var index = colorState.indexOf(color.name);
            if (index > -1) {
                colorState.splice(index, 1);
            }
            await this.selectColorItem(colorState)
            // marked checked
            colorsList.forEach(item => {
                if (item.name === color.name) {
                    item.checked = false;
                    this.setState({ refresher: true })
                }
            })
            console.log('[Colors Customise array] true', colorsList);
        } else {
            colorState.push(color.name)
            await this.selectColorItem(colorState)
            // marked unchecked
            colorsList.forEach(item => {
                if (item.name === color.name) {
                    item.checked = true;
                    this.setState({ refresher: true })
                }
            })
            console.log('[Colors Customise array] false', colorsList);
        }
    }
    selectColorItem = async (colorsList) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        var params = updatePreferenceRes.myPreferencesObj
        params.liked_colors = colorsList;
        await myPreferencesObjAction(params)
    }
    //Patterns Section==================================================================
    selectPatterns = async (pattern) => {
        const { patternState } = this.state;
        if (patternState.includes(pattern.name)) {
            var index = patternState.indexOf(pattern.name);
            if (index > -1) {
                patternState.splice(index, 1);
            }
            await this.selectPatternsItem(patternState)
            // marked checked
            patternsList.forEach(item => {
                if (item.name === pattern.name) {
                    item.checked = false;
                    this.setState({ refresher: true })
                }
            })
            console.log('[patterns Customise array] true', patternsList);
        } else {
            patternState.push(pattern.name)
            await this.selectPatternsItem(patternState)
            // marked unchecked
            patternsList.forEach(item => {
                if (item.name === pattern.name) {
                    item.checked = true;
                    this.setState({ refresher: true })
                }
            })
            console.log('[patterns Customise array] false', patternsList);
        }
    }
    selectPatternsItem = async (patternsList) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        var params = updatePreferenceRes.myPreferencesObj
        params.liked_patterns = patternsList;
        await myPreferencesObjAction(params)
    }

    // PantsFit and ShirtsFit Sections=============================================
    selectCard = async (value, label) => {
        const { userRes } = this.props;
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        var params = updatePreferenceRes.myPreferencesObj
        switch (label) {
            case 'pants':
                pantsFit.forEach(item => {
                    if (item.name == value.name) {
                        item.isSelect = true
                        params.pants_fit = value.name;
                        this.setState({
                            refresh: true
                        })
                    } else {
                        item.isSelect = false
                    }
                })
                break;
            case 'shirts':
                shirtsFit.forEach(item => {
                    if (item.name == value.name) {
                        item.isSelect = true
                        params.shirts_fit = value.name;
                        this.setState({
                            refresh: true
                        })
                    } else {
                        item.isSelect = false
                    }
                })
                break;
            default:
                break;
        }
    }

    //Comfort/Style Section========================================================
    toggleComfortBtn = async (label) => {
        const { myPreferencesObjAction, updatePreferenceRes } = this.props;
        var params = updatePreferenceRes.myPreferencesObj
        if (label == 'style') {
            params.style_or_comfort = 'Style';
            this.setState({
                isStyle: true,
                isComfort: false
            })
        } else {
            params.style_or_comfort = 'Comfort';
            this.setState({
                isStyle: false,
                isComfort: true
            })
        }
    }
    updatePreferences = async () => {
        const { updatePreferencesAction, updatePreferenceRes, userRes } = this.props;
        var params = updatePreferenceRes.myPreferencesObj;
        params.user_id = userRes.userProfile.result.user_id;
        await updatePreferencesAction(params);
    }
    componentWillReceiveProps = async (nextProps) => {
        const { updatePreferenceRes, userRes, saveSignupResponseAction } = nextProps;

        if (updatePreferenceRes.isSuccess) {
            // console.log('[Preference.js] componentWillReceiveProps props ====:', nextProps);
            updatePreferenceRes.isSuccess = false;
            // Refresh the Details screen value
            userRes.userProfile.result.brands = [...updatePreferenceRes.myPreferencesObj.brands];
            userRes.userProfile.result.jeans_budget = updatePreferenceRes.myPreferencesObj.jeans_budget;
            userRes.userProfile.result.shoes_budget = updatePreferenceRes.myPreferencesObj.shoes_budget;
            userRes.userProfile.result.shirts_budget = updatePreferenceRes.myPreferencesObj.shirts_budget;
            userRes.userProfile.result.blazers_budget = updatePreferenceRes.myPreferencesObj.blazers_budget;
            userRes.userProfile.result.liked_colors = [...updatePreferenceRes.myPreferencesObj.liked_colors];
            userRes.userProfile.result.liked_patterns = [...updatePreferenceRes.myPreferencesObj.liked_patterns];
            userRes.userProfile.result.pants_fit = updatePreferenceRes.myPreferencesObj.pants_fit;
            userRes.userProfile.result.shirts_fit = updatePreferenceRes.myPreferencesObj.shirts_fit;
            userRes.userProfile.result.style_or_comfort = updatePreferenceRes.myPreferencesObj.style_or_comfort;
            
            await saveSignupResponseAction(userRes.userProfile)
            // console.log('[Preference.js] componentWillReceiveProps Update userRes====:', userRes.userProfile);
            Toast.show(updatePreferenceRes.myPreferencesRes.message)
        } else {
            //
        }
    }
    headerTabSelection = (item) => {
        myPreferencesArr.forEach(value => {
            if (item.tab == value.tab) {
                value.checked = true
                this.setState({ refresh: true })
            } else {
                value.checked = false
            }
        });
        switch (item.tab) {
            case 'Brands':
                scrollYPos = this.state.screenHeight * 0;
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Budgets':
                scrollYPos = WP('175');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Colors':
                scrollYPos = WP('420');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Patterns':
                scrollYPos = WP('595');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Pants Fit':
                scrollYPos = WP('895');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;
            case 'Shirts Fit':
                scrollYPos = WP('1090');
                this.scroller.scrollTo({ x: 0, y: scrollYPos });
                break;

            default:
                break;
        }
    }
    discard = () => {
        let { userRes, updatePreferenceRes } = this.props;

        updatePreferenceRes.myPreferencesObj.brands = userRes.userProfile.result.brands;
        updatePreferenceRes.myPreferencesObj.jeans_budget = userRes.userProfile.result.jeans_budget;
        updatePreferenceRes.myPreferencesObj.shoes_budget = userRes.userProfile.result.shoes_budget;
        updatePreferenceRes.myPreferencesObj.shirts_budget = userRes.userProfile.result.shirts_budget;
        updatePreferenceRes.myPreferencesObj.blazers_budget = userRes.userProfile.result.blazers_budget;
        updatePreferenceRes.myPreferencesObj.liked_colors = userRes.userProfile.result.liked_colors;
        updatePreferenceRes.myPreferencesObj.liked_patterns = userRes.userProfile.result.liked_patterns;
        updatePreferenceRes.myPreferencesObj.pants_fit = userRes.userProfile.result.pants_fit;
        updatePreferenceRes.myPreferencesObj.shirts_fit = userRes.userProfile.result.shirts_fit;
        updatePreferenceRes.myPreferencesObj.style_or_comfort = userRes.userProfile.result.style_or_comfort;

        Toast.show('Your changes have been discarded.')
        // this.props.navigation.replace('MyPackages')
        this.componentWillMount();
    }
    changeDetacted() {
        const { userRes, updatePreferenceRes } = this.props;
        if (userRes.userProfile) {
            let previousValues = userRes.userProfile.result;
            let newChangedValues = updatePreferenceRes.myPreferencesObj
            // console.log('MyPrefereneceStates==========:',previousValues,newChangedValues);
            if (Object.keys(previousValues).length) {
                let detacted = false;
                let matchSubArray = false;
                Object.keys(previousValues).forEach(key => {
                    if (newChangedValues[key] && Array.isArray(newChangedValues[key])) {
                        if (previousValues[key].length !== newChangedValues[key].length) {
                            matchSubArray = true;
                        } else {
                            previousValues[key].forEach(element => {
                                if (!newChangedValues[key].includes(element)) {
                                    matchSubArray = true;
                                }
                            });
                        }
                    }
                    else if (newChangedValues[key] && previousValues[key] && previousValues[key].toString() !== newChangedValues[key].toString()) {
                        detacted = true;
                        // console.log('MyPreferenece==========:', key, previousValues[key], newChangedValues[key]);
                    }
                });
                return detacted || matchSubArray;
            } else {
                return true;
            }
        }
    }
    render() {
        const { updatePreferenceRes } = this.props;
        const { isStyle, isComfort, counter } = this.state;
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
                        title={`My Preferences`}
                        image={appImages.myPreferences}
                    />
                    <ProfileHeaderTabs
                        tabs={myPreferencesArr}
                        onPress={(item) => {
                            this.headerTabSelection(item)
                        }}
                        containerStyle={{ zIndex: 6 }}
                    />
                    <View style={{ height: WP('10') }} />
                    <View style={{ flex: 1 }}>
                        <MediumTitle
                            text={`Brands`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={`Select the brands you like`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View
                            onLayout={(event) => {
                                var { x, y, width, height } = event.nativeEvent.layout;
                                console.log('RunTime Height Width: ', x, y, width, height);
                            }}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('3') }}>
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
                        <View style={{ height: WP('25'), width: WP('80'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                            <Text style={{ fontSize: 14, color: colors.lightGrey, marginHorizontal: WP('3') }}>x</Text>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                        </View>
                        <MediumTitle
                            text={`Price Points`}
                            style={{ marginHorizontal: WP(5), marginBottom: WP('5') }}
                        />
                        <SmallText
                            text={`Select if you’re comfortable with our price points`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), zIndex: 1 }}>
                            <PriceCard
                                title={pricing.shirts}
                                price={pricing.shirts_budget}
                                isPricy={this.state.isPricyShirt}
                                isGood={this.state.isGoodShirt}
                                onPress={(value) => this._toggleShirt(value, pricing.shirts_budget)}
                            //style={{}}
                            />
                            <PriceCard
                                title={pricing.blazers}
                                price={pricing.blazers_budget}
                                isPricy={this.state.isPricyBlazer}
                                isGood={this.state.isGoodBlazer}
                                onPress={(value) => this._toggleBlazer(value, pricing.blazers_budget)}
                            //style={{}}
                            />
                            <PriceCard
                                title={pricing.pants}
                                price={pricing.pants_budget}
                                isPricy={this.state.isPricyPant}
                                isGood={this.state.isGoodPant}
                                onPress={(value) => this._togglePant(value, pricing.pants_budget)}
                            //style={{}}
                            />
                            <PriceCard
                                title={pricing.shoes}
                                price={pricing.shoes_budgets}
                                isPricy={this.state.isPricyShoe}
                                isGood={this.state.isGoodShoe}
                                onPress={(value) => this._toggleShoe(value, pricing.shoes_budgets)}
                            //style={{}}
                            />
                        </View>
                        <View style={{ height: WP('25'), width: WP('80'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                            <Text style={{ fontSize: 14, color: colors.lightGrey, marginHorizontal: WP('3') }}>x</Text>
                            <View style={{ height: WP('0.1'), width: WP('20'), backgroundColor: colors.lightGrey }} />
                        </View>
                        <MediumTitle
                            text={`Colors`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={`Select the colors you like`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), zIndex: 2 }}>
                            {
                                colorsList.map((item, key) => {
                                    return (
                                        <QuizCard
                                            key={key}
                                            title={item.name}
                                            placeholder={false}
                                            imageURI={item.image}
                                            isSelected={item.checked}
                                            description={item.description}
                                            onPress={() => this.selectColors(item)}
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
                        <MediumTitle
                            text={`Patterns`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={`Select the patterns you like`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), zIndex: 3 }}>
                            {
                                patternsList.map((item, key) => {
                                    return (
                                        <QuizCard
                                            key={key}
                                            title={item.name}
                                            placeholder={false}
                                            imageURI={item.image}
                                            isSelected={item.checked}
                                            description={item.description}
                                            onPress={() => this.selectPatterns(item)}
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
                        <MediumTitle
                            text={`Pants Fit`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select fitting for your pants.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', zIndex: 4, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                pantsFit.map((item, key) => {
                                    return (
                                        <DressCard
                                            key={key}
                                            placeholder={false}
                                            imageURI={item.image}
                                            isSelected={item.isSelect}
                                            title={item.name}
                                            description={item.description}
                                            onPress={() => this.selectCard(item, 'pants')}
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
                        <MediumTitle
                            text={`Shirts Fit`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select fitting for your shirts.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', zIndex: 5, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                shirtsFit.map((item, key) => {
                                    return (
                                        <DressCard
                                            key={key}
                                            placeholder={false}
                                            imageURI={item.image}
                                            isSelected={item.isSelect}
                                            title={item.name}
                                            description={item.description}
                                            onPress={() => this.selectCard(item, 'shirts')}
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
                        <MediumTitle
                            text={`${yml.style_comfort.question} ?`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select fitting for your shirts.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={styles.twoButtonsContainer}>
                            <Button
                                title={yml.style_comfort.style}
                                titleStyle={{ color: isStyle ? colors.white : colors.black }}
                                style={[styles.buttonStyle, isStyle ? { backgroundColor: colors.black } : { backgroundColor: 'transparent' }]}
                                onPress={() => this.toggleComfortBtn('style')}
                            />
                            <Button
                                title={yml.style_comfort.comfort}
                                titleStyle={{ color: isComfort ? colors.white : colors.black }}
                                style={[styles.buttonStyle, isComfort ? { backgroundColor: colors.black } : { backgroundColor: 'transparent' }]}
                                onPress={() => this.toggleComfortBtn('comfort')}
                            />
                        </View>
                    </View>
                </ScrollView>
                {this.changeDetacted() ?
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
                                onPress={() => this.updatePreferences()}
                                showLoader={updatePreferenceRes.loading}
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
        signup: state.signup,
        userRes: state.login,
        styleQuiz: state.styleQuiz,
        updatePreferenceRes: state.updatePreferencesReducer,
    }
}
mapDispatchToProps = dispatch => {
    return {
        signUpObjAction: (params) => dispatch(signUpObj(params)),
        myPreferencesObjAction: (params) => dispatch(myPreferencesObj(params)),
        updatePreferencesAction: (params) => dispatch(updatePreferences(params)),
        saveSignupResponseAction: (value) => dispatch(saveSignupResponse(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPreferences);
