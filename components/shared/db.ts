import * as SQLite from 'expo-sqlite'

export const DBConstants = {
    DatabaseName: 'expo_sqlite_playground'
}

export class DB {
    db: SQLite.Database

    constructor() {
        this.db = SQLite.openDatabase(DBConstants.DatabaseName)
    }

    query( query: string | {text: string, values: any[]},
            transaction?: SQLite.SQLTransaction
            ): Promise<SQLite.SQLResultSet> {
        // Prepare parameters
        let statement: string
        let args: any[] | undefined
        if (typeof query === 'string') {
            statement = query
        } else if (query && typeof query.text === 'string'
                && query.values && typeof query.values === 'object'
                && typeof query.values.length === 'number') {
            statement = query.text
            args = query.values
        } else {
            return Promise.reject(new Error('Invalid query input'))
        }
        // Use the given transaction
        if (transaction) {
            return new Promise((resolve, reject) => {
                transaction.executeSql(statement, args,
                    // executeSql success
                    (tx, result) => {
                        resolve(result)
                    },
                    // executeSql error
                    (tx, error) => {
                        reject(error)
                        return false // make ts compiler happy
                    }
                )
            })
        }
        // Use a new transaction
        return new Promise((resolve, reject) => {
            this.db.transaction(
                // transaction callback
                (tx) => {
                    tx.executeSql(statement, args,
                        // executeSql success
                        (tx, result) => {
                            resolve(result)
                        },
                        // executeSql error
                        (tx, error) => {
                            reject(error)
                            return false // make ts compiler happy
                        }
                    )
                },
                // transaction error
                (error) => {
                    reject(error)
                },
                // transaction success
                () => {}
            )
        })
    }

}
