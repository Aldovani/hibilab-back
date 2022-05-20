import Stripe from 'stripe'

export const stripe = new Stripe(
  'sk_test_51KVPhhGOxOu9eoh9meY5ccAeVUdYBLmtQF8TXeyKu56ZedVt3qt8y7gnANUuM9mjuo1z1evMMRRojXCne4oKYa2E00YdeWcQE6',
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'hibilab',
      version: '0.1.0',
    },
  }
)
