import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { WP, colors, family } from '../../services';

export const ProfileHeaderTabs = props => {
    return (
        <View style={[headerStyles.container, props.containerStyle]}>
            <View style={headerStyles.tabContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ height: WP('10'), marginHorizontal: WP('5') }}
                >
                    {
                        props.tabs && props.tabs.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    key={key}
                                    style={[headerStyles.textCon, { borderBottomWidth: item.checked ? 1 : 0, borderBottomColor: 'black' }]}
                                    onPress={() => props.onPress(item)}
                                >
                                    <Text
                                        style={headerStyles.tabText}
                                    >
                                        {item.tab}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}
const headerStyles = StyleSheet.create({
    container: {
        height: WP('5'),
        width: WP('100'),
    },
    tabContainer: {
        height: WP('10'),
        width: WP('100'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.white
    },
    textCon: {
        height: WP('10'),
        // width: WP('25'),
        marginRight: WP('3'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: WP('5'),
    },
    tabText: {
        fontSize: WP('4'),
        color: colors.black,
        alignSelf: 'center',
        fontFamily: family.normalText,
    }
});

