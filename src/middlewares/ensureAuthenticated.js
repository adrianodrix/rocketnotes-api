import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js'
import authConfig from '../configs/auth.js'

export default function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        throw new AppError('Token not informed', 401)
    }

    const [, token] = authHeader.split(' ')
    try {
        const { sub: user_id } = jwt.verify(token, authConfig.jwt.secret)
        req.user = {
            id: Number(user_id)
        }

        return next()
    } catch (err) {
        console.error(err)
        throw new AppError('Invalid token', 401)
    }
}