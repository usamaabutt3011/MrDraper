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
    textContainer: {
        marginHorizontal: WP('5'),
        width: WP('51'),
    },
    historyTitle: {
        fontSize: WP('4.5'),
        marginTop: WP('4'),
        fontFamily: family.boldText
    }
});