import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { stripe } from 'services/stripe'
import { StoreValidator } from 'App/Validators/Stripe'
export default class MainController {
  public async index({}: HttpContextContract) {}

  public async store({ request, auth, response }: HttpContextContract) {
    const { successUrl, cancelUrl, productPrice } = await request.validate(StoreValidator)
    const stripeCustomer = await stripe.customers.create({ email: auth.user!.email })
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
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

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
