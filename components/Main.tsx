import React from 'react'
import { ScrollView } from 'react-native'
import { Compose, ComposeProps } from './Compose'
import { Result, ResultProps } from './Result'
import { DB } from './shared/db'
import { styles } from './shared/styles'

export const Main = () => {
    const db = new DB()
    const [result, setResult] = React.useState({
        data: undefined,
        error: undefined,
        queryEmpty: true,
    } as ResultProps)
    const resultProps: ResultProps = {
        data: result.data,
        error: result.error,
        queryEmpty: result.queryEmpty,
    }
    const composeProps: ComposeProps = {
        submitQuery: (query) => {
            let queryEmpty = false
            if ((typeof query === 'string' && query.length < 1) || (query &&
                    typeof query === 'object' && query.text.length < 1)) {
                queryEmpty = true
                setResult({ data: undefined, error: undefined, queryEmpty })
                return Promise.resolve()
            }
            return db.query(query)
            .then((data) => {
                setResult({ data, error: undefined, queryEmpty })
            })
            .catch((err) => {
                setResult({ data: undefined, error: err.message, queryEmpty })
            })
        },
    }
    return (
        <ScrollView style={styles.container}>
            <Compose {...composeProps} />
            <Result {...resultProps} />
        </ScrollView>
    )
}
