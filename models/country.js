import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
  // key fields 
  name: { type: String, unique: true, required: true },
  population: { type: Number, required: true },
  flag: { type: String },

  // Content fields
  description: { type: String },
  capitalCity: { type: String },
  continent: { type: String },
  languages: [{ type: String }],
  currency: { type: String },

  //  Media field
  imageUrl: { type: String },

  // ERD
  // travelPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelPost' }],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Country = mongoose.model('Country', countrySchema)

export default Country

