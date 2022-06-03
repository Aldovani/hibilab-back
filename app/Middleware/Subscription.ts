import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StripeCustomers } from 'App/Models'

export default class Subscription {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const userId = (await auth.authenticate()).id
    const subscription = await StripeCustomers.findByOrFail('user_id', userId)
    if (subscription.status !== 'active') {
      return response.unauthorized({ error: { message: 'You need to subscribe to a plan first' } })
    }

    await next()
  }
}
