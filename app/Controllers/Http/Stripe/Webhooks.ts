import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { stripe } from 'App/services/stripe'
import { StripeCustomers } from 'App/Models'
import Stripe from 'stripe'
import Env from '@ioc:Adonis/Core/Env'

const relevantEvents = new Set([
  'checkout.session.completed',
  'checkout.subscription.updated',
  'checkout.subscription.deleted',
  'customer.subscription.deleted',
])

export default class WebhooksController {
  public async store({ request, response }: HttpContextContract) {
    let event: Stripe.Event
    const { 'stripe-signature': stripeSignature } = request.headers()

    try {
      event = stripe.webhooks.constructEvent(
        request.raw()!,
        stripeSignature!,
        Env.get('STRIPE_SIGNATURE_SECRET')
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return response.status(400)
    }

    const type = event.type
    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.subscriptions.created':
          case 'checkout.subscriptions.deleted':
          case 'checkout.subscriptions.updated':
          case 'customer.subscription.deleted':
            console.log('aquiiiiiiiiiiiii poraaa')
            const subscription = event.data.object as Stripe.Subscription
            StripeCustomers.findBy('stripeId', subscription.customer)
            const subscriptionUser = await StripeCustomers.findBy('stripeId', subscription.customer)
            subscriptionUser!.merge({ status: 'inactive' })
            await subscriptionUser!.save()
            break

          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            const user = await StripeCustomers.findBy('stripeId', checkoutSession.customer)
            user!.status = 'active'
            await user!.save()
            break
          default:
            throw new Error(`Unhandled event type`)
        }
      } catch (err) {
        return response.send('Webhook handle failed:')
      }
    }

    response.json({ received: true })
  }
}

// const secret = req.headers["stripe-signature"];

// let event: Stripe.Event;

// try {
//   event = stripe.webhooks.constructEvent(
//     buf,
//     secret,
//     process.env.STRIPE_WEBHOOK_SECRET
//   );
// } catch (err) {
//   return res.status(400).send("Webhook Error: " + err.message);
// }

// const type = event.type;
// if (relevantEvents.has(type)) {
//   try {
//     switch (type) {
//       case "checkout.subscriptions.created":
//       case "checkout.subscriptions.deleted":
//       case "checkout.subscriptions.updated":
//         const subscription = event.data.object as Stripe.Subscription;
//         await saveSubscription(
//           subscription.id,
//           subscription.customer.toString(),
//         );
//         break;

//       case "checkout.session.completed":
//         const checkoutSession = event.data
//           .object as Stripe.Checkout.Session;
//         await saveSubscription(
//           checkoutSession.subscription.toString(),
//           checkoutSession.customer.toString(),
//           true
//         );
//         break;
//       default:
//         throw new Error(`Unhandled event type`);
//     }
//   } catch (err) {
//     return res.send("Webhook handle failed:");
//   }
// }

// res.json({ received: true });
// } else {
// res.setHeader("Allow", "POST");
// res.status(400).send("Method not allowed");
// }
