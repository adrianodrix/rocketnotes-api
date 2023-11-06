
import express from 'express'
import "express-async-errors"

import AppError from './utils/AppError.js'
import routes from './routes/index.js'

export const app = express()

app.use(express.json())
app.use(routes)

app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
})

// Run Server
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
