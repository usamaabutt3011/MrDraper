import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { WP, colors, family, appImages } from '../../services'
import { SmallText } from '../text'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text } from 'react-native-elements'

export const SelectItemCard = props => {
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
                        <ImageBackground
                            source={{ uri: props.imageURI }}
                            style={styles.imageStyle}
                        >
                            <View style={styles.overlay}>
                                <SmallText
                                    text={props.title}
                                    style={{ color: colors.white, fontFamily: family.boldText, fontSize: WP('4'), marginHorizontal: WP('5'), textAlign: 'center', lineHeight: 20 }}
                                />
                            </View>
                        </ImageBackground>
                }
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

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: WP('25'),
        width: '100%',
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
        height: WP('25'),
        width: WP('27'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'red'
    },
    imageStyle: {
        height: WP('25'),
        width: WP('27'),
        resizeMode: 'contain'
    },
    overlay: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    brandSelectIcon: {
        height: WP('7'),
        width: WP('7'),
        position: 'absolute',
        resizeMode: 'contain'
    },
})

