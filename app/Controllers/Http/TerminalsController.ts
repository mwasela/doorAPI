import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Terminal from 'App/Models/Terminal'

export default class TerminalsController {
  public async index({request, response}: HttpContextContract) {

    const terminals = await Terminal.all()
    return response.status(200).json(terminals)
  }

  //public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
      
      const data = request.only(['mgr_terminal_name'])
      const terminal = await Terminal.create(data)
      return response.status(201).json(terminal)
  }

  public async show({request, response}: HttpContextContract) {
      
      const { id } = request.params()
      const terminal = await Terminal.findOrFail(id)
      return response.status(200).json(terminal)  
  }

 // public async edit({}: HttpContextContract) {}

  public async update({request, response}: HttpContextContract) {

    const { id } = request.params()
    const data = request.only(['mgr_terminal_name'])
    const terminal = await Terminal.findOrFail(id)
    terminal.merge(data)
    await terminal.save()
    return response.status(200).json(terminal)
  }

  public async destroy({request, response}: HttpContextContract) {

    const { id } = request.params()
    const terminal = await Terminal.findOrFail(id)
    await terminal.delete()
    return response.status(200).json({message: 'Terminal deleted'})

  }
}
