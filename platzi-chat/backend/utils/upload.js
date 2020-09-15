const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
    const index = fileName.lastIndexOf('.')
    const basename = fileName.slice(0, index)

    const name = basename.replace(/ /g, '_')

    cb(null, `${name}_${Date.now() + path.extname(fileName)}`)
  }
})

const upload = multer({
  storage
})

module.exports = upload
