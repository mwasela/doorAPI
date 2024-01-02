import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'



export default class LoginController {

    public async login({request, response, auth}: HttpContextContract) {

        const { email, password } = request.all()

        const user = await User.findByOrFail('email', email)

        if(!user){
            return response.status(401).json({message: 'User not found'})
        }

        if(!(await Hash.verify(user.password, password))){
            return response.status(401).json({message: 'Invalid password'})
        }

        const token = await auth.use('api').generate(user)

        return response.status(200).json({token: token.toJSON(), user: user})

    }
}
