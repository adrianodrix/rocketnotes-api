import { UserCreateService } from './UserCreateService.js'
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory.js'
import AppError from "../utils/AppError.js"

describe('UserCreateService', () => {
    let userRepository
    let userCreateService

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
    })
    
    it('user should be created', async () => {
        const user = {
            name: 'User test',
            email: 'user@test.com',
            password: '123'
        }
    
        const userCreated = await userCreateService.execute( user )
    
        expect(userCreated).toHaveProperty('id')
    })    

    it('user not should be create with exists email ', async () => {
        const user1 = {
            name: 'user test 1',
            email: 'user@test.com',
            password: '123'
        }

        const user2 = {
            name: 'user test 2',
            email: 'user@test.com',
            password: '123456'
        }

        const userCreated1 = await userCreateService.execute( user1 )
        expect(userCreated1).toHaveProperty('id')

        await expect(userCreateService.execute( user2 ))
                .rejects
                .toEqual(new AppError(`${user2.email} is already registered.`))
    })
})
