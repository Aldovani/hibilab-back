import Stripe from 'stripe'
import Env from '@ioc:Adonis/Core/Env'

export const stripe = new Stripe(Env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'hibilab',
    version: '0.1.0',
  },
})
