import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.exists({ table: 'user', column: 'email' }),
    ]),
    password: schema.string.optional({ trim: true }),
  })

  public messages = {}
}
