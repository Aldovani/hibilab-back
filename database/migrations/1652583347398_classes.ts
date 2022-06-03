import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table
        .integer('course_id')
        .unsigned()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
