
import "dotenv/config.js"
import express from 'express'
import "express-async-errors"
import cors from 'cors'

import database from './database/sqlite/index.js'
import AppError from './utils/AppError.js'
import routes from './routes/index.js'
import uploadConfig from './configs/upload.js'

export const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

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


try {
    // run database
    await database()
    // Run Server
    const PORT = process.env.PORT || 3333
    app.listen(PORT, () => {
        console.clear()
        console.log(`Server is running on port ${PORT}`)
    })
} catch (err) {
    console.error(err)
}