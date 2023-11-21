import fs from 'node:fs'
import path from 'node:path'
import uploadConfig from '../configs/upload.js'

export class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        try {
            await fs.promises.stat(path.resolve(uploadConfig.TMP_FOLDER, file))
            await fs.promises.unlink(path.resolve(uploadConfig.TMP_FOLDER, file))
        } catch {
            //
        }

        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)
    }
}