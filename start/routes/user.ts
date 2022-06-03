import Route from '@ioc:Adonis/Core/Route'

Route.get('/user', 'Users/Main.show').middleware('auth')

Route.post('/user', 'Users/Main.store')

Route.put('/user', 'Users/Main.update').middleware('auth')

Route.put('/user/avatar', 'Users/Avatar.update').middleware('auth')
Route.delete('/user/avatar', 'Users/Avatar.destroy').middleware('auth')

Route.put('/user/forgotpassword', 'Users/ForgotPassword.update')
Route.post('/user/forgotpassword', 'Users/ForgotPassword.store')
Route.get('/user/forgotpassword', 'Users/ForgotPassword.show')
