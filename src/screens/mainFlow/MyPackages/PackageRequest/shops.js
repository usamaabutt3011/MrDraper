import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { WP, colors, data } from '../../../../services';
import { Header, LargeTitle, NormalText, PackageRequestCard } from '../../../../components';
import { styles } from './styles';

var brands = Object.values(data.member_settings_v7.en.all_brands)

class Shops extends Component {
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
    render() {
        const { shops } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    drawerLeft={true}
                    right={true}
                    titleStyle={{ color: colors.white }}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onPressLeft={() => this.props.navigation.navigate('MyPackages')}
                />
                 <ScrollView
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                <LargeTitle
                    text={'How Would You Like To Shop?'}
                    style={{ marginHorizontal: WP('7'), marginVertical: WP('5') }}
                />
                <NormalText
                    text={'Select an option below'}
                    style={{ marginHorizontal: WP('7'), color: colors.black, marginBottom: WP('5') }}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: WP('5') }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        {
                            shops.map((item, key) => {
                                return (
                                    <View key={key} style={{ width: '50%', padding: 9 }}>
                                        <PackageRequestCard
                                            key={key}
                                            title={'Casual'}
                                            placeholder={false}
                                            imageURI={item.image}
                                            title={item.name}
                                            description={''}
                                            onPress={() => this.props.navigation.push(item.nvaigation)}
                                        />
                                    </View>
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

export default Shops;
