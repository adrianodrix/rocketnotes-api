import express from 'express'
import routes from './routes/index.js'

const app = express()

app.use(express.json())
app.use(routes)

// Run Server
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
