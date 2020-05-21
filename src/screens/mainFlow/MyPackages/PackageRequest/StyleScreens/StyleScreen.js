import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WP, colors, data, appImages } from '../../../../../services';
import { connect } from 'react-redux';
import { Header, LargeTitle, NormalText, OccasionCard } from '../../../../../components';
import { packageRequest } from '../../../../../store/actions';
import { styles } from '../styles';

class Style extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [
                {
                    image: appImages.casualStyle,
                    title: 'Casual',
                    detail: 'The basics for everyday',
                    navigation: 'OccasionDetail'
                },
                {
                    image: appImages.trendyStyleMe,
                    title: 'Trendy',
                    detail: 'Style your basics with a modern twist of cool colours or patterns',
                    navigation: 'OccasionDetail'
                },
                {
                    image: appImages.smartCasualStyleMe,
                    title: 'Smart Casual',
                    detail: 'Dressed up jeans, polos & casual shirts for a chic look',
                    navigation: 'OccasionDetail'
                },
                {
                    image: appImages.formalStyle,
                    title: 'Formal',
                    detail: 'Sharp looks for important events & occasions',
                    navigation: 'OccasionDetail'
                },
            ]
        }
    }

    render() {
        const { shops } = this.state;
        const { packageRequestObj } = this.props.packageRequest;
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
                    <LargeTitle
                        text={`What's Your Style?`}
                        style={{ marginHorizontal: WP('5'), marginVertical: WP('5'), marginTop: WP('7') }}
                    />
                    <NormalText
                        text={'Select your style'}
                        style={{ marginHorizontal: WP('5'), color: colors.black, marginBottom: WP('5') }}
                    />
                    <View style={{ flex: 1, marginTop: WP('2') }}>
                        {
                            this.state.shops.map((item,key)=>{
                                return(
                                    <OccasionCard
                                        key={key}
                                        title={item.title}
                                        detail={item.detail}
                                        image={item.image}
                                        style={{ alignSelf: 'center' }}
                                        onPress={() => {
                                            packageRequestObj.package_name = item.title
                                            this.props.navigation.push(item.navigation,{ parent: 'Style' ,occasion: item.title })
                                        }}
                                    />
                                )
                            })
                        }
                    </View>
                </ScrollView>
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
        packageRequestAction: (params) => dispatch(packageRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Style);
