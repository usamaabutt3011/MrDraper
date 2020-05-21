import React, { Component } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { WP, colors, family } from '../../services'
import { NormalText, SmallText } from '../../components';
export const OccasionCard = props => {
    return (
        <TouchableOpacity
            style={[styles.container, props.style]}
            onPress={props.onPress}
        >
                <Image
                    source={props.image}
                    style={styles.imageStyle}
                />
                <NormalText
                    text={props.title}
                    style={styles.cardTitle}
                />
                <SmallText
                    text={props.detail}
                    style={styles.cardDetail}
                />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // height: WP('60'),
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
    imageStyle: {
        height: WP('40'),
        width: WP('90'),
    },
    cardTitle: {
        fontFamily: family.boldText,
        marginHorizontal: WP('5'),
        marginTop: WP('3')
    },
    cardDetail: {
        marginBottom: WP('5'),
        marginTop: WP('2'),
        marginHorizontal: WP('5')
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

