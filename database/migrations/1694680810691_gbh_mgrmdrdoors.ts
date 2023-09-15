import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Location from 'App/Models/Location'

import {
  column,
  BaseModel,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'

export default class extends BaseSchema {
  
  @hasOne(() => Location)

  public location: HasOne<typeof Location>

  protected tableName = 'gbh_mgrmdrdoors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //mgr_doors_state
      //mgr_doors_location
      //mgr_doors_terminal
      table.string('mgr_doors_name').notNullable()
      table.string('mgr_doors_ip').notNullable()
      table.string('mgr_doors_state').notNullable()
      table.integer('mgr_doors_location').notNullable()
      table.integer('mgr_doors_terminal').notNullable()


    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
