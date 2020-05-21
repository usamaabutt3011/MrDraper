import { StyleSheet } from 'react-native'
import { family, size, WP, colors } from '../../../services';
export const loginStyles = StyleSheet.create({
    scrollView:{
        flexGrow:1
    },
    container: {
        flex: 1,
        height:"100%",
        width:"100%"
    },
    bgImgStyle: {
        height: '100%', 
        width: '100%', 
        // resizeMode: 'contain' 
    },
    forgetCon: {
        fontSize: size.smallText, 
        fontFamily: family.normalText, 
        color: colors.black, 
        marginHorizontal: 20, 
        marginBottom: WP('7')
    },
    forgetChild: {
        fontSize: size.smallText, //15 
        fontFamily: family.boldText, 
        color: colors.buttonColor
    },
    footerText: {
        fontSize: size.smallText, 
        fontFamily: family.normalText, 
        color: colors.black, 
        textAlign: 'center', 
        marginVertical: WP('8')
    },
    footerChild: {
        fontSize: size.smallText, 
        fontFamily: family.boldText, 
        color: colors.black 
    },
    headerTitle: {
        color: colors.black
    }
});