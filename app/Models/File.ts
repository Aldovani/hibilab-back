import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public ownerId: number

  @column({ serializeAs: null })
  public fileName: string

  @column({ serializeAs: null })
  public fileCategory: 'avatar' | 'thumbnail_course' | 'course_video'

  @computed()
  public get url(): string {
    return `${Env.get('APP_URL')}/uploads/${this.fileName}`
  }
}
