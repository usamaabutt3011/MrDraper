import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import { WP, colors, family } from '../../services'
import { NormalText, SmallText } from '../text'
import { Button } from '../buttons'

export const MyPackagesCard = props => {
    return (
        <View
            style={[styles.container, props.style]}
            onPress={props.onPress}
        >
            <NormalText
                text={props.title}
                style={styles.title}
            />
            <View style={styles.buttonContainer}>
                {

                    props.item.completed ?
                        <Button
                            disabled={true}
                            title={'Completed'}
                            titleStyle={{ fontSize: WP('3.7') }}
                            style={styles.completeButton}
                        />
                        :
                        props.item.package_status == 'Package received' ?
                            <View style={styles.buttonsContainer}>
                                <Button
                                    disabled={true}
                                    title={props.item.package_status}
                                    titleStyle={{ fontSize: WP('3.7') }}
                                    style={styles.deliveredButton}
                                />
                                <Button
                                    disabled={true}
                                    title={`${props.item.days_left} days left to try outfit`}
                                    titleStyle={{ fontSize: WP('3.7') }}
                                    style={styles.expiryButton}
                                />
                            </View>
                            :
                            <Button
                                disabled={true}
                                title={props.item.package_status}
                                titleStyle={{ fontSize: WP('3.7') }}
                                style={styles.pickedButton}
                            />

                }
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ marginHorizontal: WP('5') }}>
                    <SmallText
                        text={props.item.package_status !== 'Package received' ? `Requested on` : `Delivered on`}
                        style={{ color: colors.mediumGrey }}
                    />
                    <SmallText
                        text={
                            props.item.package_status !== 'Package received' ?
                                props.date :
                                props.item.package_status == 'Package received' ?
                                    props.item.received_date
                                    :
                                    null
                        }
                        style={{ fontFamily: family.boldText, marginTop: WP('2'), marginBottom: WP('5') }}
                    />
                </View>
                <View style={{ marginHorizontal: WP('5') }}>
                    <SmallText
                        text={`Items`}
                        style={{ color: colors.mediumGrey }}
                    />
                    <SmallText
                        text={props.items}
                        style={{ fontFamily: family.boldText, marginTop: WP('2'), marginBottom: WP('5') }}
                    />
                </View>
            </View>
            {
                props.item.package_status == 'Package received' ?
                    <Button
                        title={`REQUEST PICKUP`}
                        titleStyle={{ fontSize: WP('3.7') }}
                        onPress={props.onPress}
                        style={{ marginHorizontal: WP('5'), marginBottom: WP('5'), backgroundColor: colors.black }}
                    />
                    : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // height: WP('40'),
        width: WP('90'),
        borderRadius: 3,
        alignSelf: 'center',
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
    title: {
        fontSize: WP('4.5'),
        marginHorizontal: WP('5'),
        marginTop: WP('4'),
        fontFamily: family.boldText
    },
    buttonContainer: {
        marginHorizontal: WP('5')
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    pickedButton: {
        height: WP('8'),
        width: WP('35'),
        marginVertical: WP('3'),
        marginBottom: WP('5'),
        backgroundColor: colors.orange,
    },
    completeButton: {
        height: WP('8'),
        width: WP('25'),
        marginVertical: WP('3'),
        marginBottom: WP('5'),
        backgroundColor: colors.buttonColor,
    },
    deliveredButton: {
        height: WP('8'),
        width: WP('32'),
        marginVertical: WP('3'),
        marginBottom: WP('5'),
    },
    expiryButton: {
        height: WP('8'),
        width: WP('42'),
        marginLeft: WP('2'),
        backgroundColor: colors.red,
        marginVertical: WP('3'),
        marginBottom: WP('5'),
    }
})

