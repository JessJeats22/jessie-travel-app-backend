import express from 'express'
import Country from '../models/country.js'
import User from '../models/user.js'
import isSignedIn from '../middleware/isSignedIn.js'

const router = express.Router()

// * Routes
// All urls are prefixed with: /country

// * INDEX 
router.get('', async (req, res, next) => {
    try {
        const countries = await Country.find()
        res.json(countries)
        console.log("COUNTRIES SUBMITTED")
    } catch (error) {
        console.log("error", error)
    }
})



// * SHOW 

export default router