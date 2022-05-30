import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Course/Register'
import { Course } from 'App/Models'

export default class CoursesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1 } = request.qs()
    const courses = await (await Course.query().orderBy('id', 'asc').paginate(page, 6)).serialize()

    return courses
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const course = await Course.create(data)
    return course
  }

  public async show({ params }: HttpContextContract) {
    const course = await Course.findOrFail(params.id)
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
    await course.delete()
  }
}
