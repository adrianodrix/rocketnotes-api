import bcrypt from 'bcryptjs'
import AppError from "../utils/AppError.js"
import database from '../database/sqlite/index.js'
import { UserRepository } from '../repositories/UserRepository.js'
import { UserCreateService } from '../services/UserCreateService.js'

export default class UsersController {
    /**
     * Controller has 5 methods
     * 
     * index - GET - List all registers
     * show - GET - View a specific register
     * create - POST - create a register
     * update - PUT - update a register
     * delete - DELETE - remove a register
     */
    
    // Query Params. Optional
    async index(req, res) {
        // const { page, limit } = req.query

        const db = await database()

        const result = await db.all('SELECT id, name, email, avatar, created_at, updated_at FROM users ORDER BY name')

        res.json(result)
    }

    async create(req, res) {
        const { name, email, password } = req.body

        if(!name) {
            throw new AppError('name is required')
        }

        if(!email) {
            throw new AppError('email is required')
        }

        if(!password) {
            throw new AppError('password is required')
        }

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({name, email, password})

        res.status(201).json({})
    }

    async update(req, res) {
        const { id } = req.user
        const { name, email, avatar, password, old_password } = req.body

        if(password && !old_password) {
            throw new AppError('You need to enter the old password to set the new password.')
        }

        const db = await database()
        const user = await db.get('SELECT id, name, email, avatar, password FROM users WHERE id = ?', [ id ])
        if(!user) {
            throw new AppError('User does not exist', 404)
        }

        const userWithUpdatedEmail = await db.get('SELECT id, name, email, avatar FROM users WHERE email = ?', [ email ])
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError(`${email} is already registered.`)
        }
        
        if(password && old_password) {
            const checkOldPassword = await bcrypt.compare(old_password, user.password)
            if(!checkOldPassword) {
                throw new AppError('the old password does not match')
            }

            user.password = await bcrypt.hash(password, 8)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email
        user.avatar = avatar ?? user.avatar

        await db.run(`UPDATE users SET name = ?, email = ?, password = ?, avatar = ?, updated_at = DATETIME('now') WHERE id = ?`, 
                                    [user.name, user.email, user.password, user.avatar, id])

        return res.json()
    }
}
