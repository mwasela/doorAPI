import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import GbhMgrmdrterminal from './Terminal'
import GbhMgrmdrlocation from './Location'

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

  //gbh_mgrmdraccesslogs_locations and gbh_mgrmdraccesslogs_terminal are foreign keys to the GbhMgrmdrlocation and GbhMgrmdrterminal tables
  @belongsTo(() => GbhMgrmdrterminal, {
    foreignKey: 'gbh_mgrmdraccesslogs_terminal',
  })
  public terminal: BelongsTo<typeof GbhMgrmdrterminal>
  
  @belongsTo(() => GbhMgrmdrlocation, {
    foreignKey: 'gbh_mgrmdraccesslogs_locations',
  })
  public location: BelongsTo<typeof GbhMgrmdrlocation>


}
