import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const isSignedIn = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization

        if (!authHeader) throw new Error('No auth header found')
        // console.log(req.headers)
        // console.log(authHeader.header)

        const token = authHeader.split(' ')[1]
        // console.log(token)

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(payload)

        const user = await User.findById(payload.user._id)

        if (!user) throw new Error('User not found in database')

        req.user = user

        next()

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export default isSignedIn