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
    //StyleScreens CSS 
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
        marginBottom: WP('5')
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
    // Wear On Work Css
    
    
});