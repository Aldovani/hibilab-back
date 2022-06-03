import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { File } from 'App/Models'

export default class UploadsController {
  public async show({ response, params, auth }: HttpContextContract) {
    const arquivo = await (
      await File.query().where({ fileName: params.file }).firstOrFail()
    ).fileCategory
    if (arquivo === 'course_video') {
      const user = await auth.authenticate()
      await user.load('stripeCustomers')
      const { stripeCustomers } = user
      if (stripeCustomers.status !== 'active') {
        return response.unauthorized({
          error: { message: 'Você não tem permissão para acessar este arquivo' },
        })
      }

      return response.download(Application.tmpPath(`uploads`, params.file))
    }
    return response.download(Application.tmpPath(`uploads`, params.file))
  }
}
