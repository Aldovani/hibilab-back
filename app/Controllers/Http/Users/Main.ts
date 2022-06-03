import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/Change'
import { StoreValidator } from 'App/Validators/User/Register'
import { User } from 'App/Models'

export default class MainsController {
  public async show({ auth }: HttpContextContract) {
    const user = await User.query()
      .where('id', auth.user!.id)
      .preload('stripeCustomers')
      .preload('avatar')
      .firstOrFail()

    return user
  }

  public async store({ request }: HttpContextContract) {
    const { email, name, password } = await request.validate(StoreValidator)
    const user = await (await User.create({ email, name, password })).save()

    return user
  }

  public async update({ request, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const user = await auth.user!.merge(data).save()

    return user
  }
}
