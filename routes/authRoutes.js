const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormater } = require('../utils/validationFormator')

/**
 * Shows page for user registration
 */

router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

/**
 * Handles user registration
 */

router.post('/register', async (req, res) => {
  try {
<<<<<<< HEAD
    // validating the user input present in req.body
    const validationResult = registerSchema.validate(req.body)
    // if(validationResult.error){
    //   return res.render('register', { message: 'validation error' })
    // }
    return res.send(validationResult)
    const user = await addUser(req.body)
    return res.render('register', { message: 'Registration successfull' })
  } catch (e) {
    console.log(e)
    return res.send(e)
=======
    // // validating the user input present in req.body
    // const validationResult = registerSchema.validate(req.body , {
    //   abortEarly : false
    // })
    // if (validationResult.error) {
    //   return res.send(joiErrorFormatter(validationResult.error))
    //   return res.render('register', { message: 'validation error' })
    // }
    // return res.send(validationResult)
    const user = await addUser(req.body)
    return res.render('register', { message: 'Registration successfull' })
  } catch (e) {
    console.error(e)
    return res.send(mongooseErrorFormater(e))
>>>>>>> day_10
    return res.status(400).render('register', { message: 'Something went wrong' })
  }
})

module.exports = router
