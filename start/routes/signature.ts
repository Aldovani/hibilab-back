import Route from '@ioc:Adonis/Core/Route'

Route.post('/signature', 'Stripe/Main.store').middleware('auth')
Route.post('/webhook', 'Stripe/Webhooks.store')

// Route.put('/', 'Users/Change.update').middleware('auth')
