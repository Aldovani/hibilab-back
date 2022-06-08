import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreValidator from 'App/Validators/inscribe/Classe/StoreValidator'
import { Course } from 'App/Models'
export default class MainsController {
  public async show({ auth, params }: HttpContextContract) {
    const user = auth.user!
    const result = await Database.query().from('classes_watches').select('class_id').where({
      user_id: user.id,
      course_id: params.id,
    })

    return result
  }
  public async index({ auth, params }: HttpContextContract) {
    const user = auth.user!
    user.related('courseSubscription')
    const result = await Database.query().from('classes_watches').select('class_id').where({
      user_id: user.id,
      course_id: params.id,
    })

    return result
  }
  public async store({ request, auth }: HttpContextContract) {
    const { classeId, courseId } = await request.validate(StoreValidator)
    const user = auth.user!

    const course = await Course.query().where({ id: courseId }).firstOrFail()
    await course?.load('classes')
    const aulas = course.classes.find((classe) => classe.id === classeId)

    if (aulas === undefined) {
      throw new Error('Aula não encontrada')
    }

    const result = await Database.table('classes_watches').insert({
      user_id: user.id,
      class_id: classeId,
      course_id: courseId,
    })

    return result
  }
  public async destroy({ request, auth }: HttpContextContract) {
    const { classeId, courseId } = await request.validate(StoreValidator)
    const user = auth.user!
    const result = await Database.query()
      .from('classes_watches')
      .where({
        user_id: user.id,
        class_id: classeId,
        course_id: courseId,
      })
      .delete()
      .firstOrFail()

    return result
  }
}
