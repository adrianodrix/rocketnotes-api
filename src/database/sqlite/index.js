import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { resolve, dirname } from 'path'

export default async function sqliteConnection() {
    const filename = resolve(dirname(''), 'src', 'database', 'database.db')
    // console.log(`Open database in ${filename}`)

    return await open({
        filename,
        driver: sqlite3.Database
    })
}