import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, SmallText, QuizCard, Steps, Button } from '../../../../components';
import { WP, colors, data } from '../../../../services';
import { styleQuizObj } from '../../../../store/actions';
import Toast from 'react-native-simple-toast';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';

const patternsList = Object.values(data.member_settings_v7.en.style_profile_quiz.patterns)
let title = data.member_settings_v7.en.style_profile_quiz.patterns_question;

class PreferPattern extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresher: false,
            patternState: []
        }
    }
    componentWillMount() {
        const { styleQuiz } = this.props;
        const { patternState } = this.state;
        if (styleQuiz.styleQuizObj.patterns.length > 0) {
            styleQuiz.styleQuizObj.patterns.forEach ( itemProp => {
                patternsList.forEach ( item => {
                    if ( itemProp === item.name ) {
                        item.checked = true;
                        patternState.push(item.name)
                    }
                })
            })
            // console.log('[patternsList Customise array] true',patternsList);
        } else {
            patternsList.forEach(item => {
                item.checked = false;
            })
            console.log('[Patterns Customise array] false', patternsList);
        }
    }
    selectPatterns = async (pattern) => {
        const { patternState } = this.state;
        if (patternState.includes(pattern.name)) {
            var index = patternState.indexOf(pattern.name);
            if (index > -1) {
                patternState.splice(index, 1);
            }
            await this.selectItem(patternState)
            // marked checked
            patternsList.forEach(item => {
                if (item.name === pattern.name) {
                    item.checked = false;
                    this.setState({ refresher: false })
                }
            })
            console.log('[patterns Customise array] true', patternsList);
        } else {
            patternState.push(pattern.name)
            await this.selectItem(patternState)
            // marked unchecked
            patternsList.forEach(item => {
                if (item.name === pattern.name) {
                    item.checked = true;
                    this.setState({ refresher: false })
                }
            })
            console.log('[patterns Customise array] false', patternsList);
        }
    }
    selectItem = async (patternsList) => {
        const { styleQuizObjAction, styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        params.patterns = patternsList;
        console.log('===========================================================================================================')
        console.log('[Patterns.js] Patterns obj edited', params)
        await styleQuizObjAction(params)
        console.log('[Patterns.js] patterns obj edited', styleQuiz.styleQuizObj)
        console.log('===========================================================================================================')
    }
    validate = () => {
        const { styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        if (params.patterns.length === 0) {
            Toast.show('Please select any colour palette.')
        } else {
            this.props.navigation.push('NotesStack')
        }
    }
    render() {
        const { styleQuiz } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    left={true}
                    onPressLeft={() => this.props.navigation.navigate('ShirtsFit')}
                />
                <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Steps
                        isStyleColored={true}
                        isCheckStyle={true}
                        styleQuiz={true}  // chane the stepper text
                        isPreferenceColored={true}
                        progress={WP('65')} //83 total , per head= 6.9 , current =34.5, fill = 45
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
                        <View style={{ marginHorizontal: WP('5') }}>
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
                    </View>
                </ScrollView>
                <View style={{ height: WP('18'), width: WP('100'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors.white }}>
                    <View style={{ width: WP('65') }}>
                        {
                            styleQuiz.styleQuizObj.patterns.length == 0 ?
                                <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>{`Please select at least one.`} </Text>
                                :
                                <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>
                                    You've selected
                                <Text style={{ marginHorizontal: WP('5'), fontSize: 13, fontWeight: 'bold' }}> {styleQuiz.styleQuizObj.patterns.length} </Text>
                                    pattern{styleQuiz.styleQuizObj.patterns.length > 1 ? 's' : null}.
                                </Text>
                        }
                    </View>
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
        styleQuiz: state.styleQuiz,
    }
}
mapDispatchToProps = dispatch => {
    return {
        styleQuizObjAction: (params) => dispatch(styleQuizObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PreferPattern));
