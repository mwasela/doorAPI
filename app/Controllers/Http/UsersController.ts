import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({request, response }: HttpContextContract) {

    const users = await User.all()
    return response.status(200).json(users)
    
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)
    return response.status(201).json(user)    

  }

  public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  public async update({request , response }: HttpContextContract) {

    const { id } = request.params()
    const data = request.only(['name', 'email', 'password'])
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()
    return response.status(200).json(user)


  }

  public async destroy({request, response}: HttpContextContract) {

    const { id } = request.params()
    const user = await User.findOrFail(id)
    await user.delete()
    return response.status(200).json({message: 'User deleted'})

  }
}
