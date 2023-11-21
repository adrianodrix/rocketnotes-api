import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import knex from '../database/knex/index.js'
import AppError from '../utils/AppError.js'
import authConfig from '../configs/auth.js'


export default class SessionsController {
    async create(req, res) {
        const { email, password } = req.body

        const user = await knex('users')
                            .where({ email })
                            .first()
        if(!user) {
            throw new AppError('Incorrect email and/or password', 401)
        }

        const passwordMatched = await bcrypt.compare(password, user.password)
        if(!passwordMatched) {
            throw new AppError('Incorrect email and/or password', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = await jwt.sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        const { name, avatar } = user
        return res.json({
            user: {
                name, 
                avatar
            },
            token 
        })
    }
}