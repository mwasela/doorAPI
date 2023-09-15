import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GbhMgrmdrterminal extends BaseModel {

  //table name
  public static table = 'gbh_mgrmdrterminals'

  @column({ isPrimary: true })
  public id: number

  @column()
  public mgr_terminal_name: string
}
