import { StyleSheet } from 'react-native'
import { family, size, WP, colors } from '../../../services';
export const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: colors.bgColor
    },
    // landing content styles

    styleContainer: {
        width: WP('85'),
        marginTop: WP(10),
        backgroundColor: colors.white,
        borderRadius: 5,
        alignSelf: 'center'
    },
    title: {
        marginHorizontal: WP('6'),
        marginVertical: WP('6')
    },
    normalText: {
        width: WP('73'),
        marginHorizontal: WP('6'),
        marginBottom: WP('5')
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        height: WP('11'),
        width: WP('50'),
        alignItems: 'center',
        borderRadius: 3,
        marginVertical: WP('7'),
        marginHorizontal: WP('7'),
        paddingHorizontal: WP('3'),
        backgroundColor: colors.buttonColor
    },
    smallText: {
        fontFamily: family.boldText,
        color: colors.white,
        fontSize: size.buttonText
    },


    onboardingContainer: {
        flex: 1,
        width: WP('85'),
        marginVertical: WP('3'),
        backgroundColor: colors.white,
        borderRadius: 5,
        alignSelf: 'center'
    },
    mainTitle: {
        marginHorizontal: WP('10'),
        textAlign: 'center',
        marginVertical: WP('5')
    },
    imgStyle: {
        height: WP('50'),
        width: WP('85'),
        resizeMode: 'contain',
        marginTop: WP('3.5')
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
        marginVertical: WP('2')
    },
    buttonStyle: {
        height: WP('12'),
        width: WP('64'),
        marginTop: WP('12')
    },
    slideStyle: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },

    // step 1 enter value
    unSelectedButton: {
        width: WP('80'),
        height: WP('12'),
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.black,
        marginVertical: WP('2')
    },
    selectedButton: {
        width: WP('80'),
        height: WP('12'),
        backgroundColor: colors.black,
        marginVertical: WP('2')
    },

    // Payment screen
    invoiceContainer: {
        marginBottom: WP('5'),
        borderRadius: 5,
        width: WP('90'),
        overflow: 'hidden',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.white
    },
    invoiceHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.black,
        height: WP('10'),
        paddingHorizontal: WP('5')
    },
    invoiceContentContainer: {
        backgroundColor: colors.white,
        // height: WP('25'),
        width: WP('90')
    },
    invoiceRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: WP('10'),
        backgroundColor: '#f9f9f9',
        paddingHorizontal: WP('5')
    },
    twoWayDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white
    }
});