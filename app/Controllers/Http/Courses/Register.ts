import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Course/Register'
import { Course } from 'App/Models'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class CoursesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1 } = request.qs()
    const courses = await Course.query()
      .orderBy('id', 'asc')
      .preload('thumbnailCourse')
      .paginate(page, 6)

    return courses
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const course = await Course.create(data)
    return course
  }

  public async show({ params }: HttpContextContract) {
    const course = await Course.findOrFail(params.id)
    await course.related('classes').query().preload('courseVideo')
    await course.load('classes', (classes) => {
      classes.preload('courseVideo')
    })
    await course.load('thumbnailCourse')
    return course
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const course = await Course.findOrFail(params.id)
    course.merge(data)
    await course.save()
    return course
  }

  public async destroy({ params }: HttpContextContract) {
    const course = await Course.findOrFail(params.id)
    const aulas = await course.related('classes').query().preload('courseVideo')
    if (aulas.length > 0) {
      for (const aula of aulas) {
        if (aula.courseVideo) {
          await aula.courseVideo.delete()
          fs.unlinkSync(Application.tmpPath(`uploads`, aula.courseVideo.fileName))
        }
        await aula.delete()
      }
    }
    const thumbnail = await course.related('thumbnailCourse').query().first()
    if (thumbnail) {
      await thumbnail.delete()
      fs.unlinkSync(Application.tmpPath(`uploads`, thumbnail.fileName))
    }
    await course.delete()
    return aulas
  }
}
