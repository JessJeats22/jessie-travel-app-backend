import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    favouritedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPost"
    }
  ]

})

const User = mongoose.model('User', userSchema)

export default User