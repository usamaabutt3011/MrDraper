import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, SmallText, DressCard, Steps } from '../../../../components';
import { WP, data } from '../../../../services';
import { styleQuizObj } from '../../../../store/actions';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';

class ShirtsFit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    selectItem = async(item) => {
        const { styleQuizObjAction, styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        params.shirts_fit = item.name;
        console.log('===========================================================================================================')
        console.log('[ShirtsFit.js] signup obj edited',params)
        await styleQuizObjAction(params)
        console.log('[ShirtsFit.js] signup obj edited',styleQuiz.styleQuiz)
        console.log('===========================================================================================================')
        this.props.navigation.push('PantsFit')    
    }
    render() {
        const { } = this.props;
        const nightOutWear = Object.values(data.member_settings_v7.en.style_profile_quiz.shirts_fit)
        let title = data.member_settings_v7.en.style_profile_quiz.shirts_fit_question;
        return (
            <View style={styles.container}>
                <Header
                    left={false}
                    onPressLeft={() => this.props.navigation.navigate('ThankyouCall')}
                />
                <ScrollView 
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    >
                    <Steps 
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                        isStyleColored={true}
                        styleQuiz={true}  // chane the stepper text
                        progress={WP('22')} //83 total , per head= 6.9 , current =34.5, fill = 45
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`${title.question}?`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select your prefered fit.'}
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
        styleQuiz: state.styleQuiz,
    }
}
mapDispatchToProps = dispatch => {
    return {
        styleQuizObjAction: (params) => dispatch(styleQuizObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ShirtsFit));
