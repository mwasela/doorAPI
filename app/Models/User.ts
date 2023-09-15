import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave,  } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {

  //table name
  public static table = 'gbh_mgrmdrusers'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //hash password before save
  @beforeSave()
  public static async hashPassword(user: User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }


}
