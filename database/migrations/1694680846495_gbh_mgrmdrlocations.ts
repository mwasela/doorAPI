import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Terminal from 'App/Models/Terminal'

import {
  column,
  BaseModel,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'

export default class extends BaseSchema {

  @hasOne(() => Terminal) 

  public terminal: HasOne<typeof Terminal>

  protected tableName = 'gbh_mgrmdrlocations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //mgr_location_terminal

      table.integer('mgr_location_terminal').notNullable()

      //mgr_location_name
      table.string('mgr_location_name').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
