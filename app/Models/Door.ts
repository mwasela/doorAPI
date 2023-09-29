import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import GbhMgrmdrterminal from './Terminal'
import GbhMgrmdrlocation from './Location'

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

  @belongsTo(() => GbhMgrmdrterminal, {
    foreignKey: 'mgr_doors_terminal',
  })
  public terminal: BelongsTo<typeof GbhMgrmdrterminal>

  @belongsTo(() => GbhMgrmdrlocation, {
    foreignKey: 'mgr_doors_location',
  })
  public location: BelongsTo<typeof GbhMgrmdrlocation>
  

}
