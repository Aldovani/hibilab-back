import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserCourses extends BaseSchema {
  protected tableName = 'user_courses'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['user_id', 'course_id'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['user_id', 'course_id'])
    })
  }
}
