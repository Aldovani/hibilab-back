import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class StripeCustomers extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public status: 'active' | 'inactive'

  @column({ serializeAs: null })
  public userId: number

  @column({ serializeAs: null })
  public stripeId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
