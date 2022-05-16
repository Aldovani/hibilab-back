import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Courses extends BaseSchema {
  protected tableName = 'courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.text('description', 'longtext').notNullable()
      table.string('teacher').notNullable()
      table.enum('difficulty', ['Iniciante', 'Intermediário', 'Avançado']).notNullable()
      table.text('requirements').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
