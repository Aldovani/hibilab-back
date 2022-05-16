import Stripe from 'stripe'

export const stripe = new Stripe('apiKey', {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'hibilab',
    version: '0.1.0',
  },
})
