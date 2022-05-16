import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Course } from 'App/Models'

export default class SearchController {
  public async index({ request }: HttpContextContract) {
    const { name } = request.qs()

    const courses = await Course.query()
      .where('name', 'like', `%${name}%`)
      .orWhere('teacher', 'like', `%${name}%`)
      .paginate(1, 10)

    return courses
  }
}
