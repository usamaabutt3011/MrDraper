import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import { WP, colors, family } from '../../services'
import { SmallText, MediumText } from '../text'
import { Button } from '../buttons'

export const AddressCard = props => {
    return (
        <TouchableOpacity
            disabled={props.disabled}
            style={[styles.container, props.item.checked ? { backgroundColor: colors.black } : { backgroundColor: colors.white, borderWidth: props.disabled ? 0 : 1, width: props.disabled ? WP('90') : WP('80') }]}
            onPress={props.onPress}
        >
            <View style={{ width: props.disabled ? WP('57') : WP('80'), }}>
                <MediumText
                    text={props.item.address}
                    style={[styles.title, props.item.checked ? { color: colors.white } : { color: colors.drakBlack }]}
                />
                <SmallText
                    text={props.name}
                    style={[styles.nameText, props.item.checked ? { color: colors.white } : { color: colors.black }]}
                />
                <SmallText
                    text={`${props.item.line_1}, ${props.item.line_2}`}
                    style={[styles.streetText, props.item.checked ? { color: colors.white } : { color: colors.black }]}
                />
                <SmallText
                    text={`${props.item.area}, ${props.item.city}`}
                    style={[styles.addressText, props.item.checked ? { color: colors.white } : { color: colors.black }]}
                />
            </View>
            {
                props.disabled ?
                    <View style={{ width: WP('30'), alignItems: 'center', flexDirection: 'row' }}>
                        <Button
                            title={`EDIT`}
                            titleStyle={{ color: colors.buttonColor, fontSize: WP('3.3') }}
                            onPress={props.onEditPress}
                            style={{ width: WP('10'), backgroundColor: 'transparent' }}
                        />
                        <Button
                            title={`REMOVE`}
                            showLoader={props.showLoaderRemover}
                            titleStyle={{ color: colors.orange, fontSize: WP('3.3') }}
                            onPress={props.onRemovePress}
                            style={{ width: WP('19'), backgroundColor: 'transparent', marginLeft: WP('0') }}
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
        // height: WP('31'),
        width: WP('80'),
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 3,
        backgroundColor: colors.white,
        borderColor: colors.black,
        borderWidth: 1,
        marginBottom: WP('4.5'),
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
    title: {
        marginTop: WP('4'),
        color: colors.drakBlack,
        fontSize: 15,
        fontFamily: family.boldText,
        marginHorizontal: WP('5')
    },
    nameText: {
        color: colors.black,
        marginHorizontal: WP('5'),
        marginTop: WP('2')
    },
    streetText: {
        color: colors.drakBlack,
        marginHorizontal: WP('5'),
        marginVertical: WP('1')
    },
    addressText: {
        color: colors.drakBlack,
        marginHorizontal: WP('5'),
        marginBottom: WP('5')
    }
})

