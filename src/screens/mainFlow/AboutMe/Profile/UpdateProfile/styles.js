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
    //Personal Info Screen CSS 
    subContainerPersonal: {
        marginVertical: 2, 
        marginBottom: WP('5'), 
        borderRadius: 5, 
        width: WP(90), 
        overflow: 'hidden', 
        alignItems: 'center', 
        alignSelf: 'center', 
        backgroundColor: colors.white,
        // marginBottom:WP('100')
    },
    titlePersonal: {
        fontFamily: family.boldText, 
        marginBottom: WP('2')
    },
    subTitlePersonal: {
        marginHorizontal: WP('10'), 
        textAlign: 'center', 
        marginBottom: WP('10')
    },
    nameFieldsContainer: {
        flexDirection: 'row', 
        width: WP('80'), 
        justifyContent: 'space-between'
    },
    nameInputContainer: {
        width: WP('38')
    },  
    nameInput: {
        width: WP('35'), 
        paddingHorizontal: WP(1)
    },
    inputStylePersonal: {
        paddingHorizontal: WP(1),
    },
    footerContainer: {
        width: WP('80'), 
        marginVertical: WP('5'),
        justifyContent: 'flex-end', 
        flexDirection: 'row'
    },
    footerText1: {
        fontSize: 11, 
        color: colors.black
    },
    footerText2: {
        fontSize: 11, 
        color: colors.buttonColor, 
        marginTop: WP(1)
    },
    buttonPersonal: {
        width: WP('40'), 
        height: WP('12'),
        backgroundColor:colors.black
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
    //Thankyou Screen CSS
    subContainer: {
        width: WP('85'), 
        backgroundColor: colors.white, 
        borderRadius: 5, 
        alignSelf: 'center'
    },  
    title: {
        marginHorizontal: WP('6'), 
        marginVertical: WP('4')
    },
    normalText: {
        width: WP('73'), 
        marginHorizontal: WP('6'), 
        marginBottom: WP('5'),
        fontSize: WP('3.5')
    },
    button: {
        alignSelf: 'flex-end', 
        height: WP('11'), 
        width: WP('30'), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 3, 
        marginVertical: WP('7'), 
        marginHorizontal: WP('7'), 
        backgroundColor: colors.buttonColor
    },
    smallText: {
        fontFamily: family.boldText, 
        color: colors.white, 
        fontSize: size.buttonText
    },
    modalBtnClose:{
        width: WP('80'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: WP('10'),
    }
    
});