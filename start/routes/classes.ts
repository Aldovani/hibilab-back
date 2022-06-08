import Route from '@ioc:Adonis/Core/Route'

Route.get('/classe/:id', 'Classes/Main.index').middleware('subscription')
Route.delete('/classe/:id', 'Classes/Main.destroy').middleware('acl:admin')
Route.post('/classe', 'Classes/Main.store').middleware('acl:admin')
Route.put('/classe/:id', 'Classes/Main.update').middleware('acl:admin')

Route.put('/classe/video/:id', 'Classes/Video.update').middleware('acl:admin')
Route.delete('/classe/video/:id', 'Classes/Video.destroy').middleware('acl:admin')
