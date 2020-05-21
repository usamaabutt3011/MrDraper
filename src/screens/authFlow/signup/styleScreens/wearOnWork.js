import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, LargeTitle, SmallText, DressCard, Steps } from '../../../../components';
import { WP, data } from '../../../../services';
import { styles } from './styleScreenStyles';
import { signUpObj } from '../../../../store/actions';

const workWear = Object.values(data.member_settings_v7.en.work_wear)

class wearOnWork extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount = async() => {
        const values = Object.values(data.member_settings_v7.en.work_wear)
        // console.log(values) // [28, 17, 54]
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        await signUpObjAction(params, "wearOnWork")
    }
    selectItem = async(item) => {
        const { signUpObjAction, signup } = this.props;
        var params = signup.signUpObj
        params.work_wear = item.name;
        console.log('===========================================================================================================')
        console.log('[wearOnWork.js] signup obj edited',params)
        await signUpObjAction(params)
        console.log('[wearOnWork.js] signup obj edited',signup.signUpObj)
        console.log('===========================================================================================================')
        this.props.navigation.push('wearOnWeekend')
    }
    render() {
        const { } = this.props;
        let title = data.member_settings_v7.en.labels.work_wear;
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
                        style={{ alignSelf: 'center', marginTop: WP('5') }}
                        isStyleColored={true}
                        progress={WP('20.7')} //83 total , per head= 6.9
                    />
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`${title.question} ${title.highlight}?`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={'Select what you wear for work.'}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <View style={{ marginHorizontal: WP('5'), flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            {
                                workWear.map((item, key) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(wearOnWork);
