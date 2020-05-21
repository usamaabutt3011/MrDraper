import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { WP, colors, family } from '../../services'
import { NormalText } from '../text'
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome'

export const PackageRequestCard = props => {
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
                        <SvgUri
                            width={WP('30')}
                            height={WP('20')}
                            uri={props.imageURI}
                        />
                }
            </View>
            <NormalText
                text={props.title}
                style={styles.title}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: WP('40'),
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
        height: WP('30'),
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
        height: WP('7'),
        width: WP('7'),
        position: 'absolute',
        resizeMode: 'contain'
    },
    title: {
        fontSize: WP('4.5'),
        alignSelf: 'center',
        fontFamily: family.boldText
    }
})

