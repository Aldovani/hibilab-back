import Route from '@ioc:Adonis/Core/Route'

Route.post('/inscribe/course', 'Inscribe/Course/Main.store').middleware('subscription')
Route.get('/inscribe/course', 'Inscribe/Course/Main.index').middleware('auth')

Route.post('/inscribe/classe', 'Inscribe/Classe/Main.store').middleware('subscription')
Route.get('/inscribe/classe/:id', 'Inscribe/Classe/Main.show').middleware('subscription')
