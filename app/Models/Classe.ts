import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { Course, File } from './index'

export default class Classe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ columnName: 'course_id', serializeAs: null })
  public courseId: number

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => {
      query.where({ fileCategory: 'course_video' })
    },
    serializeAs: 'video',
  })
  public courseVideo: HasOne<typeof File>

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
