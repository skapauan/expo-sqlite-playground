import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        width: '100%',
        height: '100%',
    },
    compose: {
        backgroundColor: '#EEEEEE',
        padding: 12,
    },
    result: {
        backgroundColor: '#FFFFFF',
        padding: 12,
    },
    rowCount: {
        color: '#000000',
        marginBottom: 6,
    },
    error: {
        color: '#BB0000',
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: '#CCCCCC'
    },
    tableHead: {
        backgroundColor: '#EEEEEE',
    },
    tableText: {
        color: '#000000',
        margin: 5,
    },
})
