function notFoundHandler (req, res) {
  res.status(404).json({
    code: 404,
    message: 'Page not Found'
  })
}

module.exports = notFoundHandler
