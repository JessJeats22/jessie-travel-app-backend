import express from 'express'
import Country from '../models/country.js'
import { NotFound } from '../utils/errors.js'
import TravelPost from '../models/travelPost.js'



const router = express.Router()

// * Routes
// All urls are prefixed with: /country

// * INDEX 
router.get('', async (req, res, next) => {
    try {
        const countries = await Country.find()
        res.status(200).json(countries)

    } catch (error) {
        next(error)
    }
})


// * SHOW 
router.get('/:countryId', async (req, res, next) => {
    try {
        const { countryId } = req.params
        const country = await Country.findById(countryId)

        if (!country) throw new NotFound('Country not found')

        const relatedPosts = await TravelPost.find({ country: country._id })
        res.status(200).json({
            country: country,
            relatedPosts: relatedPosts
        })

    } catch (error) {
        next(error)

    }
}
)
export default router