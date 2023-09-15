import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GbhMgrmdrdoor extends BaseModel {

  //table name
  public static table = 'gbh_mgrmdrdoors'

  @column({ isPrimary: true })
  public id: number

  @column()
  public mgr_doors_name: string

  @column()
  public mgr_doors_ip: string

  @column()
  public mgr_doors_state: string

  @column()
  public mgr_doors_location: string

  @column()
  public mgr_doors_terminal: string
}
