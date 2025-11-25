import express from 'express'
import TravelPost from '../models/travelPost.js'
import isSignedIn from '../middleware/isSignedIn.js'
import User from '../models/user.js'

const router = express.Router()

// * Routes
// All urls are prefixed with: /travelPost

// * CREATE
 router.post('', isSignedIn, async (req, res, next) => {
   try {
       // assures the logged in user is recorded as the author of the travelPost
      req.body.author = req.user._id

      // create new TP in MongoDB passing in boyd of form 
      const newTravelPost = await TravelPost.create(req.body)

      // Return the new TP to the client
      res.status(201).json(newTravelPost)

      console.log("HIT TRAVELPOST POST ROUTE")
      
   } catch (error) {
      next(error)
   }
  
 }
)

// * SHOW 


export default router