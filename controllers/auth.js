import express from "express"
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

// * Routes

router.post('/sign-up', async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }

})


router.post('/sign-in', async (req, res) => {
    try {
            const { username, password } = req.body
      // Find user
     const userToLogin = await User.findOne({ username: username })

     console.log('plain text' , password)
    console.log('hash', userToLogin.password)

     if (!bcrypt.compareSync(password, userToLogin.password)) {
      // Send an error
      throw new Error('Unauthorised') }

      const token =jwt.sign(
       { user: { _id: userToLogin._id, username: userToLogin.username } },
      process.env.TOKEN_SECRET,
      { expiresIn: '2d' }
    )
     
     return res.json ({token})
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }

})




export default router