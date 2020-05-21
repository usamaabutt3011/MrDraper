import React from 'react'
import { Platform, View, StyleSheet, ScrollView } from 'react-native';
import { Header, Button, NormalText, SmallText, SmallTitle, CustomInputField } from '../../../../../components';
import { WP, colors, appImages } from '../../../../../services';
import Modal from 'react-native-modal';

export const Return = props => {
    return (
        <Modal
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            avoidKeyboard={true}
            transparent={true}
            isVisible={props.isReturn}
            // onBackdropPress={props._returnToggle()}
            style={{ flex: 1, justifyContent: 'flex-start' }}
        >
            <ScrollView>
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
                    title={`Not my colour`}
                    titleStyle={{ color: colors.black }}
                    onPress={()=> props.onPress('Not my color')}
                    style={{ marginTop: WP('3'), backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.black }}
                />
                <Button
                    title={`Not my style`}
                    titleStyle={{ color: colors.black }}
                    onPress={()=> props.onPress('Not my style')}
                    style={{ marginTop: WP('3'), backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.black }}
                />
                <Button
                    title={`I like it but I’ll leave it for now`}
                    titleStyle={{ color: colors.black }}
                    onPress={()=> props.onPress('I like it')}
                    style={{ marginTop: WP('3'), backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.black }}
                />
                <Button
                    title={`Too expensive`}
                    titleStyle={{ color: colors.black }}
                    onPress={()=> props.onPress('Too expensive')}
                    style={{ marginTop: WP('3'), backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.black }}
                />
                <Button
                    disabled={true}
                    title={`Other reason...`}
                    style={{ marginTop: WP('3'), backgroundColor: colors.black, borderWidth: 1, borderColor: colors.black }}
                />
                <CustomInputField
                    label={`Any specific reason?`}
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
                <SmallText
                    text={`This feedback will help your stylist personalize your future packages even more.`}
                    style={{ marginHorizontal: WP('5'), marginTop: WP('5'), color: colors.mediumGrey }}
                />
                <View style={{ flexDirection: 'row', width: WP('80'), marginTop: WP('5'), marginBottom: WP('7'), justifyContent: 'space-between' }}>
                    <Button
                        title={`CANCEL`}
                        titleStyle={{ color: colors.mediumGrey }}
                        style={{ width: WP('25'), backgroundColor: colors.bgColor }}
                        onPress={props._returnToggle()}
                    />
                    <Button
                        title={`SUBMIT`}
                        onPress={()=> props.onPress(null)}
                        style={{ width: WP('25') }}
                    />
                </View>
            </View>
            </ScrollView>
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

