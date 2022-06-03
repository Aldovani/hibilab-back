import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/inscribe/Course/StoreValidator'
import { Course } from 'App/Models'

export default class MainsController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!
    await user.load('courseSubscription')

    return user
  }

  public async store({ auth, request }: HttpContextContract) {
    const { courseId } = await request.validate(StoreValidator)
    const user = auth.user!
    const course = await Course.findOrFail(courseId)
    await user.related('courseSubscription').attach([course.id])
  }
}
