exports.success = ({ req, res, message, data, status }) => {
  res.status(status || 200).json({
    message,
    data
  })
}

exports.error = ({ req, res, message, status, details }) => {
  console.error('[response error] ' + details)

  res.status(status || 500).json({
    'error-code': 1,
    message
  })
}
