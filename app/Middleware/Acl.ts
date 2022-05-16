import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    permissions: string[]
  ) {
    const user = await auth.authenticate()

    if (!permissions.includes(user.permission)) {
      return response.unauthorized({ error: { message: 'Unauthorized access' } })
    }

    await next()
  }
}
