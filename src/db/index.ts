import path from 'path'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync(path.resolve(__dirname, 'data.json'))
const db = low(adapter)

export default db
