import express from "express"

const router = express.Router()

// * Routes

router.post('/sign-up', async (req, res) => {
    return res.json({ message: 'HIT SIGN UP ROUTE'})
})

export default router