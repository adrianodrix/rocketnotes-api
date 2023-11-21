import { response } from 'express'
import knex from '../database/knex/index.js'
import { DiskStorage } from '../providers/DiskStorage.js'
import AppError from '../utils/AppError.js'

export class UserAvatarController {
    async update(req, res) {
        const { id: user_id } = req.user
        const { filename } = req.file
        const diskStorage = new DiskStorage()

        const user = await knex('users')
                            .where({ id: user_id })
                            .first()

        if(!user) {
            throw new AppError('Only authenticated users can change their profile photo', 401)
        }

        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        user.avatar = await diskStorage.saveFile(filename)
        
        await knex('users')
                .update(user)
                .where({ id: user_id })

        return res.json({
            avatar: user.avatar
        })
    }
}