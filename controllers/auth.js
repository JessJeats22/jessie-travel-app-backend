import express from "express"
import User from '../models/user.js'

const router = express.Router()

// * Routes

router.post('/sign-up', async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.json(user)
    } catch (error) {
        console.log(error)
    }

})

export default router