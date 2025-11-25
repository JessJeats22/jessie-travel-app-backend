import express from 'express'
import Country from '../models/country.js'
import User from '../models/user.js'
import isSignedIn from '../middleware/isSignedIn.js'
import { NOTFOUND } from 'dns'

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
        next(error)
    }
})


// * SHOW 
router.get('/:countryId', async (req, res, next) => {
try {
    const {countryId} = req.params
    const country = await Country.findById(countryID)

    if(!country) throw new NOTFOUND('Country not found')
    res.json(country)
    console.log("COUNTRY HAS BEEN LOCATED")
} catch (error) {
    next(error)
    
}
}
)

export default router