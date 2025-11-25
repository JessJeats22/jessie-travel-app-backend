import mongoose from 'mongoose'

const travelEntrySchema = new mongoose.Schema({

  // ERD relationships
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  country: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Country',
    required: true 
  },

  // Key content fields
  location: { 
    type: String, 
    required: true 
  },

  whatTheyDid: { 
    type: String 
  },

  recommendations: { 
    type: String 
  },

  // images stored as array of objects (ideal for URLs + captions)
  images: [{
    url: { type: String, required: true },
    caption: { type: String }
  }]

}, { timestamps: true })

const TravelEntry = mongoose.model('TravelEntry', travelEntrySchema)

export default TravelEntry
