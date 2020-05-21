import { StyleSheet } from 'react-native'
import { family, size, WP, colors } from '../../../../services';
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
       //noteOne Screen CSS 
    subContainerPersonal: {
        marginVertical: 2, 
        marginBottom: WP('10'), 
        borderRadius: 5, 
        width: WP(90), 
        overflow: 'hidden', 
        alignItems: 'center', 
        alignSelf: 'center', 
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        height:"100%",
        width:"100%",
        backgroundColor: colors.bgColor
    },
    twoButtonsContainer: {
        height: WP('15'),
        width: WP('80'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: WP('4')
    },
    buttonStyle: {
        height: WP('11'),
        width: WP('38'),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: colors.black,
        backgroundColor: colors.white
    },
    smallButtonStyle: {
        height: WP('11'),
        width: WP('24'),
        fontFamily: family.normalText,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: colors.black,
        backgroundColor: colors.white
    },
    divider: {
        height: WP('0.1'), 
        width: WP('80'), 
        backgroundColor: colors.lightGrey, 
        alignSelf: 'center', 
        marginTop: WP('3'), 
        marginBottom: WP('5')
    },
    title: {
        color: colors.drakBlack, 
        fontFamily: family.boldText,
        fontSize: 12,
        marginVertical: 5,
        lineHeight: 18
    },
    simpleText: {
        color: colors.black, 
        fontFamily: family.normalText,
        fontSize: 12
    },
    //noteThree
    rowFieldsCon: {
        flexDirection: 'row', 
        width: WP('75'),
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    fieldCon: {
        width: WP('35')
    },
    rowFields: {
        width: WP('32'), 
        paddingHorizontal: WP(1)
    },
});