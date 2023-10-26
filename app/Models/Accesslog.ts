import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class GbhMgrmdraccesslog extends BaseModel {

  //table name
  public static table = 'gbh_mgrmdraccesslogs'

  @column({ isPrimary: true })
  public id: number

  @column()
  public mgr_accesslogs_time: Date

  @column()
  public mgr_accesslogs_state: string

  @column()
  public gbh_mgrmdraccesslogs_doors: number

  @column()
  public gbh_mgrmdraccesslogs_locations: string

  @column()
  public gbh_mgrmdraccesslogs_terminal: string




}
