import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      extnames: ['jpg', 'jpeg', 'png'],
      size: '3mb',
    }),
  })

  public messages = {}
}
