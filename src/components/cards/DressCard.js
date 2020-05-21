import React from 'react'
import { Platform, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { WP, colors, size, family, appImages } from '../../services'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SmallText, TinyText } from '../text'

export const DressCard = props => {
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
                            size={WP('20')}
                            style={[styles.placeHolderIcon, props.placeholderIconStyle]}
                        />
                        :
                        <Image
                            source={{ uri: props.imageURI }}
                            style={[styles.imageStyle, props.imageStyle]}
                        />
                }
            </View>
            <View
                style={styles.textContainer}
            >
                <SmallText
                    text={props.title}
                    style={styles.title}
                />
                <SmallText
                    text={props.description}
                    style={styles.descText}
                />
            </View>
            {
                props.isSelected ?
                    <Image
                        source={appImages.brandSelection}
                        style={styles.cardSelectIcon}
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
        width: WP('43'),
        borderRadius: 3,
        backgroundColor: colors.white,
        marginBottom: WP('4'),
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
        width: WP('43'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdcdc'
    },
    imageStyle: {
        height: WP('40'),
        width: WP('43'),
    },
    textContainer: {
        height: WP('30'),
        width: WP('40'),
    },
    title: {
        fontFamily: family.boldText,
        fontSize: WP('4'),
        marginHorizontal: WP('3'),
        marginVertical: WP('2')
    },
    descText: {
        color: colors.mediumGrey,
        marginHorizontal: WP('3'),
    },
    cardSelectIcon: {
        height: WP('7'),
        width: WP('7'),
        position: 'absolute',
        resizeMode: 'contain'
    },
})

