import bcrypt from 'bcryptjs'
import database from '../index.js'

const db = await database()
const password = await bcrypt.hash('1234', 8)

console.log('creating table users')
await db.exec(`
DROP TABLE users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO USERS (name, email, password) VALUES ("adriano", "adrianodrix@gmail.com", "${password}");
`)

const result = await db.all('SELECT id, name, email, password, created_at, updated_at FROM users')
console.log(result)