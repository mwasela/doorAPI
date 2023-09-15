import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gbh_mgrmdraccesslogs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //mgr_accesslogs_time
      //mgr_accesslogs_state
      //gbh_mgrmdraccesslogs_doors
      //gbh_mgrmdraccesslogs_locations
      //gbh_mgrmdraccesslogs_terminal

      table.string('mgr_accesslogs_time').notNullable()
      table.string('mgr_accesslogs_state').notNullable()
      table.integer('gbh_mgrmdraccesslogs_doors').notNullable()
      table.integer('gbh_mgrmdraccesslogs_locations').notNullable()
      table.integer('gbh_mgrmdraccesslogs_terminal').notNullable()
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
