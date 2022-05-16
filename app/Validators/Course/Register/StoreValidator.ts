import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { difficulty } from 'App/utils'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    teacher: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    requirements: schema.string({ trim: true }),
    difficulty: schema.enum(difficulty),
  })

  public messages = {}
}
