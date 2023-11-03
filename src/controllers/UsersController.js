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
    index(req, res) {
        const { page, limit } = req.query
        res.send(`Page: ${page}. See: ${limit}.`)
    }

    create(req, res) {
        const { name, email, password } = req.body
        res.status(201).json({
            name, email, password
        })
    }
}
