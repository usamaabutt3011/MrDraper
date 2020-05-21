import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Header, Button, NormalText, SmallText, SmallTitle, CustomInputField } from '../../../../../components';
import { WP, colors, appImages } from '../../../../../services';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome'

export const Alternative = props => {
    return (
        <Modal
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            avoidKeyboard={true}
            transparent={true}
            isVisible={props.isAlter}
            // onBackdropPress={props._alterToggle()}
            style={{ flex: 1, justifyContent: 'flex-start' }}
        >
            <View style={{ width: WP('90'), alignSelf: 'center', marginTop: WP('3'), alignItems: 'center', borderRadius: 5, backgroundColor: colors.white, overflow: 'hidden' }}>
                <SmallTitle
                    text={`Here’s How It Works`}
                    style={{ marginTop: WP('5') }}
                />
                <SmallText
                    text={`Just use the box below to tell us what needs to be altered and we’ll take care of it — at no extra cost!`}
                    style={{ fontSize: WP('3.8'), marginTop: WP('3'), marginBottom: WP('2'), color: colors.mediumGrey, marginHorizontal: WP('3'), textAlign: 'center' }}
                />
                <CustomInputField
                    label={`Tell us what needs alterations`}
                    isRightIcon={false}
                    isMaskedInput={false}
                    multiLine={true}
                    placeholderText={`e.g. I need the shirt to fit around my chest..`}
                    placeholderTextColor={colors.lightGrey}
                    keyboardType={'default'}
                    onChangeText={(text) => props.onChangeText(text)}
                    containerStyle={{ height: WP('25'), width: WP('80'), alignSelf: 'center', marginHorizontal: WP('5'), marginTop: WP('7'), borderWidth: 1 }}
                    style={{ height: WP('18'), paddingHorizontal: WP(1) }}
                />
                <View style={{ flexDirection: 'row', width: WP('80'), marginTop: WP('10'), marginBottom: WP('7'), justifyContent: 'space-between' }}>
                    <Button
                        title={`CANCEL`}
                        titleStyle={{ color: colors.mediumGrey }}
                        style={{ width: WP('25'), backgroundColor: colors.bgColor }}
                        onPress={props._alterToggle()}
                    />
                    <Button
                        title={`SUBMIT`}
                        titleStyle={{}}
                        onPress={()=> props.onPress(null)}
                        style={{ width: WP('25') }}
                    />
                </View>
            </View>
        </Modal>
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
})

