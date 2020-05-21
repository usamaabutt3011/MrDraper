import React, { Component } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import { WP, colors, data } from '../../services'
import { SmallTitle, NormalText, Button } from '../../components';
export const PriceCard = props => {
    const pricing = data.member_settings_v7.en.labels.budgets;
    return (
        <View
            style={[styles.container, props.style]}
        >
            <View style={styles.subContainer}>
                <SmallTitle
                    text={props.title}
                    style={{ marginTop: WP('5') }}
                />
                <NormalText
                    text={`AED ${props.price}`}
                    style={{ marginTop: WP('2') }}
                />
                <View style={styles.buttonsContainer}>
                    <Button 
                        title={pricing.expensive}
                        titleStyle={{  color: props.isPricy ? colors.white : colors.orange  }}
                        style={[styles.buttonExpStyle, props.isPricy ? { backgroundColor: colors.orange } : { backgroundColor: 'white' } ]}
                        onPress={()=> props.onPress('pricy')}
                    />
                    <Button 
                        title={pricing.good}
                        titleStyle={{  color: props.isGood ? colors.white : colors.buttonColor  }}
                        style={[styles.buttonGoodStyle, props.isGood ? { backgroundColor: colors.buttonColor } : { backgroundColor: 'white' } ]}
                        onPress={()=> props.onPress('good')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: WP('42'),
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
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    buttonsContainer: {
        height: WP('15'),
        width: WP('80'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: WP('4')
    },
    buttonExpStyle: {
        height: WP('12'),
        width: WP('38'),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: colors.orange,
        backgroundColor: colors.white
    },
    buttonGoodStyle: {
        height: WP('12'),
        width: WP('38'),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: colors.buttonColor,
        backgroundColor: colors.white
    }
})

