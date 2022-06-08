import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassesWatches extends BaseSchema {
  protected tableName = 'classes_watches'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('course_id')
        .unsigned()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.unique(['user_id', 'class_id', 'course_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
