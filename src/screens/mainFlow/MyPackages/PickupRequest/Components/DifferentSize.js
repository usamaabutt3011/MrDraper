import React from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Header, Button, NormalText, SmallText, SmallTitle, CustomInputField } from '../../../../../components';
import { WP, colors, appImages } from '../../../../../services';
import Modal from 'react-native-modal';

export const DifferentSize = props => {
    return (
        <Modal
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            avoidKeyboard={true}
            transparent={true}
            isVisible={props.isDifferent}
            // onBackdropPress={props._differentSizeToggle()}
            style={{ flex: 1, justifyContent: 'flex-start' }}
        >
            <View style={{ width: WP('90'), alignSelf: 'center', marginTop: WP('3'), alignItems: 'center', borderRadius: 5, backgroundColor: colors.white, overflow: 'hidden' }}>
                <SmallTitle
                    text={`What size would you like...`}
                    style={{ marginTop: WP('5') }}
                />
                <SmallText
                    text={`Select an option below`}
                    style={{ marginTop: WP('3'), marginBottom: WP('10'), color: colors.mediumGrey }}
                />
                <Button
                    title={`Smaller Size`}
                    titleStyle={{ color: colors.black }}
                    onPress={()=> props.onPress('Too big')}
                    style={{ marginTop: WP('3'), backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.black }}
                />
                <Button
                    title={`Larger Size`}
                    titleStyle={{ color: colors.black }}
                    onPress={()=> props.onPress('Too small')}
                    style={{ marginTop: WP('3'), backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.black }}
                />
                <Button
                    disabled={true}
                    title={`Other reason...`}
                    style={{ marginTop: WP('3'), backgroundColor: colors.black, borderWidth: 1, borderColor: colors.black }}
                />
                <CustomInputField
                    label={`Custom note`}
                    isRightIcon={false}
                    isMaskedInput={false}
                    multiLine={true}
                    placeholderText={`write something`}
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
                        onPress={props._differentSizeToggle()}
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

