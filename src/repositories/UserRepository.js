import database from '../database/sqlite/index.js'

export class UserRepository {
    async findByEmail(email) {
        const db = await database()
        return await db.get('SELECT id FROM users WHERE email = ?', [ email ])        
    }

    async create({ name, email, password }) {
        const db = await database()
        
        const userId = await db.run( 
                    'INSERT INTO users (name, email, password) VALUES (?,?,?)', 
                    [name, email, password]
        )

        return { id: userId }
    }
}