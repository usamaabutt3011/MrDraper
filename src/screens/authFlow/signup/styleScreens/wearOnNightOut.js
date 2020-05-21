import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, SmallText, DressCard, Steps } from '../../../../components';
import { WP, data } from '../../../../services';
import { signUpObj } from '../../../../store/actions';
import { styles } from './styleScreenStyles';
import { withNavigation } from 'react-navigation';

class wearOnNightOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount = async() => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "wearOnNightOut")
    }
    selectItem = async(item) => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        params.nightout_wear = item.name;
        console.log('===========================================================================================================')
        console.log('[wearOnNightOut.js] signup obj edited',params)
        await signUpObjAction(params, 'wearOnNightOut')
        console.log('[wearOnNightOut.js] signup obj edited',signup.signUpObj)
        console.log('===========================================================================================================')
        this.props.navigation.push('PreferencesStack')    
    }
    render() {
        const { } = this.props;
        const nightOutWear = Object.values(data.member_settings_v7.en.nightout_wear)
        let title = data.member_settings_v7.en.labels.nightout_wear;
        return (
            <View style={styles.container}>
                <Header
                    left={false}
                    onPressLeft={() => this.props.navigation.navigate('wearOnWeekend')}
                />
                <ScrollView 
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    >
                    <Steps 
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                        isStyleColored={true}
                        progress={WP('37')} //83 total , per head= 6.9 , current =34.5, fill = 45
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`${title.question} ${title.highlight}?`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select what you wear on nights out.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                nightOutWear.map((item, key) => {
                                    return (
                                        <DressCard
                                            key={key}
                                            placeholder={false}
                                            imageURI={item.image}
                                            title={item.name}
                                            description={item.description}
                                            //style={{}}
                                            onPress={()=> this.selectItem(item)}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(wearOnNightOut));
