import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class StripeCustomers extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: 'basic' | 'premium' | 'deluxe'

  @column()
  public status: 'active' | 'inactive'

  @column()
  public userId: number

  @column()
  public stripeId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
