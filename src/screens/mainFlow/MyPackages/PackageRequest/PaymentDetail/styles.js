import { StyleSheet } from 'react-native'
import { family, size, WP, colors } from '../../../../../services';
export const styles = StyleSheet.create({
    scrollView:{
        flexGrow:1
    },
    container: {
        flex: 1,
        height:"100%",
        width:"100%",
        backgroundColor: colors.bgColor
    },
    //PaymentDetails Screen CSS
    containerPhone: {
        height: WP('14'),
        width: WP(80),
        borderRadius: 3,
        borderWidth: 1.5,
        borderColor: colors.black,
        marginBottom: WP('5'),
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row'
    },
    labelStyle: {
        left: 0,
        top: -12,
        zIndex: 2,
        fontSize: 12,
        paddingVertical: 2,
        position: 'absolute',
        paddingHorizontal: WP('1.5'),
        backgroundColor: '#fff',
        marginHorizontal: WP('2'),
        fontFamily: family.normalText,
    },
    checkContainer: {
        flexDirection: 'row',
        marginBottom: WP('1')
    },
    checkIcon: {
        alignSelf: 'center',
        marginRight: WP('1.5')
    },
    
});