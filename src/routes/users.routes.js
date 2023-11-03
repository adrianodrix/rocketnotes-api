import { Router } from "express"
import UsersController from "../controllers/UsersController.js"

const usersRouter = Router()
const usersController = new UsersController()

// Others methods
usersRouter.get('/', usersController.index)
usersRouter.post('/', usersController.create)

export default usersRouter