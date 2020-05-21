import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { WP, colors, family, appImages } from '../../services'
import { NormalText, SmallText } from '../text'
import Icon from 'react-native-vector-icons/FontAwesome'

export const FavoritItemCard = props => {
    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={props.onPress}
        >
            <View style={styles.imageContainer}>
                {
                    props.placeholder ?
                        <Icon
                            name='file-image-o'
                            color={colors.lightGrey}
                            size={WP('12')}
                            style={[styles.placeHolderIcon, props.placeholderIconStyle]}
                        />
                        :
                        <Image
                            style={{ height: WP('40'), width: WP('40'), marginVertical: WP('5') }}
                            source={appImages.likedItem1}
                        />
                }
            </View>
            <NormalText
                text={props.title}
                style={styles.title}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ height: WP('15'), width: WP('20'), justifyContent: 'center', alignItems: 'center' }}>
                    <SmallText
                        text={props.subTitle}
                    />
                </View>
                <View style={{ height: WP('15'), width: WP('20'), justifyContent: 'center', alignItems: 'center' }}>
                    <SmallText
                        text={props.realPrice}
                        style={styles.realPriceStyle}
                    />
                    <NormalText
                        text={props.discountPrice}
                        style={styles.actualPrice}
                    />
                </View>
            </View>
            {
                !props.isSelected ?
                    <Image
                        source={appImages.brandSelection}
                        style={styles.brandSelectIcon}
                    />
                    :
                    null
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: WP('70'),
        width: WP('40'),
        borderRadius: 3,
        backgroundColor: colors.white,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: colors.lightGrey,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 1
            },
        }),
    },
    imageContainer: {
        height: WP('40'),
        width: WP('40'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: WP('23'),
        width: WP('25'),
        resizeMode: 'contain'
    },
    brandSelectIcon: {
        height: WP('10'),
        width: WP('10'),
        position: 'absolute',
        resizeMode: 'contain'
    },
    title: {
        fontSize: WP('4'),
        marginHorizontal: WP('2.5'),
        fontFamily: family.boldText,
        marginTop: WP('3')
    },
    realPriceStyle: {
        fontSize: WP('2.8'),
        color: colors.orange,
        textDecorationLine: 'line-through',
        right: -5
    },
    actualPrice: {
        fontSize: WP('3.5'),
        fontFamily: family.boldText,
    },
})

