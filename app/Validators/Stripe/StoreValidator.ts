import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    successUrl: schema.string({ trim: true }),
    cancelUrl: schema.string({ trim: true }),
    productPrice: schema.string({ trim: true }),
  })

  public messages = {}
}
