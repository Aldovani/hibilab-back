import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
  computed,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { Classe, File } from './index'
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

  @hasOne(() => File, {
    serializeAs: 'thumbnail',
    foreignKey: 'ownerId',
    onQuery: (query) => {
      query.where({ fileCategory: 'thumbnail_course' })
    },
  })
  public thumbnailCourse: HasOne<typeof File>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
