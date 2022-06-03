import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/Course/Thumbnail'
import { Course, File } from 'App/Models'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class ThumbnailsController {
  public async show({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const { file } = await request.validate(UpdateValidator)

    const course = await Course.findOrFail(params.id)

    const savePayload = {
      fileCategory: 'thumbnail_course' as any,
      fileName: `${new Date().getTime()}.${file.extname}`,
    }

    const thumbnail = await course
      .related('thumbnailCourse')
      .firstOrCreate({ fileCategory: 'thumbnail_course' }, savePayload)

    await file.move(Application.tmpPath('uploads'), {
      name: thumbnail.fileName,
      overwrite: true,
    })

    return thumbnail
  }

  public async destroy({ params }: HttpContextContract) {
    const thumbnail = await File.query()
      .where({ fileCategory: 'thumbnail_course' })
      .where('ownerId', params.id)
      .firstOrFail()
    thumbnail.delete()
    fs.unlinkSync(Application.tmpPath(`uploads`, thumbnail.fileName))
  }
}
