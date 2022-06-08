import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { Course, StripeCustomers, File, UserKey } from 'App/Models'
import Classe from './Classe'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public permission: 'admin' | 'student'

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @hasOne(() => StripeCustomers, { serializeAs: 'subscription' })
  public stripeCustomers: HasOne<typeof StripeCustomers>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => {
      query.where({ fileCategory: 'avatar' })
    },
  })
  public avatar: HasOne<typeof File>

  @manyToMany(() => Course, {
    serializeAs: 'Courses',
    pivotTable: 'user_courses',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'course_id',
  })
  public courseSubscription: ManyToMany<typeof Course>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
