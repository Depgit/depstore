const Joi = require('@hapi/joi')

// joi is used to validate the userinput properly like we did jwt similarly like that
const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(64)
    .required(),

  password: Joi.string()
    .required(),

  reset_password: Joi.ref('password'),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
})
  .with('password', 'repeat_password')
  // .options({ abortEarly: false })

// oh bhai maro mujhe i just forget this fucking 's' in exports(i wrote export) and these does'nt export properly and getting error since last night khaatam tata bye bye gaya
module.exports = { registerSchema }
