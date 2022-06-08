import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({ trim: true }, [rules.confirmed('passwordConfirmation')]),
    key: schema.string({ trim: true }, [rules.exists({ table: 'user_keys', column: 'key' })]),
  })

  public messages = {}
}
