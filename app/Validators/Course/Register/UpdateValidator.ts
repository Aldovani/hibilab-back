import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { difficulty } from 'App/utils'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    teacher: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
    requirements: schema.string.optional({ trim: true }),
    difficulty: schema.enum.optional(difficulty),
  })

  public messages = {}
}
