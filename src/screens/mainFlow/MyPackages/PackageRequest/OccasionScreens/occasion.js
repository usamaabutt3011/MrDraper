import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WP, colors, data, appImages } from '../../../../../services';
import { Header, LargeTitle, NormalText, OccasionCard } from '../../../../../components';
import { connect } from 'react-redux';
import { packageRequest } from '../../../../../store/actions';
import { styles } from '../styles';

class ByOccasion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [
                {
                    image: appImages.dateNightsurpriseMe,
                    title: 'Date Night',
                    detail: 'Look your best when relaxing with your family out and about...',
                    navigation: 'OccasionDetail'
                },
                {
                    image: appImages.beachHolidaysurpriseMe,
                    title: 'Beach Holiday',
                    detail: 'Look your best when relaxing with your family out and about...',
                    navigation: 'OccasionDetail'
                },
                {
                    image: appImages.cityBreaksurpriseMe,
                    title: 'City Break',
                    detail: 'Look your best when relaxing with your family out and about...',
                    navigation: 'OccasionDetail'
                },
                {
                    image: appImages.weddingsurpriseMe,
                    title: 'Wedding',
                    detail: 'Look your best when relaxing with your family out and about...',
                    navigation: 'OccasionDetail'
                },
            ]
        }
    }
    selectOccasion = (item) => {
        const { isSuccess, isFailure, loading, packageRequestRes, packageRequestObj } = this.props.packageRequest;
        console.log('[Occasion.js] Occasion First', this.props.packageRequest);
        packageRequestObj.package_name = item.title
        console.log('[Occasion.js] Occasion After', this.props.packageRequest);
        this.props.navigation.push(item.navigation,{ parent: 'Occasion', occasion: item.title })
    }
    render() {
        const { shops } = this.state;
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
                        text={'By Occasion?'}
                        style={{ marginHorizontal: WP('5'), marginVertical: WP('5'), marginTop: WP('7') }}
                    />
                    <NormalText
                        text={'Select the occasion you want to impress at'}
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
                                            this.selectOccasion(item)
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

export default connect(mapStateToProps, mapDispatchToProps)(ByOccasion);
