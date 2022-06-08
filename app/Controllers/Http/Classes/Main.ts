import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Classes'
import { Course, Classe } from 'App/Models'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'

export default class MainsController {
  public async index({ params }: HttpContextContract) {
    const course = await Course.findByOrFail('id', params.id)
    await course.load('classes', (query) => {
      query.preload('courseVideo')
    })
    return course.classes
  }

  public async store({ request }: HttpContextContract) {
    const { id, name } = await request.validate(StoreValidator)
    const classroom = (await Course.findOrFail(id)).related('classes').create({ name })
    return classroom
  }

  public async update({ request, params }: HttpContextContract) {
    const { name } = await request.validate(UpdateValidator)
    const classe = (await Classe.findByOrFail('id', params.id)).merge({ name }).save()
    return classe
  }

  public async destroy({ params }: HttpContextContract) {
    const classe = await Classe.findByOrFail('id', params.id)

    const video = await classe.related('courseVideo').query().first()

    if (video) {
      await video.delete()
      fs.unlinkSync(Application.tmpPath(`uploads`, video.fileName))
    }
    await classe.delete()
  }
}
