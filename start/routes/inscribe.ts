import Route from '@ioc:Adonis/Core/Route'

Route.post('/inscribe/course', 'Inscribe/Course/Main.store').middleware('subscription')
Route.get('/inscribe/course', 'Inscribe/Course/Main.index').middleware('auth')
Route.get('/inscribe/course/:id', 'Inscribe/Course/Main.show').middleware('auth')

Route.delete('/inscribe/classe', 'Inscribe/Classe/Main.destroy').middleware('subscription')
Route.post('/inscribe/classe', 'Inscribe/Classe/Main.store').middleware('subscription')
Route.get('/inscribe/classe/:id', 'Inscribe/Classe/Main.show').middleware('subscription')
