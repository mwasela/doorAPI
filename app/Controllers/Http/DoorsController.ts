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

  //public async edit({}: HttpContextContract) {}

  // public async update({request, response}: HttpContextContract) {

  //   const { id } = request.params()
  //   const data = request.only(['mgr_doors_name','mgr_doors_state','mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal'])
  //   const door = await Door.findOrFail(id)
  //   door.merge(data)
  //   await door.save()
  //   let lastState = request.only['mgr_doors_state']



  //   const accesslog = await Accesslog.query().orderBy('id', 'desc').first()


  //   if (!accesslog || accesslog.mgr_accesslogs_state != lastState) {

  //     await Accesslog.create({
  //       // mgr_accesslogs_time: new Date(),
  //       mgr_accesslogs_state: door.mgr_doors_state,
  //       gbh_mgrmdraccesslogs_doors: id,
  //       gbh_mgrmdraccesslogs_locations: door.mgr_doors_location,
  //       gbh_mgrmdraccesslogs_terminal: door.mgr_doors_terminal
  //     })
  //   }
  //   // lastState = accesslog.mgr_accesslogs_state
  //   return response.status(200).json(door)

  // }

  // public async update({ request, response }: HttpContextContract) {
  //   try {
  //     const { id } = request.params();
  //     const data = request.only(['mgr_doors_name', 'mgr_doors_state', 'mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal']);
  //     const door = await Door.findOrFail(id);
  //     door.merge(data);
  //     await door.save();
  
  //     // Detect state change and update access log model table
  //     const accesslog = await Accesslog.query().orderBy('id', 'desc').first();
  //     const lastState = accesslog.mgr_accesslogs_state;
  //     const currentState = door.mgr_doors_state;
  
  //     // Use a boolean flag to check if an entry has been created for the current state change
  //     let entryCreated = false;
  
  //     if (lastState !== currentState) {
  //       // Only update access log if there's a state change and an entry hasn't been created yet
  //       if (!entryCreated) {
  //         await Accesslog.create({
  //           mgr_accesslogs_state: door.mgr_doors_state,
  //           gbh_mgrmdraccesslogs_doors: door.id,
  //           gbh_mgrmdraccesslogs_locations: door.mgr_doors_location,
  //           gbh_mgrmdraccesslogs_terminal: door.mgr_doors_terminal
  //         });
  
  //         // Set the flag to true to indicate that an entry has been created for the current state change
  //         entryCreated = true;
  
  //         const doordata = await Door.query().where('id', id).preload('terminal').preload('location').firstOrFail()
  
  //         // Send email simple without HTML view
  //         if (door.mgr_doors_state == '1') {
  //           await Mail.send((message) => {
  //             message
  //               .from('ictadmin.noreply@grainbulk.com')
  //               .to('michael.mwasela@grainbulk.com')
  //               .subject('Door Status Infringement')
  //               .htmlView('emails/doorstatus', { door: doordata })
  //           })
  //         }
  //       }
  //     } else {
  //       // Reset the flag only when the state changes from 1 to 0
  //       if (currentState === '0') {
  //         entryCreated = false;
  //       }
  //     }
  
  //     return response.status(200).json(door);
  //   } catch (error) {
  //     console.error(error);
  //     return response.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
  
  public async update({request, response}: HttpContextContract){

    try {
  
      const { id } =  request.params();
      const data = request.only(['mgr_doors_name', 'mgr_doors_state', 'mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal']);
        const door = await Door.findOrFail(id);
        const door_state =  data.mgr_doors_state;
        door.merge(data);
        await door.save();
  
  
        const last_log = await Accesslog.query().orderBy('id', 'desc').first();
        console.log("last log",last_log);
        const last_state = last_log?.mgr_accesslogs_state;
        console.log("last state",last_state);
  
        if (door_state !== last_state){
          await Accesslog.create({
  
            mgr_accesslogs_state: door.mgr_doors_state,
              gbh_mgrmdraccesslogs_doors: door.id,
              gbh_mgrmdraccesslogs_locations: door.mgr_doors_location,
              gbh_mgrmdraccesslogs_terminal: door.mgr_doors_terminal
  
          })
        } else {
          return response.status(202).json(door);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
  }


  // public async update({ request, response }: HttpContextContract) {
  //   const { id } = request.params();
  //   const data = request.only(['mgr_doors_name', 'mgr_doors_state', 'mgr_doors_ip', 'mgr_doors_location', 'mgr_doors_terminal']);
  //   const door = await Door.findOrFail(id);
  //   door.merge(data);
  //   await door.save();

  //   // Detect state change and update access log model table
  //   const accesslog = await Accesslog.query().orderBy('id', 'desc').first();
  //   const lastState = accesslog.mgr_accesslogs_state;
  //   const currentState = door.mgr_doors_state;

  //   // Use a boolean flag to check if an entry has been created for the current state change
  //   let entryCreated = false;

  //   if (lastState !== currentState) {
  //     // Only update access log if there's a state change and an entry hasn't been created yet
  //     if (!entryCreated) {
  //       await Accesslog.create({
  //         mgr_accesslogs_state: door.mgr_doors_state,
  //         gbh_mgrmdraccesslogs_doors: door.id,
  //         gbh_mgrmdraccesslogs_locations: door.mgr_doors_location,
  //         gbh_mgrmdraccesslogs_terminal: door.mgr_doors_terminal
  //       });

  //       // Set the flag to true to indicate that an entry has been created for the current state change
  //       entryCreated = true;

  //       const doordata = await Door.query().where('id', id).preload('terminal').preload('location').firstOrFail()

  //       //send email simple without html view
  //       if (door.mgr_doors_state == '1') {
  //         await Mail.send((message) => {
  //           message
  //             .from('ictadmin.noreply@grainbulk.com')
  //             .to('michael.mwasela@grainbulk.com')
  //             .subject('Door Status Infringement')
  //             //terminal and location are foreign keys in the door model
  //             .htmlView('emails/doorstatus', { door: doordata })

  //         })
  //     }


  //     } else {
  //       // Reset the flag if there's no state change
  //       entryCreated = false;
  //     }

  //     return response.status(200).json(door);
  //   }
  // }


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
