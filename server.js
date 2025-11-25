import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'


// * Middleware
import cors from 'cors'
import isSignedIn from './middleware/isSignedIn.js'
// import errorHandler from './middleware/errorHandler.js'

// * Routers
import authRouter from './controllers/auth.js'
import countryRouter from './controllers/country.js'
import travelPostRouter from './controllers/travelPost.js'

const app = express()

// * Middleware 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// * Routes
app.use('/auth', authRouter)
app.use('/country', countryRouter)
app.use('/travelPost', travelPostRouter)

// // * Error handling middleware
// // Always defined with 4 arguments
// app.use(errorHandler)

// Access should only be granted to this route if the client has provided a valid authentication token
app.get('/secure-route', isSignedIn, (req, res) => {
  console.log('REQ.USER FROM ROUTE HANDLER', req.user)
  return res.json({ message: 'You have accessed the secure route' })
})

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