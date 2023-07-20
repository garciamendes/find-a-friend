// Node
import crypto from 'node:crypto'

// Third party
import multer from 'fastify-multer/'
import path from 'path'

const pathImage = path.join(__dirname, '..', '/images')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${pathImage}`)
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err)

      const filename = `${hash.toString('hex')}-${file.originalname}`
      cb(null, filename)
    })
  },
})

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: function (request, file, cb) {
    const allowedMimes = ['image/png', 'image/jpeg']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  },
})
