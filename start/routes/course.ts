import Route from '@ioc:Adonis/Core/Route'

Route.get('/course/search', 'Courses/Search.index')

Route.get('/course', 'Courses/Register.index')
Route.get('/course/:id', 'Courses/Register.show')

Route.delete('/course', 'Courses/Register.destroy').middleware('acl:admin')
Route.post('/course', 'Courses/Register.store').middleware('acl:admin')
Route.put('/course/:id', 'Courses/Register.update').middleware('acl:admin')
