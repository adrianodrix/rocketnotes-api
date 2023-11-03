import { Router } from "express"
import usersRouter from "./users.routes.js"
import homeRouter from "./home.routes.js"

const routes = Router()

routes.use('/', homeRouter)
routes.use('/users', usersRouter)

export default routes