import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { Header, LargeTitle, Steps, PriceCard, Button } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { signUpObj } from '../../../../store/actions';
import { styles } from './styles';
class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPricyShirt: false,
            isGoodShirt: false,
            isPricyBlazer: false,
            isGoodBlazer: false,
            isPricyPant: false,
            isGoodPant: false,
            isPricyShoe: false,
            isGoodShoe: false,
            message: 'Choose an option to continue.'
        }
    }
    componentDidMount = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "Price")
    }
    componentWillMount = async() => {
        const { signUpObjAction, signup } = this.props;
        const { isPricyShirt, isGoodShirt, isPricyBlazer, isGoodBlazer, isPricyPant, isGoodPant, isPricyShoe, isGoodShoe } = this.state;
        var params = signup.signUpObj;
        
        if ( params.shirts_budget == 'expensive' ) {
            this.setState({ isPricyShirt: true, isGoodShirt: false })
        } else {
            if (params.shirts_budget == "200-500") {
                this.setState({ isPricyShirt: false ,isGoodShirt: true })                
            } 
        }
        if (params.blazers_budget == 'expensive') {
            this.setState({ isPricyBlazer: true, isGoodBlazer: false })                    
        } else {
            if (params.blazers_budget == "600-1500") {
                this.setState({ isPricyBlazer: false, isGoodBlazer: true })                        
            } 
        }
        if (params.jeans_budget == 'expensive') {
            this.setState({ isPricyPant: true, isGoodPant: false })                            
        } else {
            if (params.jeans_budget == "250-500") {
                this.setState({ isPricyPant: false, isGoodPant: true })                                
            } 
        }
        if (params.shoes_budget == 'expensive') {
            this.setState({ isPricyShoe: true, isGoodShoe: false })                                    
        } else {
            if (params.shoes_budget == "500-1,500") {
                this.setState({ isPricyShoe: false, isGoodShoe: true })                                        
            } 
        }
    }
    _toggleShirt = async(label, budget) => {
        const { signUpObjAction, signup } = this.props;
        const { isPricyShirt, isGoodShirt } = this.state;
        if ( label == 'pricy' ) {
            await this.setState({ isPricyShirt: true, isGoodShirt: false })
        } else {
            if ( label === 'good' ) 
                await this.setState({ isPricyShirt: false, isGoodShirt: true })
        }
        var params = signup.signUpObj
        params.shirts_budget = label == 'pricy' ? 'expensive' : budget;
        console.log('==================================================================================================',isPricyShirt,isGoodShirt)
        console.log('[Price.js] signup obj edited',params)
        await signUpObjAction(params, "Price")
        console.log('[Price.js] signup obj edited',signup.signUpObj)
        console.log('===========================================================================================================')
    }
    _toggleBlazer = async(label,budget) => {
        const { signUpObjAction, signup } = this.props;
        const { isPricyBlazer, isGoodBlazer } = this.state;
        if ( label == 'pricy' ) {
            this.setState({ isPricyBlazer: true, isGoodBlazer: false })
        } else {
            if ( label === 'good' ) 
                 this.setState({ isPricyBlazer: false, isGoodBlazer: true })
        }
        var params = signup.signUpObj
        params.blazers_budget = label == 'pricy' ? 'expensive' : budget;
        console.log('===========================================================================================================')
        console.log('[Price.js] signup obj edited',params)
        await signUpObjAction(params, "Price")
        console.log('[Price.js] signup obj edited',signup.signUpObj)
        console.log('===========================================================================================================')
    }
    _togglePant = async(label,budget) => {
        const { signUpObjAction, signup } = this.props;
        const { isPricyPant, isGoodPant } = this.state;
        if ( label == 'pricy' ) {
            this.setState({ isPricyPant: true, isGoodPant: false })
        } else {
            if ( label === 'good' ) 
                 this.setState({ isPricyPant: false, isGoodPant: true })
        }
        var params = signup.signUpObj
        params.jeans_budget = label == 'pricy' ? 'expensive' : budget;
        console.log('===========================================================================================================')
        console.log('[Price.js] signup obj edited',params)
        await signUpObjAction(params, "Price")
        console.log('[Price.js] signup obj edited',signup.signUpObj)
        console.log('===========================================================================================================')
    }
    _toggleShoe = async(label,budget) => {
        const { signUpObjAction, signup } = this.props;
        const { isPricyPant, isGoodPant } = this.state;
        if ( label == 'pricy' ) {
            this.setState({ isPricyShoe: true, isGoodShoe: false })
        } else {
            if ( label === 'good' ) 
                 this.setState({ isPricyShoe: false, isGoodShoe: true })
        }
        var params = signup.signUpObj
        params.shoes_budget = label == 'pricy' ? 'expensive' : budget;
        console.log('===========================================================================================================')
        console.log('[Price.js] signup obj edited',params)
        await signUpObjAction(params, "Price")
        console.log('[Price.js] signup obj edited',signup.signUpObj)
        console.log('===========================================================================================================')
    }
 
    validate = () => {
        const { signup } = this.props;
        var params = signup.signUpObj        
        if (params.shirts_budget == '') {
            // Toast.show('Please give your opinion for shirts price.')
            this.setState({ message: 'Choose an option for shirts to continue.' })
        } else {
            if (params.blazers_budget == '') {
                // Toast.show('Please give your opinion for blazer price.')
                this.setState({ message: 'Choose an option for blazers to continue.' })
            } else {
                if (params.jeans_budget == '') {
                    // Toast.show('Please give your opinion for pants price.')
                    this.setState({ message: 'Choose an option for pants to continue.' })
                } else {
                    if (params.shoes_budget == '') {
                        // Toast.show('Please give your opinion for shoes price.')
                        this.setState({ message: 'Choose an option for shoes to continue.' })
                    } else {
                        this.props.navigation.push('Height')   
                    }
                }
            }
        }
    }
    render() {
        const { } = this.props;
        const pricing = data.member_settings_v7.en.labels.budgets;
        return (
            <View style={styles.container}>
                <Header
                    left={false}
                    onPressLeft={() => this.props.navigation.goBack()}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Steps
                        isCheckStyle={true}
                        isStyleColored={true}
                        isPreferenceColored={true}
                        progress={WP('58.8')} //83 total , per head= 6.9 , current =58.8
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`${pricing.question} ${pricing.highlight}?`}
                            style={{ marginHorizontal: WP(5), marginBottom: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <PriceCard
                                title={pricing.shirts}
                                price={pricing.shirts_budget}
                                isPricy={this.state.isPricyShirt}
                                isGood={this.state.isGoodShirt}
                                onPress={(value)=> this._toggleShirt(value,pricing.shirts_budget) }
                                //style={{}}
                            />
                            <PriceCard
                                title={pricing.blazers}
                                price={pricing.blazers_budget}
                                isPricy={this.state.isPricyBlazer}
                                isGood={this.state.isGoodBlazer}
                                onPress={(value)=> this._toggleBlazer(value,pricing.blazers_budget) }
                                //style={{}}
                            />
                            <PriceCard
                                title={pricing.pants}
                                price={pricing.pants_budget}
                                isPricy={this.state.isPricyPant}
                                isGood={this.state.isGoodPant}
                                onPress={(value)=> this._togglePant(value,pricing.pants_budget) }
                                //style={{}}
                            />
                            <PriceCard
                                title={pricing.shoes}
                                price={pricing.shoes_budgets}
                                isPricy={this.state.isPricyShoe}
                                isGood={this.state.isGoodShoe}
                                onPress={(value)=> this._toggleShoe(value,pricing.shoes_budgets) }
                                //style={{}}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ height: WP('18'), width: WP('100'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors.white }}>
                    <Text style={{ marginLeft: WP('5'), width: WP('60'), fontSize: 13 }}>
                        {this.state.message}
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

export default connect(mapStateToProps, mapDispatchToProps)(Price);
