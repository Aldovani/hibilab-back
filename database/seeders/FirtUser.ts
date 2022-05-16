import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class FirtUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'admin',
        email: 'admin@gmail.com',
        permission: 'admin',
        password: 'secrete',
      },
      {
        name: 'student',
        email: 'student@gmail.com',
        permission: 'student',
        password: '123456',
      },
    ])
  }
}
