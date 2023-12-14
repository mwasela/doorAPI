import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Door from 'App/Models/Door'

export default class extends BaseSeeder {
  public async run () {
    await Door.createMany([
      {
        id: 8,
        mgr_doors_name: 'TB GEN ROOM',
        mgr_doors_ip: '10.168.8.100',
        mgr_doors_state: '0',
        mgr_doors_location: '1',
        mgr_doors_terminal: '2',
        },
        {
        id: 2,
        mgr_doors_name: 'K1 MCC',
        mgr_doors_ip: '10.168.8.101',
        mgr_doors_state: '0',
        mgr_doors_location: "1",
        mgr_doors_terminal: "1",
        },
        {
        id: 3,
        mgr_doors_name: 'Door 3',
        mgr_doors_ip: '10.168.8.102',
        mgr_doors_state: '0',
        mgr_doors_location: "1",
        mgr_doors_terminal: "1",
        },
        {
        id: 4,
        mgr_doors_name: 'Door 4',
        mgr_doors_ip: '10.168.8.103',
        mgr_doors_state: '0',
        mgr_doors_location: "1",
        mgr_doors_terminal: "1",
        },
        {
        id: 5,
        mgr_doors_name: 'Door 5',
        mgr_doors_ip: '10.168.8.100',
        mgr_doors_state: '0',
        mgr_doors_location: "1",
        mgr_doors_terminal: "1",
        },
        {
        id: 6,
        mgr_doors_name: 'Door 6',
        mgr_doors_ip: '10.168.8.100', 
        mgr_doors_state: '0',
        mgr_doors_location: "1",
        mgr_doors_terminal: "1",
        }
    ])
}
}


