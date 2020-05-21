import { StyleSheet } from 'react-native'
import { family, size, WP, colors } from '../../../../services';
export const styles = StyleSheet.create({
    mainTitle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        marginVertical: WP('5')
    },
    imgStyle: {
        height: WP('40'),
        width: WP('100'),
        resizeMode: 'contain'
    },
    subTitle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        marginTop: WP('5')
    },
    normalTextStyle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        color: colors.black,
        marginTop: WP('2')
    },
    buttonStyle: {
        height: WP('12'),
        width: WP('64'),
        marginTop: WP('12')
    },

    wrapper: {

    },
    slideStyle: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});