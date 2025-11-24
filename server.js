import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'

// * Middleware
import cors from 'cors'

// * Routers
import authRouter from './controllers/auth.js'


const app = express()

// * Middleware 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// * Routes
app.use('/auth', authRouter)

// * Connections
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🔒 Database connection established')
  } catch (error) {
    console.log(error)
  }
}
connect()



// Start Node Server
app.listen(3000, () => console.log('🚀 Server up and running on port 3000'))