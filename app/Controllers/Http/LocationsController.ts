import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from 'App/Models/Location'

export default class LocationsController {
  public async index({request, response}: HttpContextContract) {

    const locations = await Location.all()
    return response.status(200).json(locations)

  }

  //public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {

    const data = request.only(['mgr_location_name', 'mgr_location_terminal'])
    const location = await Location.create(data)
    return response.status(201).json(location)

  }

  public async show({request, response}: HttpContextContract) {
      
      const { id } = request.params()
      const location = await Location.findOrFail(id)
      return response.status(200).json(location)
  }

  //public async edit({}: HttpContextContract) {}

  public async update({request, response}: HttpContextContract) {

    const { id } = request.params()
    const data = request.only(['mgr_location_name'])
    const location = await Location.findOrFail(id)
    location.merge(data)
    await location.save()
    return response.status(200).json(location)

  }

  public async destroy({}: HttpContextContract) {}
}
