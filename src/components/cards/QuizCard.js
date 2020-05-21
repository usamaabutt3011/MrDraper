import React from 'react'
import { Platform, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { WP, colors, appImages, family } from '../../services'
import Icon from 'react-native-vector-icons/FontAwesome'
import Arrow from 'react-native-vector-icons/AntDesign'
import { SmallText, SmallTitle, NormalText } from '../text'

export const QuizCard = props => {
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
            <View
                style={styles.textContainer}
            >
                <SmallText
                    text={props.title}
                    style={styles.title}
                />
            </View>
            {
                props.isSelected ?
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

export const QuizStaticCard = props => {
    return (
        <TouchableOpacity
            style={[styles.containerQuizStaticCard, props.style]}
            onPress={props.onPress}
        >
            <View style={{ height: WP('30'), width: WP('90'), flexDirection: 'row' }}>
                <View style={{ height: WP('20'), width: WP('78'), alignSelf: 'center' }}>
                    <SmallTitle
                        text={props.title}
                        style={[styles.title, { marginHorizontal: WP('7'), color: colors.white, fontFamily: family.boldTitle, fontSize: WP('5') }]}
                    />
                    <NormalText
                        text={props.text}
                        style={{ marginHorizontal: WP('7'), color: colors.white }}
                    />
                </View>
                <Arrow
                    name='arrowright'
                    color={colors.white}
                    size={WP('6')}
                    style={{ alignSelf: 'center' }}
                />
            </View>
            {
                props.tour ?
                    <View style={{ height: WP('30'), width: WP('90'), position: 'absolute', justifyContent: 'center' }}>
                        <Image
                            source={appImages.takeprofileblock}
                            style={{ height: WP('10'), width: WP('10'), resizeMode: 'contain', left: -WP('3') }}
                        />
                    </View>
                    :
                    props.contact ?
                        <View style={{ height: WP('30'), width: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <Image
                                source={appImages.contactStylistBlock}
                                style={{ height: WP('17'), width: WP('17'), resizeMode: 'contain', bottom: -WP('7') }}
                            />
                        </View>
                        :
                        props.refer ?
                            <View style={{ height: WP('30'), width: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Image
                                    source={appImages.referFriendBlock}
                                    style={{ height: WP('17'), width: WP('17'), resizeMode: 'contain', bottom: -WP('7') }}
                                />
                            </View>
                            :
                            props.blog ?
                                <View style={{ height: WP('30'), width: '100%', position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                    <Image
                                        source={appImages.readBlog}
                                        style={{ height: WP('15'), width: WP('15'), resizeMode: 'contain', top: -WP('2'), right: WP('10') }}
                                    />
                                </View>
                                : null
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: WP('38'),
        width: WP('90'),
        borderRadius: 5,
        backgroundColor: colors.white,
        marginBottom: WP('4'),
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
    containerQuizStaticCard: {
        display: 'flex',
        height: WP('30'),
        width: WP('90'),
        borderRadius: 5,
        backgroundColor: colors.white,
        marginBottom: WP('4'),
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
        height: WP('28'),
        width: WP('90'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdcdc'
    },
    imageStyle: {
        height: WP('28'),
        width: WP('90'),
        resizeMode: 'contain'
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
    brandSelectIcon: {
        height: WP('9'),
        width: WP('9'),
        position: 'absolute',
        resizeMode: 'contain'
    },
})

