/* eslint-disable array-callback-return */
const joiErrorFormatter = (rawErrors) => {
  const errors = {}
  const details = rawErrors.details
  details.map(d => {
    errors[d.path] = [d.message]
  })
  return errors
}

const mongooseErrorFormater = (rawErrors) => {
  const errors = {}
  const details = rawErrors.errors
  for (const key in details) {
    errors[key] = [details[key].message]
  }
  return errors
}

module.exports = { joiErrorFormatter, mongooseErrorFormater }
