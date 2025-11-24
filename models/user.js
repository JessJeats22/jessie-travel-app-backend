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

userSchema
  .virtual('confirmPassword')
    .set(function(passwordValue){
    this._confirmPassword = passwordValue
  }, {

  })



//  Pre validation step to compare password
userSchema.pre('validate', function(next){

  if (this.isModified('password') && this.password !== this._confirmPassword) {
    // Invalidate request
    this.invalidate('confirmPassword', 'Please ensure both passwords match.')
  }
  // Run next() when this function is complete to move onto the next middleware
  next()
})



userSchema.pre('save', function(next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, 12)
  }

  next()
})

const User = mongoose.model('User', userSchema)

export default User