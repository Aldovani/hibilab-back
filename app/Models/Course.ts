import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Classe } from './index'
import { Difficulty } from 'App/utils'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public teacher: string

  @column()
  public difficulty: Difficulty

  @column()
  public requirements: string

  @hasMany(() => Classe)
  public classes: HasMany<typeof Classe>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
