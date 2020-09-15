function logErrors (err, req, res, next) {
  console.error('[err] ' + err)

  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(400).json({
    code: 400,
    message: err.message
  })
}

module.exports = {
  logErrors,
  errorHandler
}
