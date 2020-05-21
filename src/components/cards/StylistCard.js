import React from 'react'
import { Platform, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { WP, colors, appImages, family } from '../../services'
import Icon from 'react-native-vector-icons/FontAwesome'
import Arrow from 'react-native-vector-icons/AntDesign'
import { SmallText, SmallTitle, NormalText } from '../text'

export const StylistCard = props => {
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
                            // resizeMethod={'scale'}
                            style={[styles.imageStyle, props.imageStyle]}
                        />
                }
            </View>
            <SmallTitle
                text={props.title}
                style={styles.title}
            />
            <View style={{ flexDirection: 'row', marginHorizontal: WP('5'), marginBottom: WP('5') }}>
                <SmallText
                    text={`#stylistadvice`}
                    style={styles.hashTag}
                />
                <SmallText
                    text={` . by Mr.Draper`}
                    style={styles.advice}
                />
            </View>
            {
                props.isFeatured ?
                    <View style={styles.featuredContainer}>
                        <SmallText
                            text={`Featured`}
                            style={styles.featureText}
                        />
                    </View>
                    :
                    null
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // height: WP('78'),
        width: WP('90'),
        borderRadius: 5,
        backgroundColor: colors.white,
        marginBottom: WP('6'),
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
            },
            android: {
                elevation: 1
            },
        }),
    },
    imageContainer: {
        height: WP('50'),
        width: WP('90'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdcdc'
    },
    imageStyle: {
        height: WP('50'),
        width: WP('90'),
        resizeMode: 'contain'
    },
    title: {
        // fontSize: WP('4'),
        marginHorizontal: WP('5'),
        marginVertical: WP('2')
    },
    hashTag: {
        fontSize: WP('3.8'),
        fontFamily: family.boldText,
        color: colors.buttonColor
    },
    advice: {
        fontSize: WP('3.8'),
    },
    descText: {
        color: colors.mediumGrey,
        marginHorizontal: WP('3'),
        marginBottom: WP('3')
    },
    featuredContainer: {
        height: WP('8'),
        width: WP('20'),
        marginTop: WP('4.5'),
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: WP('5'),
        backgroundColor: colors.white,
        position: 'absolute',
    },
    featureText: {
        fontSize: WP('3.8'),
        fontFamily: family.boldText,
    },
})

