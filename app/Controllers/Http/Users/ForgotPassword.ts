import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuid } from 'uuid'
import { User, UserKey } from 'App/Models/'
import Mail from '@ioc:Adonis/Addons/Mail'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'

export default class ForgotPasswordsController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.findByOrFail('email', email)

    const key = uuid() + user.id
    user.related('keys').create({ key })
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
    await Mail.send((message) => {
      message.to(email)
      message.from('contato@hibilab.com', 'Hibilab')
      message.subject('Recuperação de senha')
      message.htmlView('emails/forgotPassword', { link })
    })
  }

  public async show({ params, response }: HttpContextContract) {
    await UserKey.findByOrFail('key', params.key)

    return response.ok({ message: 'Ok' })
  }

  public async update({ request, response }: HttpContextContract) {
    const { password, key } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()

    user.merge({ password })
    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Ok' })
  }
}
