import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WP, colors, data, appImages } from '../../../../../services';
import { Header, LargeTitle, NormalText, OccasionCard } from '../../../../../components';
import { styles } from '../styles';

class OccasionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [
                {
                    image: appImages.imageconta,
                    title: 'Full Outfits',
                    detail: 'Receive full outfits from head to toe',
                    navigation: 'DetailCorrection'
                },
                {
                    image: appImages.fullOutFitts,
                    title: 'Specific Items',
                    detail: 'Choose items you want to receive',
                    navigation: 'SelectItem'
                },
            ]
        }
    }
    render() {
        const { shops } = this.state;
        let { params } = this.props.navigation.state;
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
                    <NormalText
                        text={`By ${params.parent} > ${params.occasion}`}
                        style={{ marginHorizontal: WP('5'), color: colors.mediumGrey, marginTop: WP('5') }}
                    />
                    <LargeTitle
                        text={'What Would You Like To Receive?'}
                        style={{ marginHorizontal: WP('5'), marginRight: WP('10'), marginVertical: WP('5'), marginTop: WP('5') }}
                    />
                    <NormalText
                        text={'Select an option'}
                        style={{ marginHorizontal: WP('5'), color: colors.black, marginBottom: WP('5') }}
                    />
                    <View style={{ flex: 1, marginTop: WP('2') }}>
                        {
                            this.state.shops.map((item, key) => {
                                return (
                                    <OccasionCard
                                        key={key}
                                        title={item.title}
                                        detail={item.detail}
                                        image={item.image}
                                        style={{ alignSelf: 'center' }}
                                        onPress={() => {
                                            this.props.navigation.push(item.navigation)
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

export default OccasionDetail;
