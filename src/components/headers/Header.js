import React from 'react'
import { View, StyleSheet } from 'react-native';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Feather';
import { MediumTitle } from '../text';
import { WP, colors, openDrawer } from '../../services';

export const Header = props => {
    return (
        <View style={[headerStyles.container, props.containerStyle]}>
            <View style={headerStyles.leftIcon}>
                {
                    props.left ?
                        <LeftIcon
                            name='arrowleft'
                            color={colors.mediumGrey}
                            size={28}
                            onPress={props.onPressLeft}
                        />
                        : props.drawerLeft ?
                            <LeftIcon
                                name='arrowleft'
                                color={colors.white}
                                size={28}
                                onPress={props.onPressLeft}
                            />
                            : null
                }
            </View>
            <View style={headerStyles.titleContainer}>
                <MediumTitle
                    text={'Mr.Draper'}
                    style={[props.titleStyle, props.titleStyle]}
                />
            </View>
            <View style={headerStyles.rightIcon}>
                {
                    props.right ?
                        <MenuIcon
                            name='menu'
                            color={colors.white}
                            size={28}
                            onPress={openDrawer}
                        />
                        : null
                }
            </View>
        </View>
    );
}
const headerStyles = StyleSheet.create({
    container: {
        height: WP('17'),
        width: WP('100'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIcon: {
        width: '12%',
        alignItems: 'flex-end'
    },
    titleContainer: {
        width: '76%',
        alignItems: 'center'
    },
    rightIcon: {
        width: '12%',
        alignItems: 'flex-start'
    },
});

