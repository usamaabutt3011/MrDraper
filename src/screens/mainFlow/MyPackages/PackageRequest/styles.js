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
    // SurpriseMe CSS
        //StyleScreens CSS 
        subContainer: {
            width: WP('90'), 
            backgroundColor: colors.white, 
            borderRadius: 5, 
            alignSelf: 'center',
            marginBottom: WP('5')
        },  
        title: {
            marginHorizontal: WP('6'), 
            marginVertical: WP('4')
        },
        normalText: {
            width: WP('73'), 
            marginHorizontal: WP('6'), 
            marginBottom: WP('5'),
            textAlign: 'left'
        },
        image: {
            height: WP('37'),
            width: WP('78'),
            resizeMode: 'contain',
            marginHorizontal: WP('5'),
            marginBottom: WP('5')
        },
        button: {
            marginVertical: WP('5'), 
            alignSelf: 'center', 
            width: WP('32')
        },
        surpriseButton: {
            marginVertical: WP('5'), 
            alignSelf: 'center', 
            width: WP('78')
        },
        smallText: {
            fontFamily: family.boldText, 
            color: colors.white, 
            fontSize: size.buttonText
        },
        //Detail Screen
        rowFieldsCon: {
            flexDirection: 'row', 
            width: WP('77'),
            alignSelf: 'center',
            justifyContent: 'space-between'
        },
        rowFields: {
            width: WP('32'), 
            paddingHorizontal: WP(1)
        },
        buttonUpdateScreen: {
            marginVertical: WP('5'), 
            alignSelf: 'center', 
            width: WP('36')
        },
        // Scheduling CSS
        subContainerSchdule: {
            marginVertical: 2, 
            marginBottom: WP('10'), 
            borderRadius: 5, 
            width: WP(90), 
            overflow: 'hidden', 
            alignItems: 'center', 
            alignSelf: 'center', 
            backgroundColor: colors.white
        },
        twoButtonsContainer: {
            height: WP('15'),
            width: WP('80'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: WP('4')
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
        //Addressing Screen
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