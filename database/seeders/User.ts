import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Michael Mwasela',
        email: 'michael.mwasela@grainbulk.com',
        password: '123456',
      },
      {
        name: 'Samuel Kimani',
        email: 'samuel.kimani@grainbulk.com',
        password: '123456',
      }
    ])
}
}
