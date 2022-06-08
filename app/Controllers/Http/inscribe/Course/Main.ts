import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/inscribe/Course/StoreValidator'
import { Course } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MainsController {
  public async show({ auth, params, response }: HttpContextContract) {
    const user = auth.user!

    await user.related('courseSubscription').query().where('course_id', params.id).firstOrFail()

    return response.status(200).json({ message: 'Course subscribed' })
  }

  public async index({ auth }: HttpContextContract) {
    const user = auth.user!
    await user.load('courseSubscription', (courses) => {
      courses.preload('thumbnailCourse')
      courses.preload('classes')
      courses.select('id', 'name', 'teacher', 'difficulty')
    })

    const courses = user.courseSubscription

    const classesWatches = await Database.query()
      .from('classes_watches')
      .where('user_id', user.id)
      .groupBy('course_id')
      .select('course_id', Database.raw('count(*) as total'))

    const formatado = courses.map((courses) => {
      const achou = classesWatches.find((course) => {
        return course.course_id === courses.id
      })

      if (achou) {
        const newCourses = {
          ...courses.toJSON(),
          watched: achou.total,
        }
        return newCourses
      } else {
        const newCourses = { ...courses.toJSON(), watched: 0 }
        return newCourses
      }
    })

    return formatado
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { courseId } = await request.validate(StoreValidator)
    const user = auth.user!
    const course = await Course.findOrFail(courseId)
    await user.related('courseSubscription').attach([course.id])
    return response.status(201).json({ message: 'Course subscribed' })
  }
  public async destroy({ auth, params }: HttpContextContract) {
    const user = auth.user!
    const course = await Course.findOrFail(params.id)
    await user.related('courseSubscription').detach([course.id])
  }
}
