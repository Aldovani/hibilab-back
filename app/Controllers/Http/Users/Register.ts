import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/User/Register'
import { User } from 'App/Models'

export default class RegisterController {
  public async store({ request }: HttpContextContract) {
    const { email, name, password } = await request.validate(StoreValidator)
    const user = await (await User.create({ email, name, password })).save()

    return user
  }
}
