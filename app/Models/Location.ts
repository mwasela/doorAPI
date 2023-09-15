
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GbhMgrmdrlocation extends BaseModel {

  //table name
  public static table = 'gbh_mgrmdrlocations'

  @column({ isPrimary: true })
  public id: number

  @column()
  public mgr_location_name: string

  @column()
  public mgr_location_terminal: string

}

