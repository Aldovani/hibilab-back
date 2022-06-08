import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { stripe } from 'App/services/stripe'
import { StoreValidator } from 'App/Validators/Stripe'
import { StripeCustomers } from 'App/Models'

const productsId = [
  'price_1L4vkRGOxOu9eoh9WzWVstCG', // 1 month
  'price_1L4vlnGOxOu9eoh9kuIXzl7p', //3 month
  'price_1L4vlBGOxOu9eoh9Dus6IBlv', // 1 year
]

export default class MainController {
  public async index({}: HttpContextContract) {}

  public async store({ request, auth, response }: HttpContextContract) {
    const { successUrl, cancelUrl, productPrice } = await request.validate(StoreValidator)

    if (!productsId.includes(productPrice)) {
      return response.status(400).json({
        error: 'Invalid product price',
      })
    }

    let userStripeId = await StripeCustomers.findBy('user_id', auth.user!.id)
    let stripeCustomer

    if (!userStripeId) {
      stripeCustomer = await stripe.customers.create({
        email: auth.user!.email,
        name: auth.user!.name,
      })

      auth.user!.related('stripeCustomers').create({
        stripeId: stripeCustomer.id,
        userId: auth.user!.id,
      })
    } else {
      stripeCustomer = await (
        await StripeCustomers.query().where('user_id', auth.user!.id).firstOrFail()
      ).toObject()
      stripeCustomer = { id: stripeCustomer.stripeId, status: stripeCustomer.status }

      if (stripeCustomer.status === 'active') {
        return response.status(400).json({
          error: 'Your subscription is active',
        })
      }
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: productPrice,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  }
}
