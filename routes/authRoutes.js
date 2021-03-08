/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormater } = require('../utils/validationFormator')
const passport = require('passport')
const guestMiddleware = require('../middlewares/geustMiddleware')

/**
 * Shows page for user registration
 */

router.get('/register', guestMiddleware, (req, res) => {
  return res.render('register')
})

/**
 * Handles user registration
 */

router.post('/register', guestMiddleware, async (req, res) => {
  try {
    // validating the user input present in req.body
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      console.log(joiErrorFormatter(validationResult.error))
      return res.render('register', {
        message: {
          type: 'error',
          body: 'Validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      })
    }
    const user = await addUser(req.body)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'successfully registered'
      },
      errors: {},
      formData: req.body
    })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Validation Errors'
      },
      errors: mongooseErrorFormater(e),
      formData: req.body
    })
  }
})

/**
 * Shows page for user login
 */

router.get('/login', (req, res) => {
  return res.render('login')
})

/**
 * Login in a user
 */

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {
  return res.render('login', {
    message: {
      type: 'success',
      body: 'login success'
    },
    errors: {},
    formData: {}
  })
})

module.exports = router
