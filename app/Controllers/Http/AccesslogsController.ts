import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Accesslog from 'App/Models/Accesslog'

export default class AccesslogsController {
  public async index({request, response}: HttpContextContract) {

    const accesslogs = await Accesslog.query().orderBy('id', 'desc').preload('terminal').preload('location')
    return response.status(200).json(accesslogs)
  }

 // public async create({request, response}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {

    const data = request.only(['mgr_accesslogs_time', 'mgr_accesslogs_state', 'gbh_mgrmdraccesslogs_doors', 'gbh_mgrmdraccesslogs_locations', 'gbh_mgrmdraccesslogs_terminal'])
    const accesslog = await Accesslog.create(data)
    return response.status(201).json(accesslog)
  }

  public async show({request, response}: HttpContextContract) {

    const { id } = request.params()
    const accesslog = await Accesslog.findOrFail(id)
    return response.status(200).json(accesslog)
  }

  //public async edit({}: HttpContextContract) {}

  public async update({request, response}: HttpContextContract) {
      
      const { id } = request.params()
      const data = request.only(['mgr_accesslogs_time', 'mgr_accesslogs_state', 'gbh_mgrmdraccesslogs_doors', 'gbh_mgrmdraccesslogs_locations', 'gbh_mgrmdraccesslogs_terminal'])
      const accesslog = await Accesslog.findOrFail(id)
      accesslog.merge(data)
      await accesslog.save()
      return response.status(200).json(accesslog)

  }

  public async destroy({request, response}: HttpContextContract) {

    const { id } = request.params()
    const accesslog = await Accesslog.findOrFail(id)
    await accesslog.delete()
    return response.status(200).json({message: 'Accesslog deleted'})
  }
}
