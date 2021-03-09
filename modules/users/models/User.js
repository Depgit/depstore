const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is require'],
    maxlength: [64, "Name can't be greater then 64 char"],
    minlength: [2, "Name can't be smaller then 2 char"]
  },
  email: {
    type: String,
    lowercase: true,
    require: [true, 'Email is require'],
    maxlength: [128, "Email can't be greater then 128 char"],
    index: true
  },
  password: {
    type: String,
    require: [true, 'password is require']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

/**
 * Validates Unique email
 */
userSchema.path('email').validate(async (email) => {
  const emailCount = await mongoose.models.users.countDocuments({ email })
  return !emailCount
}, 'Email is already exist')

/**
 * Encrypt password if value is changed
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const User = mongoose.model('users', userSchema)
module.exports = User
