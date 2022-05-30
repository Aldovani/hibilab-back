import Route from '@ioc:Adonis/Core/Route'

Route.get('/user', 'Users/Main.show').middleware('auth')

Route.post('/user', 'Users/Main.store')

Route.put('/user', 'Users/Main.update').middleware('auth')
