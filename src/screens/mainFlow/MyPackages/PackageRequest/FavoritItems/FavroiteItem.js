import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { Header, LargeTitle, MediumTitle, SmallText, FavoritItemCard, Button } from '../../../../../components';
import { WP, colors, data } from '../../../../../services';
import { signUpObj } from '../../../../../store/actions';
import { styles } from '../styles';

var items = Object.values(data.package_request_flow.items)
var tops = Object.values(data.package_request_flow.items.tops)
var bottoms = Object.values(data.package_request_flow.items.bottoms)
var footwear = Object.values(data.package_request_flow.items.footwear)
var accessories = Object.values(data.package_request_flow.items.accessories)

class FavoritItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [
                {
                    image: "https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/surprise-me-a3d9c710aac74d95decf37c012bb1881afcab148dee3d10a99632fab7a105651.svg",
                    name: 'Surprise Me',
                    nvaigation: 'SurpriseMe',
                },
                {
                    image: "https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/by-occasion-a3b811fd5640d1bcc7992c133cebdc5aa4c712c4a5adece16767502ea0295f25.svg",
                    name: 'By Occasion',
                    nvaigation: 'ByOccasion',
                },
                {
                    image: "https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/by-style-e973de1234889e7ba6f6e84da513bfab283836a75ae9ad03793b10eb540b6e2f.svg",
                    name: 'By Style',
                    nvaigation: 'Style',
                },
                {
                    image: "https://s3.eu-central-1.amazonaws.com/mrdraperwebsite-static-staging/assets/by-items-3cfbb7d6e57346666bcc9f7f41d3bf81eb781b4e9cbe07f2d985c98d9106a54b.svg",
                    name: 'By Items',
                    nvaigation: 'SelectItem',
                },
            ]
        }
    }
    componentDidMount = async () => {
        console.log('[items are:]', items);
    }
    render() {
        const { shops } = this.state;
        const { signup } = this.props;
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
                    <View style={{ height: WP('5') }} />
                    <View style={{ flex: 1 }}>
                        <LargeTitle
                            text={`Select Items`}
                            style={{ marginHorizontal: WP(5) }}
                        />
                        <SmallText
                            text={`Select multiple items or just one`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />
                        <MediumTitle
                            text={`Tops`}
                            style={{ marginHorizontal: WP('5'), marginVertical: WP('5') }}
                        />

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('5') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {
                                    shops.map((item, key) => {
                                        return (
                                            <View key={key} style={{ width: '50%', padding: 9 }}>
                                                <FavoritItemCard
                                                    key={key}
                                                    placeholder={false}
                                                    imageURI={item.image}
                                                    title={'Stretched Washed Chinos'}
                                                    subTitle={'Scotch & Soda'}
                                                    realPrice={'AED 200'}
                                                    discountPrice={'AED 160'}
                                                    description={''}
                                                    onPress={() => this.props.navigation.push(item.nvaigation)}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ height: WP('18'), width: WP('100'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: colors.white }}>
                    <Text style={{ marginHorizontal: WP('5'), fontSize: 13 }}>
                        You've selected
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}> {signup.signUpObj.brands.length} </Text>
                        brands.
                    </Text>
                    <Button
                        title='NEXT'
                        onPress={() => this.props.navigation.push('DetailCorrection')}
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
        signUpObjAction: (params) => dispatch(signUpObj(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritItem);
