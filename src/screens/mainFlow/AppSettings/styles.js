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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginBottom: 0.5,
        paddingHorizontal: WP('6'),
        paddingVertical: WP('2')
    }
});