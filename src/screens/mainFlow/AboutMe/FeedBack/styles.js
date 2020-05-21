import { StyleSheet } from 'react-native'
import { family, size, WP, colors } from '../../../../services';
import { Colors } from 'react-native-paper';
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
    subContainerPersonal: {
        marginVertical: 2, 
        marginBottom: WP('5'), 
        borderRadius: 5, 
        width: WP(90), 
        overflow: 'hidden', 
        alignSelf: 'center', 
        backgroundColor: colors.white
    },

    twoButtonsContainer: {
        height: WP('15'),
        width: WP('80'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: WP('4'),
        alignSelf: 'center'
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

    inputStylePersonal: {
        paddingHorizontal: WP(1),
        height: WP('22'),
        textAlign: 'auto'
    },
    footerContainer: {
        width: WP('85'), 
        marginVertical: WP('5'),
        justifyContent: 'flex-end', 
        flexDirection: 'row'
    },
    buttonPersonal: {
        width: WP('30'), 
        height: WP('12'),
        backgroundColor:colors.black
    },
    description:{
        color:colors.lightGrey,
        marginHorizontal:WP('5')
    }
   
});