const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is require'],
    maxlength: [64, "Name can't be greater then 64 char"],
    minlength: [2, "Name can't be smaller then 2 char"]
  },
  email: {
    type: String,
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

const User = mongoose.model('users', userSchema)
module.exports = User
