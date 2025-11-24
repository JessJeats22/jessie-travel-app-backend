import express from 'express'
import morgan from 'morgan'

// * Middleware
import cors from 'cors'

// * Routers

const app = express()

// * Middleware 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// * Connections
// Start Node Server
app.listen(3000, () => console.log('🚀 Server up and running on port 3000'))