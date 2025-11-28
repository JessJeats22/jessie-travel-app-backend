import mongoose from 'mongoose'

const travelPostSchema = new mongoose.Schema({

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
  image: {type:String}
}, { timestamps: true })

const TravelPost = mongoose.model('TravelPost', travelPostSchema)

export default TravelPost
