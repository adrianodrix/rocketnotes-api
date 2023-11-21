import path  from 'node:path'
import multer from 'multer'
import crypto from 'crypto'

const TMP_FOLDER = path.resolve(path.dirname(''), 'tmp')
const UPLOADS_FOLDER = path.resolve(path.dirname(''), 'uploads')

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(req, file, cb) {
            const fileHash = crypto.randomBytes(10).toString('hex')
            const fileName = `${fileHash}-${file.originalname}`

            return cb(null, fileName)
        }
    })
}

export default {
    TMP_FOLDER, 
    UPLOADS_FOLDER,
    MULTER
}