import { Router } from "express"
import multer from 'multer'

import UsersController from "../controllers/UsersController.js"
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js'
import uploadConfig from "../configs/upload.js"
import { UserAvatarController } from "../controllers/UserAvatarController.js"

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

function myMiddleware(req, res, next) {
    const { isAdmin } = req.body
    if(!isAdmin) {
       return res.status(401).json({ message: "user unauthorized" }) 
    }
    next()
}

const upload = multer(uploadConfig.MULTER)

// Others methods
usersRouter.post('/', usersController.create)

usersRouter.use(ensureAuthenticated)
usersRouter.put('/', usersController.update)
usersRouter.get('/', myMiddleware, usersController.index)
usersRouter.patch('/avatar', upload.single('avatar'), userAvatarController.update)  

export default usersRouter