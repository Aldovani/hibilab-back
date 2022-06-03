import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Classe } from 'App/Models'
import StoreValidator from 'App/Validators/inscribe/Classe/StoreValidator'

export default class MainsController {
  public async show({ auth, params }: HttpContextContract) {
    const user = auth.user!
    await user.load('courseSubscription', (query) => {
      query.where('course_id', '=', params.id)
      query.preload('classes', (query) => {})
    })

    return user
  }

  public async store({ auth, request }: HttpContextContract) {
    const { classeId } = await request.validate(StoreValidator)
    const user = auth.user!
    const course = await Classe.findOrFail(classeId)
  }
}
