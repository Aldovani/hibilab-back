import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/Change'

export default class ChangesController {
  public async update({ request, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const user = await auth.user!.merge(data).save()

    return user
  }
}
