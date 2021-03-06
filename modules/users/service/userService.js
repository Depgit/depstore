const User = require('../models/User')

/**
 *
 * create a new user and return it
 * @param {Object} userInput = it is user input with all variable for user modules
 *
 */

const addUser = async (userInput) => {
  const user = new User(userInput)
  await user.save()
  return user
}

module.exports = { addUser }
