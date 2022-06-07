import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { File } from 'App/Models'

export default class UploadsController {
  public async show({ response, params }: HttpContextContract) {
    return response.download(Application.tmpPath(`uploads`, params.file))
  }
}
