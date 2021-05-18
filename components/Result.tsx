import React from 'react'
import { View, Text } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { SQLResultSet } from 'expo-sqlite'
import { styles } from './shared/styles'

export interface ResultProps {
    data: SQLResultSet | undefined;
    error: string | undefined;
    queryEmpty: boolean;
}

export const Result = (props: ResultProps) => {
    if (props.queryEmpty) {
        return (
            <View style={styles.result}>
                <Text style={styles.rowCount}>
                    Please submit an SQL statement to view the results.
                </Text>
            </View>
        )
    }
    if (props.data) {
        const pdr = props.data.rows
        if (pdr.length > 0) {
            const tableHead = Object.keys(pdr.item(0))
            const tableData: any[][] = []
            let row: any
            for (let i = 0; !!(row = pdr.item(i)); i++) {
                const tableRow: any[] = []
                tableHead.forEach((key) => {
                    tableRow.push(row[key])
                })
                tableData.push(tableRow)
            }
            return (
                <View style={styles.result}>
                    <Text style={styles.rowCount}>{pdr.length} rows</Text>
                    <Table borderStyle={styles.tableBorder}>
                        <Row data={tableHead} textStyle={styles.tableText}
                            style={styles.tableHead} />
                        <Rows data={tableData} textStyle={styles.tableText} />
                    </Table>
                </View>
            )
        }
        return (
            <View style={styles.result}>
                <Text style={styles.rowCount}>0 rows</Text>
            </View>
        )
    }
    return (
        <View style={styles.result}>
            <Text style={styles.error}>{props.error
                ? 'Error ' + props.error
                : 'Very strange, an unknown error!'}
            </Text>
        </View>
    )
}
