import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, SmallText, QuizCard, Steps, Button } from '../../../../components';
import Toast from 'react-native-simple-toast';
import { WP, data } from '../../../../services';
import { styleQuizObj } from '../../../../store/actions';
import { styles } from './styles';
import { withNavigation } from 'react-navigation';

const colors = Object.values(data.member_settings_v7.en.style_profile_quiz.colors)
let title = data.member_settings_v7.en.style_profile_quiz.colors_question;

class PreferColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresher: false,
            colorState: []
        }
    }
    componentWillMount() {
        const { styleQuiz } = this.props;
        const { colorState } = this.state;
        if (styleQuiz.styleQuizObj.colors.length > 0) {
            styleQuiz.styleQuizObj.colors.forEach ( itemProp => {
                colors.forEach ( item => {
                    if ( itemProp === item.name ) {
                        item.checked = true;
                        colorState.push(item.name)
                    }
                })
            })
            // console.log('[colors Customise array] true',colors);
        } else {
            colors.forEach(item => {
                item.checked = false;
            })
            // console.log('[colors Customise array] false', colors);
        }
    }
    selectColors = async (color) => {
        const { colorState } = this.state;
        if (colorState.includes(color.name)) {
            var index = colorState.indexOf(color.name);
            if (index > -1) {
                colorState.splice(index, 1);
            }
            await this.selectItem(colorState)
            // marked checked
            colors.forEach(item => {
                if (item.name === color.name) {
                    item.checked = false;
                    this.setState({ refresher: false })
                }
            })
            // console.log('[Colors Customise array] true', colors);
        } else {
            colorState.push(color.name)
            await this.selectItem(colorState)
            // marked unchecked
            colors.forEach(item => {
                if (item.name === color.name) {
                    item.checked = true;
                    this.setState({ refresher: false })
                }
            })
            // console.log('[Colors Customise array] false', colors);
        }
    }
    selectItem = async (colorsList) => {
        const { styleQuizObjAction, styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        params.colors = colorsList;
        // console.log('===========================================================================================================')
        // console.log('[Colors.js] Colors obj edited', params)
        await styleQuizObjAction(params)
        // console.log('[Colors.js] Colors obj edited', styleQuiz.styleQuiz)
        // console.log('===========================================================================================================')
    }
    validate = () => {
        const { styleQuiz } = this.props;
        var params = styleQuiz.styleQuizObj
        if (params.colors.length === 0) {
            Toast.show('Please select any colour palette.')
        } else {
            this.props.navigation.push('PreferPattern')
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
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                        isStyleColored={true}
                        styleQuiz={true}  // chane the stepper text
                        isPreferenceColored={true}
                        isCheckStyle={true}
                        progress={WP('55')} //83 total , per head= 6.9 , current =34.5, fill = 45
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
                                colors.map((item, key) => {
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
                    </View>
                </ScrollView>
                <View style={{ height: WP('18'), width: WP('100'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'white' }}>
                    <View style={{ width: WP('65') }}>
                        {
                            styleQuiz.styleQuizObj.colors.length == 0 ?
                                <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>{`You have not selected any colour palette.`} </Text>
                                :
                                <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>
                                    You've selected
                                <Text style={{ marginHorizontal: WP('5'), fontSize: 13, fontWeight: 'bold' }}> {styleQuiz.styleQuizObj.colors.length} </Text>
                                    colour palette{styleQuiz.styleQuizObj.colors.length > 1? 's' : ''}.
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PreferColor));
