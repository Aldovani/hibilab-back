import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { stripe } from 'App/services/stripe'
import { StoreValidator } from 'App/Validators/Stripe'
import { StripeCustomers } from 'App/Models'
export default class MainController {
  public async index({}: HttpContextContract) {}

  public async store({ request, auth, response }: HttpContextContract) {
    const { successUrl, cancelUrl, productPrice } = await request.validate(StoreValidator)

    const product = await stripe.products.list({ ids: [productPrice] })

    if (product.data.length === 0) {
      return response.status(404).send({ error: { message: 'Product not found' } })
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
        type: product.data[0].metadata.type as any,
        userId: auth.user!.id,
      })
    } else {
      stripeCustomer = await stripe.customers.search({ query: `email:"${auth.user!.email}"` })
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1L09fqGOxOu9eoh94hTBUP1B',
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

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
