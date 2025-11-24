import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

userSchema.pre('save', function(next){
  
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, 12)
  }
  // Once we're done, move on (reminder its middleware so needs a next())
  next()
})

const User = mongoose.model('User', userSchema)

export default User