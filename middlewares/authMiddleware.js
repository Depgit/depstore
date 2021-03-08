const authMiddleware = (req, res, next) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = authMiddleware
