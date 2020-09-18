function logErrors (err, req, res, next) {
  console.error('[err] ' + err)

  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(400).send(err)
}

module.exports = {
  logErrors,
  errorHandler
}
