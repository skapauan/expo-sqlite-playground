import React from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { styles } from './shared/styles'

export interface ComposeProps {
    submitQuery: (query: string | {text: string, values: any[]}) => Promise<void>;
}

export const Compose = (props: ComposeProps) => {
    const [queryText, changeQueryText] = React.useState('')
    const submitButtonPressed = () => {
        props.submitQuery(queryText)
    }
    return (
        <View style={styles.compose}>
            <Input
                multiline
                numberOfLines={5}
                placeholder="Enter an SQL statement here"
                value={queryText}
                onChangeText={text => changeQueryText(text)}
                />
            <Button title="Submit" onPress={submitButtonPressed} />
        </View>
    )
}
