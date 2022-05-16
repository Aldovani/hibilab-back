import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StripeCustomers extends BaseSchema {
  protected tableName = 'stripe_customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('stripe_id', 255).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
