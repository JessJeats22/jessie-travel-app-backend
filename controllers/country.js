import express from 'express'
import Country from '../models/country.js'
import { NotFound } from '../utils/errors.js'


const router = express.Router()

// * Routes
// All urls are prefixed with: /country

// * INDEX 
router.get('', async (req, res, next) => {
    try {
        const countries = await Country.find()
        res.status(200).json(countries)
        console.log("COUNTRIES SUBMITTED")
    } catch (error) {
        next(error)
    }
})


// * SHOW 
router.get('/:countryId', async (req, res, next) => {
try {
    const {countryId} = req.params
    const country = await Country.findById(countryId)

    if(!country) throw new NotFound('Country not found')
    res.status(200).json(country)
    console.log("COUNTRY HAS BEEN LOCATED")
} catch (error) {
    next(error)
    
}
}
)

export default router