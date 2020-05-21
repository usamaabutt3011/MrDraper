import React, { Component } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import CircleCheckIcon from 'react-native-vector-icons/AntDesign';
import { WP, colors, family } from '../../services'
import { NormalText, SmallText } from '../../components';
export const ReceivingItemsCard = props => {
    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={props.onPress}
        >
            <View style={styles.subContainer}>
                <Image
                    source={props.image}
                    style={styles.imageStyle}
                />
                <NormalText
                    text={props.title}
                    style={styles.carTitle}
                />
                <View style={styles.cardSubCantainer}>
                    <SmallText
                        text={'Includes: '}
                    />
                    <View style={styles.checkContainer}>
                        <CircleCheckIcon
                            name='checkcircle'
                            size={11.5}
                            colors={'black'}
                            style={styles.checkIcon}
                        />
                        <SmallText
                            text={'Shirts'}
                        />
                    </View>
                    <View style={styles.checkContainer}>
                        <CircleCheckIcon
                            name='checkcircle'
                            size={11.5}
                            colors={'black'}
                            style={styles.checkIcon}
                        />
                        <SmallText
                            text={'Shoes'}
                        />
                    </View>
                    <View style={styles.checkContainer}>
                        <CircleCheckIcon
                            name='checkcircle'
                            size={11.5}
                            colors={'black'}
                            style={styles.checkIcon}
                        />
                        <SmallText
                            text={'Pants'}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: WP('55'),
        width: WP('90'),
        borderRadius: 5,
        backgroundColor: colors.white,
        marginBottom: WP('5'),
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
    subContainer: {
        height: WP('40'),
        width: WP('90'),
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    imageStyle: {
        height: WP('35'),
        width: WP('90'),
        // resizeMode: 'contain'
    },
    carTitle: {
        fontFamily: family.boldText,
        marginHorizontal: WP('5'),
        marginTop: WP('3')
    },
    cardSubCantainer: {
        marginHorizontal: WP('5'),
        marginTop: WP('1'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkContainer: {
        marginLeft: WP('2'),
        flexDirection: 'row'
    },
    checkIcon: {
        alignSelf: 'center',
        marginRight: WP('1.5')
    },

})

