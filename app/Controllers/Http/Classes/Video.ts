import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/Classes/Video'
import Application from '@ioc:Adonis/Core/Application'
import { Classe, File } from 'App/Models'
import fs from 'fs'

export default class VideoController {
  public async update({ request, params }: HttpContextContract) {
    const { file } = await request.validate(UpdateValidator)

    const classe = await Classe.findOrFail(params.id)

    const savePayload = {
      fileCategory: 'course_video' as any,
      fileName: `${new Date().getTime()}.${file.extname}`,
    }

    const video = await classe
      .related('courseVideo')
      .firstOrCreate({ fileCategory: 'course_video' }, savePayload)
    await file.move(Application.tmpPath('uploads'), {
      name: video.fileName,
      overwrite: true,
    })

    return video
  }

  public async destroy({ params }: HttpContextContract) {
    const thumbnail = await File.query()
      .where({ fileCategory: 'course_video' })
      .where('ownerId', params.id)
      .firstOrFail()
    thumbnail.delete()
    fs.unlinkSync(Application.tmpPath(`uploads`, thumbnail.fileName))
  }
}
