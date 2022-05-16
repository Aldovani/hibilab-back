import Route from '@ioc:Adonis/Core/Route'

Route.post('/user/register', 'Users/Register.store')

Route.put('/user/change', 'Users/Change.update').middleware('auth')
