import express from "express"
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isSignedIn from '../middleware/isSignedIn.js'
import { Unauthorised } from '../utils/errors.js'

const router = express.Router()

// * Routes

router.post('/sign-up', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }

})


router.post('/sign-in', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const userToLogin = await User.findOne({ username: username })

        if (!userToLogin) throw new Unauthorised('Unauthorised')

        if (!bcrypt.compareSync(password, userToLogin.password)) {
            throw new Unauthorised('Unauthorised')
        }

        const token = jwt.sign(
            { user: { _id: userToLogin._id, username: userToLogin.username } },
            process.env.TOKEN_SECRET,
            { expiresIn: '2d' }
        )

        return res.json({ token })
    } catch (error) {
        next(error)
    }

})




export default router