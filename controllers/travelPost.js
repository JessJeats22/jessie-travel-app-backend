import express from 'express'
import TravelPost from '../models/travelPost.js'
import isSignedIn from '../middleware/isSignedIn.js'
import User from '../models/user.js'

const router = express.Router()

// * Routes
// All urls are prefixed with: /travelPost

// * CREATE
 router.post('', isSignedIn, async (req, res, next) => {
    res.json({ message: "HIT TRAVELPOST POST ROUTE"})
    console.log("HIT TRRAVELPOST POST ROUTE")
 }
)



// * SHOW 


export default router