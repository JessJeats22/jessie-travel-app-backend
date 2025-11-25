import express from 'express'
import TravelPost from '../models/travelPost.js'
import isSignedIn from '../middleware/isSignedIn.js'
import User from '../models/user.js'
import { Forbidden, NotFound } from '../utils/errors.js'

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
router.get('/:travelPostId', isSignedIn, async (req, res, next) => {

   try {
      const { travelPostId } = req.params

      const travelPost = await TravelPost.findById(travelPostId).populate("author").populate("country")

      if (!travelPost) throw new NotFound('Travel Post not found.')

      return res.status(200).json(travelPost)


      console.log("IT TRAVELPOST POST ROUTE")

   } catch (error) {
      next(error)
   }
}
)

// * UPDATE
router.put('/:travelPostId', isSignedIn, async (req, res, next) => {
   try {

      const { travelPostId } = req.params

      const travelPost = await TravelPost.findById(travelPostId)
      if (!travelPost) throw new NotFound('Travel Post not found')

      if (!travelPost.author.equals(req.user._id)) {
         throw new Forbidden('You do not have permission to access this resource.')
      }

      const updatedTravelPost = await TravelPost.findByIdAndUpdate(travelPostId, req.body, { returnDocument: 'after' })

      res.json(updatedTravelPost)
      console.log(updatedTravelPost)

   } catch (error) {
      next(error)
   }
})


// * DELETE

router.delete('/:travelPostId', isSignedIn, async (req, res, next) => {
   try {

      const { travelPostId } = req.params
      const deletePost = await TravelPost.findById(travelPostId)
      if (!deletePost) throw new NotFound('Post not found.')


      if (!deletePost.author.equals(req.user._id)) {
         throw new Forbidden('You do not have permission to access this resource.')
      }



      await TravelPost.findByIdAndDelete(travelPostId)

      res.sendStatus(204)
      console.log("POST DELETED")

   } catch (error) {
      next(error)
   }


})



export default router