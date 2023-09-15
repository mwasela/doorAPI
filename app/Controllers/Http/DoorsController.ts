import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  Door from 'App/Models/Door'

export default class DoorsController {
  public async index({request, response}: HttpContextContract) {

    const doors = await Door.all()
    return response.status(200).json(doors)

  }

  //public async create({}: HttpContextContract) {}

  public async store({request, response }: HttpContextContract) {
    //fields include mgr_doors_state, mgr_doors_location, mgr_doors_terminal
    const data = request.only(['mgr_doors_name','mgr_doors_state','mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal'])
    const door = await Door.create(data)
    return response.status(201).json(door)

  }

  public async show({request, response}: HttpContextContract) {

    const { id } = request.params()
    const door = await Door.findOrFail(id)
    return response.status(200).json(door)

  }

  //public async edit({}: HttpContextContract) {}

  public async update({request, response}: HttpContextContract) {

    const { id } = request.params()
    const data = request.only(['mgr_doors_name','mgr_doors_state','mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal'])
    const door = await Door.findOrFail(id)
    door.merge(data)
    await door.save()
    return response.status(200).json(door)

  }

  public async destroy({request, response}: HttpContextContract) {

    const { id } = request.params()
    const door = await Door.findOrFail(id)
    await door.delete()
    return response.status(200).json({message: 'Door deleted'})

  }
}
