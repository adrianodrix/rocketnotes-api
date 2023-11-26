import bcrypt from 'bcryptjs'
import AppError from "../utils/AppError.js"

export class UserCreateService {
    userRepository

    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email)
        if (checkUserExists) {    
            throw new AppError(`${email} is already registered.`)
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        return await this.userRepository.create({ name, email, password: hashedPassword })
    }
}