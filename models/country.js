import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({

  name: { type: String, unique: true, required: true },
  population: { type: Number, required: true },
  flag: { type: String },


  description: { type: String },
  capitalCity: { type: String },
  continent: { type: String },
  languages: [{ type: String }],
  currency: { type: String },
  imageUrl: { type: String },


  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Country = mongoose.model('Country', countrySchema)

export default Country

