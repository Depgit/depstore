/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormater } = require('../utils/validationFormator')
const passport = require('passport')
const guestMiddleware = require('../middlewares/geustMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const flasherMiddleware = require('../middlewares/flasherMiddleware')

/**
 * Shows page for user registration
 */

router.get('/register', guestMiddleware, flasherMiddleware, (req, res) => {
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
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/register')
    }
    const user = await addUser(req.body)
    return res.render('index', {
      message: {
        type: 'success',
        body: 'successfully registered'
      },
      errors: {},
      formData: req.body
    })
  } catch (e) {
    console.error(e)
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'registration failed'
      },
      errors: {},
      formData: req.body
    }
    return res.redirect('/register')
  }
})

/**
 * Shows page for user login
 */

router.get('/login', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('login')
})

/**
 * Login in a user
 */

router.post('/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Err:', err)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Login failed'
        }
      }
      return res.redirect('/login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.error
        }
      }
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Err:', err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login failed'
          }
        }
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

/**
   * logout out a user
   */

router.get('/logout', authMiddleware, (req, res) => {
  req.logout()
  req.session.flashData = {
    message: {
      type: 'success',
      body: 'Logout success'
    }
  }
  return res.redirect('/')
})

module.exports = router
