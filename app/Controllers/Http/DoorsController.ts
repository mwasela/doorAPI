import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Door from 'App/Models/Door'
import Accesslog from 'App/Models/Accesslog'
import Mail from '@ioc:Adonis/Addons/Mail'
import Terminal from 'App/Models/Terminal'
import Location from 'App/Models/Location'







export default class DoorsController {

  public async index({ request, response }: HttpContextContract) {

    const doors = await Door
      .query()
      .preload('terminal')
      .preload('location')

    return response.status(200).json(doors)

  }

  //public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    //fields include mgr_doors_state, mgr_doors_location, mgr_doors_terminal
    const data = request.only(['mgr_doors_name', 'mgr_doors_state', 'mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal'])
    const door = await Door.create(data)
    return response.status(201).json(door)

  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const door = await Door.findOrFail(id)
    return response.status(200).json(door)
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      const data = request.only(['mgr_doors_name', 'mgr_doors_state', 'mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal']);
      const door = await Door.findOrFail(id);
  
      const door_state = data.mgr_doors_state;
      const time = Date.now();
  
      door.merge(data);
      await door.save();
  
      const last_log = await Accesslog.query().orderBy('id', 'desc').first();
      const last_door = last_log.gbh_mgrmdraccesslogs_doors;
      const last_state = last_log?.mgr_accesslogs_state;
  
      if (last_door == door.id && last_state == '1') {
        const last_timelog = new Date(last_log.mgr_accesslogs_time).getTime();
        const time_diff = time - last_timelog;
  
        if (time_diff > 120000 && door_state == '0') {
          // Door has been closed after being opened for more than 2 minutes, send email
          const doordata = await Door.query().where('id', id).preload('terminal').preload('location').firstOrFail();
          await Mail.send((message) => {
            message
              .from('ictadmin.noreply@grainbulk.com')
              .to('michael.mwasela@bulkstream.co')
              .subject('BulkStream Door Alerts')
              .htmlView('emails/doorstatus', { door: doordata });
          });
        }
      }
  
      if (door_state !== last_state) {
        await Accesslog.create({
          mgr_accesslogs_state: door.mgr_doors_state,
          gbh_mgrmdraccesslogs_doors: door.id,
          gbh_mgrmdraccesslogs_locations: door.mgr_doors_location,
          gbh_mgrmdraccesslogs_terminal: door.mgr_doors_terminal,
        });
      } else {
        return response.status(202).json(door);
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  public async destroy({ request, response }: HttpContextContract) {

    const { id } = request.params()
    const door = await Door.findOrFail(id)
    await door.delete()
    return response.status(200).json({ message: 'Door deleted' })

  }
}



class UsersController {
  public async store() {
    await Mail.send((message) => {
      message
        .from('info@example.com')
        .to('virk@adonisjs.com')
        .subject('Welcome Onboard!')
        .htmlView('emails/welcome', { name: 'Virk' })
    })
  }
}
